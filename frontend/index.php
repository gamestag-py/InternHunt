<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="InternHunt - PS-61 | Modern AI-powered Internship and Hackathon Matcher for students and developers.">
  <title>InternHunt - PS-61 | Internship & Hackathon Matcher</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- =========================================================================
       1. AUTHENTICATION SECTION (Login & Register)
       ========================================================================= -->
  <section id="auth-section" class="auth-wrapper">
    <div class="auth-card">
      <!-- Auth Header / Brand -->
      <div class="auth-brand">
        <div class="brand-logo-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path>
            <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4"></path>
            <circle cx="8" cy="12" r="2"></circle>
            <path d="m21 12-3-3v6z"></path>
          </svg>
        </div>
        <div class="brand-text">
          <h1>InternHunt</h1>
          <span class="brand-badge">PS-61</span>
        </div>
      </div>
      <p class="auth-subtitle">AI-Powered Skill Matcher for Top Internships & Hackathons</p>

      <!-- Auth Tabs Toggle -->
      <div class="auth-tabs" role="tablist">
        <button type="button" id="tab-login" class="auth-tab-btn active" role="tab" aria-selected="true">Sign In</button>
        <button type="button" id="tab-register" class="auth-tab-btn" role="tab" aria-selected="false">Create Account</button>
      </div>

      <!-- Demo Credentials Helper Pill -->
      <div class="demo-login-chip" id="demo-chip" title="Click to auto-fill demo credentials">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Demo: <strong>alex@student.edu</strong> / <strong>password123</strong> (Click to fill)</span>
      </div>

      <!-- Login Form -->
      <form id="login-form" class="auth-form active">
        <div class="form-group">
          <label for="login-email">Email Address</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input type="email" id="login-email" placeholder="name@university.edu" required autocomplete="email">
          </div>
        </div>

        <div class="form-group">
          <div class="form-label-row">
            <label for="login-password">Password</label>
            <a href="#" class="forgot-link" id="link-forgot-pw">Forgot?</a>
          </div>
          <div class="input-icon-wrapper">
            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input type="password" id="login-password" placeholder="••••••••" required autocomplete="current-password">
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" id="login-remember" checked>
            <span>Remember me for 30 days</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-block">
          <span>Sign In to Dashboard</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <p class="auth-switch-text">
          Don't have an account? <a href="#" id="link-to-register">Sign up for free</a>
        </p>
      </form>

      <!-- Register Form -->
      <form id="register-form" class="auth-form">
        <div class="form-group">
          <label for="reg-name">Full Name</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input type="text" id="reg-name" placeholder="Alex Johnson" required autocomplete="name">
          </div>
        </div>

        <div class="form-group">
          <label for="reg-email">University Email</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input type="email" id="reg-email" placeholder="alex@university.edu" required autocomplete="email">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="reg-university">University / College</label>
            <input type="text" id="reg-university" placeholder="e.g. Stanford University">
          </div>
          <div class="form-group">
            <label for="reg-major">Major / Specialization</label>
            <input type="text" id="reg-major" placeholder="Computer Science">
          </div>
        </div>

        <div class="form-group">
          <label for="reg-password">Password (min 8 chars)</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input type="password" id="reg-password" placeholder="Create a strong password" required minlength="6" autocomplete="new-password">
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block">
          <span>Create Student Profile</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <p class="auth-switch-text">
          Already registered? <a href="#" id="link-to-login">Sign in here</a>
        </p>
      </form>
    </div>
  </section>


  <!-- =========================================================================
       2. MAIN DASHBOARD APPLICATION
       ========================================================================= -->
  <div id="app-section" class="app-container hidden">

    <!-- Mobile Overlay Backdrop -->
    <div id="sidebar-backdrop" class="sidebar-backdrop"></div>

    <!-- LEFT SIDEBAR -->
    <aside id="sidebar" class="sidebar">
      <!-- Sidebar Brand Header -->
      <div class="sidebar-header">
        <div class="brand-logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path>
            <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4"></path>
            <circle cx="8" cy="12" r="2"></circle>
            <path d="m21 12-3-3v6z"></path>
          </svg>
        </div>
        <div class="brand-text">
          <h2>InternHunt</h2>
          <span class="brand-badge">PS-61</span>
        </div>
        <button type="button" id="btn-close-sidebar" class="btn-icon-ghost mobile-only" aria-label="Close Sidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="sidebar-nav">
        <div class="nav-section-title">MAIN MENU</div>
        <ul class="nav-list">
          <li class="nav-item">
            <button type="button" class="nav-link active" data-view="view-dashboard">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
              <span>Dashboard</span>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" data-view="view-profile">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Profile & Resume</span>
              <span class="nav-pill-status" id="resume-status-pill">Ready</span>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" data-view="view-opportunities" data-category="internship">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>Matched Internships</span>
              <span class="nav-pill-count" id="internship-badge-count">4</span>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" data-view="view-opportunities" data-category="hackathon">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Hackathons</span>
              <span class="nav-pill-count purple" id="hackathon-badge-count">2</span>
            </button>
          </li>
          <!-- PREMIUM FEATURE: APPLICATION TRACKER / KANBAN -->
          <li class="nav-item">
            <button type="button" class="nav-link" data-view="view-tracker">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
              </svg>
              <span>Application Tracker</span>
              <span class="nav-pill-count emerald" id="tracker-badge-count">5</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Sidebar Footer / Logout -->
      <div class="sidebar-footer">
        <div class="user-quick-profile">
          <div class="avatar" id="sidebar-avatar">AJ</div>
          <div class="user-info">
            <div class="user-name" id="sidebar-user-name">Alex Johnson</div>
            <div class="user-role" id="sidebar-user-role">Student Seeker</div>
          </div>
        </div>
        <button type="button" id="btn-logout" class="nav-link logout-btn" title="Sign Out">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- RIGHT MAIN CONTENT WRAPPER -->
    <div class="main-wrapper">
      <!-- TOP HEADER -->
      <header class="top-header">
        <div class="header-left">
          <button type="button" id="btn-toggle-sidebar" class="btn-icon mobile-only" aria-label="Toggle Sidebar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div class="header-breadcrumb">
            <span class="breadcrumb-app">InternHunt</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current" id="header-page-title">Dashboard Overview</span>
          </div>
        </div>

        <div class="header-right">
          <!-- PREMIUM FEATURE: THEME TOGGLE (Dark / Light Mode) -->
          <button type="button" id="btn-theme-toggle" class="btn-icon" aria-label="Toggle Theme" title="Toggle Dark/Light Mode">
            <svg id="icon-theme-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg id="icon-theme-sun" class="hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>

          <!-- Notification Bell -->
          <div class="notification-container">
            <button type="button" id="btn-notifications" class="btn-icon" aria-label="Notifications" title="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span class="notification-badge" id="notification-count">3</span>
            </button>

            <!-- Notifications Dropdown Popover -->
            <div id="notifications-dropdown" class="notifications-dropdown hidden">
              <div class="dropdown-header">
                <h4>Notifications</h4>
                <button type="button" id="btn-clear-notifications" class="btn-link-xs">Mark all read</button>
              </div>
              <ul class="notification-list" id="notification-items-list">
                <!-- Injected via JavaScript -->
              </ul>
            </div>
          </div>

          <!-- User Profile Chip -->
          <div class="header-user-chip" id="header-user-chip" title="Active Candidate Profile">
            <div class="avatar avatar-sm" id="header-avatar">AJ</div>
            <div class="header-user-details">
              <span class="header-user-name" id="header-user-name">Alex Johnson</span>
              <span class="header-user-status"><span class="status-dot"></span> Ready to match</span>
            </div>
          </div>
        </div>
      </header>

      <!-- MAIN CONTENT VIEW CONTAINER -->
      <main class="content-container">

        <!-- ===================================================================
             VIEW 1: DASHBOARD OVERVIEW
             =================================================================== -->
        <section id="view-dashboard" class="content-view active">
          <!-- Welcome Hero Banner -->
          <div class="dashboard-hero">
            <div class="hero-content">
              <div class="hero-badge">Spring & Summer 2027 Recruiting Season</div>
              <h2 id="dashboard-welcome-heading">Welcome back, Alex! 👋</h2>
              <p>Your resume matches <strong>88%</strong> of top software engineering internships and hackathons. Upload an updated resume or paste any job description to unlock precision skill gap analysis.</p>
              <div class="hero-actions">
                <button type="button" class="btn btn-primary" id="hero-btn-upload">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Upload & Analyze Resume</span>
                </button>
                <button type="button" class="btn btn-secondary" id="hero-btn-explore">
                  <span>Explore Matched Roles</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <button type="button" class="btn btn-secondary" id="hero-btn-tracker">
                  <span>View Pipeline Tracker</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div class="hero-graphic">
              <div class="match-score-radial">
                <svg viewBox="0 0 36 36" class="circular-chart blue">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="circle" stroke-dasharray="88, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <text x="18" y="20.35" class="percentage" id="hero-match-pct">88%</text>
                </svg>
                <span class="radial-caption">Overall Match Rate</span>
              </div>
            </div>
          </div>

          <!-- Quick Metrics Grid -->
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-icon-box bg-blue-subtle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div class="metric-info">
                <span class="metric-label">High-Match Internships</span>
                <span class="metric-value" id="stat-internships-count">14</span>
                <span class="metric-trend text-emerald">↑ 3 new added today</span>
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-icon-box bg-purple-subtle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div class="metric-info">
                <span class="metric-label">Open Hackathons</span>
                <span class="metric-value" id="stat-hackathons-count">6</span>
                <span class="metric-trend text-purple">$120k total prize pool</span>
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-icon-box bg-emerald-subtle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div class="metric-info">
                <span class="metric-label">ATS Profile Score</span>
                <span class="metric-value" id="stat-ats-score">92 / 100</span>
                <span class="metric-trend text-emerald">Ready for applications</span>
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-icon-box bg-amber-subtle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 14 14"></polyline>
                </svg>
              </div>
              <div class="metric-info">
                <span class="metric-label">Saved Applications</span>
                <span class="metric-value" id="stat-saved-count">4</span>
                <span class="metric-trend text-amber">1 deadline this week</span>
              </div>
            </div>
          </div>

          <!-- Featured Top Picks Section -->
          <div class="section-card">
            <div class="section-card-header">
              <div>
                <h3 class="section-title">Top Recommended Matches for You</h3>
                <p class="section-desc">Based on your evaluated technical strengths in JavaScript, Python, and Full-Stack development.</p>
              </div>
              <button type="button" class="btn btn-outline-sm" id="btn-see-all-matches">
                View All Opportunities →
              </button>
            </div>
            <div class="quick-cards-grid" id="dashboard-quick-grid">
              <!-- Rendered via JavaScript -->
            </div>
          </div>
        </section>


        <!-- ===================================================================
             VIEW 2: PROFILE & RESUME + AI OPTIMIZER & LIVE JD MATCHER
             =================================================================== -->
        <section id="view-profile" class="content-view">
          <div class="page-title-bar">
            <div class="title-bar-actions">
              <div>
                <h2>Profile & Resume Intelligence</h2>
                <p>Upload your latest resume, test against specific job postings, and optimize your ATS match rating.</p>
              </div>
              <!-- PREMIUM FEATURE: EXPORT REPORT BUTTON -->
              <button type="button" class="btn btn-secondary-sm print-btn" id="btn-export-report">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                <span>Export Executive Match Report</span>
              </button>
            </div>
          </div>

          <!-- Resume Upload Zone Card -->
          <div class="section-card upload-section-card">
            <div class="dropzone-container" id="dropzone">
              <input type="file" id="resume-file-input" class="hidden-file-input" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
              
              <div class="dropzone-content" id="dropzone-prompt">
                <div class="upload-icon-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h3>Drag & Drop your Resume here</h3>
                <p>Supports <strong>PDF</strong> and <strong>DOCX</strong> formats (Max size: 5MB)</p>
                <div class="dropzone-buttons">
                  <button type="button" class="btn btn-secondary" id="btn-browse-file">Browse Local Files</button>
                </div>
              </div>

              <!-- Selected File Preview Bar (Hidden until file selected) -->
              <div class="file-preview-bar hidden" id="file-preview-bar">
                <div class="file-preview-left">
                  <div class="file-icon-badge">PDF</div>
                  <div class="file-meta">
                    <span class="file-name" id="preview-file-name">Alex_Johnson_Resume_2026.pdf</span>
                    <span class="file-size" id="preview-file-size">1.4 MB • Ready to analyze</span>
                  </div>
                </div>
                <div class="file-preview-actions">
                  <button type="button" class="btn-icon-ghost" id="btn-remove-file" title="Remove File">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Analyze Action Button Bar -->
            <div class="upload-actions-bar">
              <span class="upload-hint-text">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Choose a PDF or DOCX resume, then click "Upload & Analyze Resume" to save it to your profile.
              </span>
              <button type="button" class="btn btn-primary" id="btn-analyze-resume">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>Analyze Resume</span>
              </button>
            </div>

            <!-- Loading Spinner State (Visible during 2-sec analysis) -->
            <div class="loading-state-overlay hidden" id="analysis-loading-state">
              <div class="spinner-ring"></div>
              <h4 id="analysis-status-text">Parsing PDF syntax & document schema...</h4>
              <p class="loading-subtext">Evaluating extracted keywords against 10,000+ internship job specs</p>
            </div>
          </div>

          <!-- PREMIUM FEATURE: ATS RESUME OPTIMIZATION BREAKDOWN -->
          <div class="section-card ats-diagnostics-card">
            <div class="section-card-header">
              <div>
                <h3 class="section-title">ATS Resume Health Breakdown</h3>
                <p class="section-desc">Automated diagnostic scores based on modern Applicant Tracking System parsers.</p>
              </div>
              <span class="badge-emerald" style="font-size: 0.8rem; padding: 4px 10px;">Top 8th Percentile</span>
            </div>
            
            <div class="ats-dials-row">
              <div class="ats-dial-item">
                <div class="dial-header">
                  <span class="dial-name">Keywords Relevance</span>
                  <span class="dial-pct text-emerald" id="dial-keywords-pct">94%</span>
                </div>
                <div class="dial-bar-bg"><div class="dial-bar-fill bg-emerald" id="dial-keywords-bar" style="width: 94%;"></div></div>
                <span class="dial-caption">Covers 8/9 core required frontend & backend technologies</span>
              </div>

              <div class="ats-dial-item">
                <div class="dial-header">
                  <span class="dial-name">AST Document Structure</span>
                  <span class="dial-pct text-emerald">98%</span>
                </div>
                <div class="dial-bar-bg"><div class="dial-bar-fill bg-emerald" style="width: 98%;"></div></div>
                <span class="dial-caption">Standard headings, high-contrast fonts, clean hierarchy</span>
              </div>

              <div class="ats-dial-item">
                <div class="dial-header">
                  <span class="dial-name">Quantified Impact Metrics</span>
                  <span class="dial-pct text-amber">86%</span>
                </div>
                <div class="dial-bar-bg"><div class="dial-bar-fill bg-amber" style="width: 86%;"></div></div>
                <span class="dial-caption">Strong metrics present; consider adding latency / revenue %</span>
              </div>
            </div>
          </div>

          <!-- PROFILE OVERVIEW CARD (Extracted Mock Data) -->
          <div class="profile-overview-card" id="profile-overview-card">
            <!-- Profile Overview Header -->
            <div class="overview-header">
              <div class="overview-user-meta">
                <div class="avatar avatar-lg" id="profile-card-avatar">AJ</div>
                <div>
                  <div class="title-row">
                    <h3 id="profile-card-name">Alex Johnson</h3>
                    <span class="status-badge verified">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Resume Verified
                    </span>
                  </div>
                  <p class="profile-contact-line">
                    <span id="profile-card-email">alex@student.edu</span> • 
                    <span id="profile-card-college">Stanford University</span> • 
                    <span id="profile-card-major">Computer Science (B.S.)</span>
                  </p>
                </div>
              </div>
              <div class="ats-score-badge">
                <div class="ats-number">92<span class="ats-denom">/100</span></div>
                <div class="ats-title">ATS Match Rating</div>
              </div>
            </div>

            <!-- Skills, Strengths & Weaknesses 3-Column / Grid -->
            <div class="overview-grid">
              <!-- Extracted Skills -->
              <div class="overview-box skills-box">
                <div class="box-header">
                  <div class="box-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    <h4>Extracted Technical Skills</h4>
                  </div>
                  <span class="count-pill" id="skills-count-pill">9 Skills</span>
                </div>
                <p class="box-desc">Identified from coursework, projects, and work experience:</p>
                <div class="tags-cloud" id="profile-skills-tags">
                  <!-- Skill pills injected via JavaScript -->
                </div>

                <!-- Add Custom Skill Tag Input -->
                <div class="add-skill-row">
                  <input type="text" id="input-add-skill" placeholder="Add custom skill (e.g. AWS)...">
                  <button type="button" class="btn btn-secondary-sm" id="btn-add-skill">+ Add</button>
                </div>
              </div>

              <!-- Strengths Card -->
              <div class="overview-box strengths-box">
                <div class="box-header">
                  <div class="box-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <h4>Identified Strengths</h4>
                  </div>
                  <span class="badge-emerald">Strong Candidate</span>
                </div>
                <ul class="strength-list" id="profile-strengths-list">
                  <!-- Injected via JavaScript -->
                </ul>
              </div>

              <!-- Areas for Improvement / Skill Gaps -->
              <div class="overview-box weaknesses-box">
                <div class="box-header">
                  <div class="box-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h4>Areas for Skill Growth</h4>
                  </div>
                  <span class="badge-rose">Action Items</span>
                </div>
                <ul class="weakness-list" id="profile-weaknesses-list">
                  <!-- Injected via JavaScript -->
                </ul>
              </div>
            </div>

            <!-- Card Bottom Bar -->
            <div class="overview-footer">
              <span class="last-analyzed-text" id="last-analyzed-timestamp">Analyzed just now with InternHunt AI Engine v4.2</span>
              <button type="button" class="btn btn-primary" id="btn-view-matches-from-profile">
                <span>View Matched Opportunities</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PREMIUM FEATURE: LIVE JOB DESCRIPTION MATCHER -->
          <div class="section-card live-jd-matcher-card">
            <div class="section-card-header">
              <div>
                <h3 class="section-title">Live Job Description (JD) Matcher</h3>
                <p class="section-desc">Paste any internship or hackathon description to calculate instant ATS compatibility against your profile.</p>
              </div>
              <button type="button" class="btn btn-outline-sm" id="btn-load-sample-jd">Load Sample Job Posting</button>
            </div>

            <div class="jd-matcher-body">
              <div class="jd-input-side">
                <label for="input-jd-text" class="sr-only">Job Description Text</label>
                <textarea id="input-jd-text" rows="5" placeholder="Paste job requirements or qualifications here (e.g., We are seeking a software intern proficient with Python, React, SQL, and Docker)..."></textarea>
                <button type="button" class="btn btn-primary" id="btn-run-jd-match">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <span>Analyze Compatibility</span>
                </button>
              </div>

              <div class="jd-result-side hidden" id="jd-result-box">
                <div class="jd-result-header">
                  <div class="jd-score-circle" id="jd-score-circle">85%</div>
                  <div>
                    <h4 id="jd-match-verdict">Strong Match</h4>
                    <p id="jd-match-subtext">Your profile covers majority of key qualifications.</p>
                  </div>
                </div>
                <div class="jd-skills-breakdown">
                  <div class="breakdown-group">
                    <span class="breakdown-label text-emerald">Matched Keywords:</span>
                    <div class="tags-cloud" id="jd-matched-tags"></div>
                  </div>
                  <div class="breakdown-group">
                    <span class="breakdown-label text-rose">Missing Keywords:</span>
                    <div class="tags-cloud" id="jd-missing-tags"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <!-- ===================================================================
             VIEW 3: MATCHED OPPORTUNITIES (Internships & Hackathons)
             =================================================================== -->
        <section id="view-opportunities" class="content-view">
          <div class="page-title-bar">
            <div>
              <h2 id="opportunities-page-title">Matched Opportunities</h2>
              <p>Curated openings sorted by skill alignment and deadline urgency.</p>
            </div>
          </div>

          <!-- SEARCH & FILTER TOOLBAR -->
          <div class="toolbar-card">
            <!-- Search Input -->
            <div class="search-input-wrapper">
              <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="filter-search-input" placeholder="Search by role, company, or required skill (e.g. React, Python)...">
              <button type="button" id="btn-clear-search" class="clear-search-btn hidden" aria-label="Clear Search">✕</button>
            </div>

            <!-- Filter Controls Row -->
            <div class="filter-controls-row">
              <!-- Category Filter Pills -->
              <div class="category-pills" role="radiogroup" aria-label="Category Filter">
                <button type="button" class="pill-btn active" data-category="all">All Opportunities</button>
                <button type="button" class="pill-btn" data-category="internship">Internships Only</button>
                <button type="button" class="pill-btn" data-category="hackathon">Hackathons Only</button>
              </div>

              <!-- Filter Selects -->
              <div class="filter-dropdowns">
                <div class="select-wrapper">
                  <label for="filter-role-select" class="sr-only">Role Category</label>
                  <select id="filter-role-select">
                    <option value="all">All Tech Domains</option>
                    <option value="fullstack">Full-Stack Development</option>
                    <option value="frontend">Frontend & UI/UX</option>
                    <option value="backend">Backend & Distributed Systems</option>
                    <option value="aiml">AI & Machine Learning</option>
                  </select>
                </div>

                <div class="select-wrapper">
                  <label for="sort-select" class="sr-only">Sort by</label>
                  <select id="sort-select">
                    <option value="match-desc">Highest Match Score</option>
                    <option value="deadline-asc">Deadline (Soonest)</option>
                    <option value="name-asc">Company / Event (A-Z)</option>
                  </select>
                </div>

                <button type="button" class="btn btn-outline-sm" id="btn-reset-filters" title="Reset all search filters">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Results Summary Count -->
          <div class="results-meta-bar">
            <span id="results-count-text">Showing <strong>6</strong> matched opportunities</span>
            <div class="match-legend">
              <span class="legend-item"><span class="legend-dot green"></span> 80%+ High Match</span>
              <span class="legend-item"><span class="legend-dot amber"></span> 60-79% Good Match</span>
              <span class="legend-item"><span class="legend-dot red"></span> &lt;60% Stretch Match</span>
            </div>
          </div>

          <!-- OPPORTUNITY CARDS GRID -->
          <div class="opportunities-grid" id="opportunities-grid">
            <!-- Opportunity Cards dynamically generated by script.js -->
          </div>

          <!-- Empty State (Shown when filters match 0 results) -->
          <div class="empty-state-card hidden" id="empty-state">
            <div class="empty-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <h3>No matching opportunities found</h3>
            <p>Try adjusting your keyword search, selecting "All Opportunities", or resetting filters.</p>
            <button type="button" class="btn btn-secondary" id="btn-empty-reset">Reset All Filters</button>
          </div>

          <!-- PREMIUM FEATURE: HACKATHON TEAMMATE FINDER WIDGET -->
          <div class="section-card teammate-finder-card" id="teammate-finder-section">
            <div class="section-card-header">
              <div>
                <h3 class="section-title">Hackathon Teammate Matcher 🤝</h3>
                <p class="section-desc">Connect with verified students possessing complementary skill sets for upcoming hackathons.</p>
              </div>
            </div>
            <div class="teammates-grid" id="teammates-grid">
              <!-- Rendered via JavaScript -->
            </div>
          </div>
        </section>


        <!-- ===================================================================
             VIEW 4: APPLICATION TRACKER / KANBAN PIPELINE (PREMIUM FEATURE)
             =================================================================== -->
        <section id="view-tracker" class="content-view">
          <div class="page-title-bar">
            <div>
              <h2>Application Pipeline Tracker</h2>
              <p>Manage your active internship applications, interview rounds, and hackathon registrations in one visual board.</p>
            </div>
          </div>

          <!-- Tracker Analytics Header -->
          <div class="tracker-metrics-bar">
            <div class="tracker-metric-item">
              <span class="tracker-metric-num" id="metric-total-active">5</span>
              <span class="tracker-metric-label">Active Opportunities</span>
            </div>
            <div class="tracker-metric-item">
              <span class="tracker-metric-num text-emerald" id="metric-interviews-count">2</span>
              <span class="tracker-metric-label">Interview Rounds</span>
            </div>
            <div class="tracker-metric-item">
              <span class="tracker-metric-num text-purple" id="metric-offers-count">1</span>
              <span class="tracker-metric-label">Offers Received</span>
            </div>
            <div class="tracker-metric-item">
              <span class="tracker-metric-num text-blue" id="metric-response-rate">67%</span>
              <span class="tracker-metric-label">Response Rate</span>
            </div>
          </div>

          <!-- KANBAN BOARD CONTAINER -->
          <div class="kanban-board">
            <!-- Column 1: Wishlist / Saved -->
            <div class="kanban-column" data-stage="saved">
              <div class="kanban-column-header">
                <div class="column-title">
                  <span class="stage-dot slate"></span>
                  <h4>Wishlist & Saved</h4>
                </div>
                <span class="column-badge" id="kanban-count-saved">1</span>
              </div>
              <div class="kanban-cards-list" id="kanban-list-saved">
                <!-- Injected via JavaScript -->
              </div>
            </div>

            <!-- Column 2: Applied -->
            <div class="kanban-column" data-stage="applied">
              <div class="kanban-column-header">
                <div class="column-title">
                  <span class="stage-dot blue"></span>
                  <h4>Applied</h4>
                </div>
                <span class="column-badge" id="kanban-count-applied">2</span>
              </div>
              <div class="kanban-cards-list" id="kanban-list-applied">
                <!-- Injected via JavaScript -->
              </div>
            </div>

            <!-- Column 3: Interviewing -->
            <div class="kanban-column" data-stage="interviewing">
              <div class="kanban-column-header">
                <div class="column-title">
                  <span class="stage-dot amber"></span>
                  <h4>Interviewing</h4>
                </div>
                <span class="column-badge" id="kanban-count-interviewing">1</span>
              </div>
              <div class="kanban-cards-list" id="kanban-list-interviewing">
                <!-- Injected via JavaScript -->
              </div>
            </div>

            <!-- Column 4: Offers -->
            <div class="kanban-column" data-stage="offer">
              <div class="kanban-column-header">
                <div class="column-title">
                  <span class="stage-dot emerald"></span>
                  <h4>Offers & Finalists</h4>
                </div>
                <span class="column-badge" id="kanban-count-offer">1</span>
              </div>
              <div class="kanban-cards-list" id="kanban-list-offer">
                <!-- Injected via JavaScript -->
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>


  <!-- =========================================================================
       3. INTERACTIVE APPLY MODAL
       ========================================================================= -->
  <div id="apply-modal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-card">
      <div class="modal-header">
        <div>
          <span class="modal-badge" id="modal-category-badge">Internship</span>
          <h3 id="modal-title">Apply for Role</h3>
          <p class="modal-subtitle" id="modal-company-title">Company Name</p>
        </div>
        <button type="button" class="btn-icon-ghost" id="btn-close-modal" aria-label="Close dialog">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <form id="apply-form" class="modal-body">
        <div class="modal-match-summary">
          <div class="summary-match-pill" id="modal-match-pill">94% Match</div>
          <p id="modal-match-explanation">Your verified skills strongly match this opening's primary qualifications.</p>
        </div>

        <div class="form-group">
          <label for="apply-applicant-name">Applicant Name</label>
          <input type="text" id="apply-applicant-name" required readonly>
        </div>

        <div class="form-group">
          <label for="apply-applicant-email">Contact Email</label>
          <input type="email" id="apply-applicant-email" required readonly>
        </div>

        <div class="form-group">
          <label for="apply-portfolio">GitHub / Portfolio URL</label>
          <input type="url" id="apply-portfolio" placeholder="https://github.com/alex-dev" value="https://github.com/alexjohnson-dev">
        </div>

        <div class="form-group">
          <label for="apply-note">Quick Candidate Note (Optional)</label>
          <textarea id="apply-note" rows="3" placeholder="Briefly state why you're enthusiastic about this role and how your skills align..."></textarea>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btn-cancel-modal">Cancel</button>
          <button type="submit" class="btn btn-primary" id="btn-submit-application">
            <span>Submit Application</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>


  <!-- =========================================================================
       4. INTERVIEW PREP MODAL (PREMIUM FEATURE)
       ========================================================================= -->
  <div id="interview-modal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="interview-modal-title">
    <div class="modal-card modal-card-lg">
      <div class="modal-header">
        <div>
          <span class="modal-badge" id="interview-modal-badge">Company Interview Prep</span>
          <h3 id="interview-modal-title">Interview Prep Suite</h3>
          <p class="modal-subtitle" id="interview-modal-subtitle">Company questions & architecture topics</p>
        </div>
        <button type="button" class="btn-icon-ghost" id="btn-close-interview-modal" aria-label="Close dialog">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body" id="interview-modal-body">
        <div class="interview-format-callout">
          <h5 id="interview-format-title">Interview Process Overview</h5>
          <p id="interview-format-desc">Loading process details...</p>
        </div>

        <div class="interview-questions-accordion" id="interview-questions-list">
          <!-- Accordion items injected via JavaScript -->
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btn-done-interview-modal">Close Prep</button>
          <button type="button" class="btn btn-primary" id="btn-apply-from-interview">Apply Now for this Role</button>
        </div>
      </div>
    </div>
  </div>


  <!-- =========================================================================
       5. TOAST NOTIFICATION CONTAINER
       ========================================================================= -->
  <div id="toast-container" class="toast-container" aria-live="polite"></div>

  <!-- SCRIPT -->
  <script src="script.js"></script>
</body>
</html>
