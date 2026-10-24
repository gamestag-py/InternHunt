
import json
import logging
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
import json
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError


URL = "https://internshala.com/internships/software-development-internship"
OUTPUT_FILE = Path("internships.json")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)


def get_text(element, selector):
    """Get text from a child element; return None if missing."""
    try:
        locator = element.locator(selector).first
        if locator.count() == 0:
            return None

        value = locator.inner_text(timeout=2000).strip()
        return value or None

    except Exception:
        return None


def get_attribute(element, selector, attribute):
    """Get an HTML attribute from a child element."""
    try:
        locator = element.locator(selector).first
        if locator.count() == 0:
            return None

        return locator.get_attribute(attribute, timeout=2000)

    except Exception:
        return None


def extract_internship(card, page):
    """Extract structured information from one internship card."""

    internship_id = card.get_attribute("internshipid")
    card_id = card.get_attribute("id")

    relative_url = get_attribute(
        card, "a.job-title-href", "href"
    )

    # Extract all skill labels, preserving their order.
    skills = []
    try:
        skill_elements = card.locator(".job_skill")
        for i in range(skill_elements.count()):
            skill = skill_elements.nth(i).inner_text().strip()
            if skill:
                skills.append(skill)
    except Exception:
        logger.exception("Failed to extract skills for %s", card_id)

    # Extract all location labels.
    locations = []
    try:
        location_elements = card.locator(".locations a")
        for i in range(location_elements.count()):
            location = location_elements.nth(i).inner_text().strip()
            if location:
                locations.append(location)
    except Exception:
        logger.exception("Failed to extract locations for %s", card_id)

    # Extract stipend and duration.
    stipend = get_text(card, ".stipend")

    duration = None
    try:
        # The first detail row contains location, stipend, duration.
        detail_items = card.locator(
            ".detail-row-1 .row-1-item"
        )

        for i in range(detail_items.count()):
            item = detail_items.nth(i)
            text = item.inner_text().strip()

            if "ic-16-calendar" in (
                item.locator("i").first.get_attribute("class") or ""
            ):
                duration = text

    except Exception:
        logger.debug("Duration extraction failed for %s", card_id)

    # Extract posted date and hiring badge.
    posted = get_text(card, ".status-inactive span")
    actively_hiring = card.locator(".actively-hiring-badge").count() > 0

    # Extract company logo.
    logo = get_attribute(card, ".internship_logo img", "src")
    if logo:
        logo = urljoin(page.url, logo)

    return {
        "internship_id": internship_id,
        "card_id": card_id,
        "title": get_text(card, ".job-title-href"),
        "company": get_text(card, ".company-name"),
        "location": locations,
        "stipend": stipend,
        "duration": duration,
        "description": get_text(card, ".about_job .text"),
        "skills": skills,
        "posted": posted,
        "actively_hiring": actively_hiring,
        "logo_url": logo,
        "detail_url": urljoin(page.url, relative_url) if relative_url else None,
        "employment_type": card.get_attribute("employment_type"),
        "source_page": card.get_attribute("data-source_page"),
    }







def extract_page(page):
    """Extract all internship cards currently loaded on a page."""
    internships = []

    cards = page.locator(".individual_internship")
    total = cards.count()

    logger.info("Found %d internship cards on %s", total, page.url)

    for i in range(total):
        try:
            card = cards.nth(i)
            record = extract_internship(card, page)

            if record:
                internships.append(record)

                logger.info(
                    "[%d/%d] %s | %s",
                    i + 1,
                    total,
                    record.get("title"),
                    record.get("company"),
                )

        except Exception:
            logger.exception("Failed to extract card %d", i)

    return internships


def main():
    all_internships = []
    seen_ids = set()
    visited_pages = set()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)

        try:
            context = browser.new_context()
            page = context.new_page()

            # ================================================
            # BLOCK IMAGES, MEDIA, FONTS, AND HEAVY FILES
            # ================================================

            blocked_resource_types = {"image", "media", "font"}

            blocked_extensions = (
                ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg",
                ".mp4", ".webm", ".mov", ".avi", ".mkv",
                ".mp3", ".wav", ".ogg", ".m4a",
                ".woff", ".woff2", ".ttf", ".otf", ".eot",
                ".zip", ".rar", ".7z", ".tar", ".gz", ".pdf",
            )

            def block_heavy_resources(route):
                request = route.request
                resource_url = request.url.lower().split("?")[0]

                if request.resource_type in blocked_resource_types:
                    return route.abort()

                if resource_url.endswith(blocked_extensions):
                    return route.abort()

                return route.continue_()

            page.route("**/*", block_heavy_resources)

            # ================================================
            # PAGINATE THROUGH ALL AVAILABLE PAGES
            # ================================================

            current_url = URL
            page_number = 1

            while current_url and current_url not in visited_pages:
                visited_pages.add(current_url)

                logger.info(
                    "========== PAGE %d: %s ==========",
                    page_number,
                    current_url,
                )

                try:
                    page.goto(
                        current_url,
                        wait_until="domcontentloaded",
                        timeout=60000,
                    )

                    # Wait for cards to appear.
                    page.locator(".individual_internship").first.wait_for(
                        state="attached",
                        timeout=30000,
                    )

                except PlaywrightTimeoutError:
                    logger.warning(
                        "Page %d did not load internship cards: %s",
                        page_number,
                        current_url,
                    )
                    break

                # Scroll to load any additional cards on this page.
                previous_count = -1
                stable_rounds = 0

                for _ in range(15):
                    count = page.locator(".individual_internship").count()

                    if count == previous_count:
                        stable_rounds += 1
                    else:
                        stable_rounds = 0

                    if stable_rounds >= 2:
                        break

                    previous_count = count

                    page.evaluate(
                        "window.scrollTo(0, document.body.scrollHeight)"
                    )
                    page.wait_for_timeout(1200)

                # Extract the current page.
                page_records = extract_page(page)

                # Deduplicate using internship ID, then card ID,
                # then detail URL as a fallback.
                for record in page_records:
                    unique_key = (
                        record.get("internship_id")
                        or record.get("card_id")
                        or record.get("detail_url")
                    )

                    if unique_key and unique_key in seen_ids:
                        continue

                    if unique_key:
                        seen_ids.add(unique_key)

                    all_internships.append(record)

                logger.info(
                    "Page %d complete. Total unique internships: %d",
                    page_number,
                    len(all_internships),
                )

                # ============================================
                # FIND NEXT PAGE LINK
                # ============================================

                next_link = page.locator("a#navigation-forward").first

                if next_link.count() == 0:
                    logger.info("No next-page link. Pagination complete.")
                    break

                href = next_link.get_attribute("href")

                if not href:
                    logger.info("Next-page link has no href. Stopping.")
                    break

                next_url = urljoin(page.url, href)

                # Prevent accidentally navigating to a different host.
                if urlparse(next_url).netloc != urlparse(URL).netloc:
                    logger.warning(
                        "Next-page link points to another host: %s",
                        next_url,
                    )
                    break

                if next_url in visited_pages:
                    logger.warning(
                        "Already visited next page: %s",
                        next_url,
                    )
                    break

                current_url = next_url
                page_number += 1

            # ================================================
            # SAVE ALL PAGES TO ONE JSON FILE
            # ================================================

            OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

            OUTPUT_FILE.write_text(
                json.dumps(
                    all_internships,
                    ensure_ascii=False,
                    indent=2,
                ),
                encoding="utf-8",
            )

            logger.info(
                "Completed. Pages visited: %d | Unique internships: %d",
                len(visited_pages),
                len(all_internships),
            )

            logger.info(
                "JSON saved to: %s",
                OUTPUT_FILE.resolve(),
            )

            input("Scraping complete. Press Enter to close Chromium...")

        except KeyboardInterrupt:
            logger.warning("Scraping interrupted by user")

            # Save records collected before interruption.
            OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
            OUTPUT_FILE.write_text(
                json.dumps(
                    all_internships,
                    ensure_ascii=False,
                    indent=2,
                ),
                encoding="utf-8",
            )

        except Exception:
            logger.exception("Scraping failed")

        finally:
            browser.close()


if __name__ == "__main__":
    main()
