/**
 * ============================================================================
 * InternHunt - PS-61 | SCRIPT.JS
 * Vanilla ES6+ SPA Architecture & Application Logic
 * Premium Features: Dark Theme, Kanban Pipeline, Live JD Matcher, Interview Prep
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Mock Datasets & Application State
     -------------------------------------------------------------------------- */
  const state = {
    isAuthenticated: false,
    currentView: 'view-dashboard',
    theme: 'light', // 'light' or 'dark'
    user: {
      name: 'Alex Johnson',
      email: 'alex@student.edu',
      university: 'Stanford University',
      major: 'Computer Science (B.S.)',
      role: 'Student Seeker',
      avatarText: 'AJ',
      atsScore: 92,
      resumeAnalyzed: true,
      resumeFileName: 'Alex_Johnson_Resume_2026.pdf',
      skills: [
        'JavaScript (ES6+)',
        'React',
        'Node.js',
        'Python',
        'SQL / PostgreSQL',
        'REST APIs',
        'Git & GitHub',
        'Data Structures & Algorithms',
        'HTML5 / CSS3'
      ],
      strengths: [
        'Strong Full-Stack Foundation (React, Node.js, Express)',
        '3+ Production-Ready Web Apps & API Integrations',
        'Clean, modular ES6+ JavaScript code architecture',
        'Active Open-Source contributions & Git collaboration'
      ],
      weaknesses: [
        'Cloud Infrastructure & CI/CD deployment (AWS / Docker)',
        'GraphQL & Microservices architectural experience',
        'Distributed systems & caching strategies (Redis)'
      ],
      bookmarkedIds: new Set([2, 5]),
      notifications: [
        { id: 1, text: 'Google Summer 2027 Engineering application window opened!', time: '10m ago', unread: true },
        { id: 2, text: 'Your resume achieved 94% match on Stripe Frontend Internship', time: '1h ago', unread: true },
        { id: 3, text: 'CalHacks 13.0 Early Bird registration ends in 3 days', time: '5h ago', unread: true }
      ]
    },
    // Kanban Application Tracker Stages
    kanban: {
      saved: [3],
      applied: [2, 5],
      interviewing: [1],
      offer: [6]
    },
    opportunities: [
      {
        id: 1,
        company: 'Google',
        logoInitial: 'G',
        logoBg: 'linear-gradient(135deg, #4285F4, #34A853)',
        category: 'internship',
        domain: 'fullstack',
        role: 'Software Engineering Intern - Summer 2027',
        location: 'Mountain View, CA (Hybrid)',
        stipend: '$56 / hr + Housing Stipend',
        deadlineDate: '2026-11-20',
        deadlineDisplay: 'Nov 20, 2026',
        daysLeft: 27,
        requiredSkills: ['Python', 'JavaScript (ES6+)', 'Data Structures & Algorithms', 'Distributed Systems', 'Go'],
        baseScore: 88,
        description: 'Join Google core infrastructure or search ranking teams to build scalable software solutions used by billions.',
        interviewFormat: '1 Technical Phone Screen (45m LeetCode Data Structures) + 2 Onsite Technical Rounds (Distributed Caching & Problem Solving).',
        interviewQuestions: [
          {
            q: 'Design an in-memory Least Recently Used (LRU) Cache supporting get() and put() in O(1) time complexity.',
            hint: 'Use a Doubly-Linked List combined with a Hash Map to achieve constant-time item eviction and lookups.'
          },
          {
            q: 'How would you detect and handle deadlocks in a high-concurrency microservices architecture?',
            hint: 'Discuss lock ordering policies, timeout retry patterns with jitter, and distributed tracing.'
          },
          {
            q: 'Explain the difference between TCP and UDP and choose one for a real-time collaborative code editor.',
            hint: 'WebSockets over TCP provides reliability and packet sequencing, whereas WebRTC data channels can use UDP for sub-10ms latency.'
          }
        ]
      },
      {
        id: 2,
        company: 'Stripe',
        logoInitial: 'S',
        logoBg: 'linear-gradient(135deg, #635BFF, #00D4FF)',
        category: 'internship',
        domain: 'frontend',
        role: 'Frontend Engineering Intern',
        location: 'San Francisco, CA (Remote Friendly)',
        stipend: '$58 / hr + Relocation',
        deadlineDate: '2026-11-12',
        deadlineDisplay: 'Nov 12, 2026',
        daysLeft: 19,
        requiredSkills: ['JavaScript (ES6+)', 'React', 'HTML5 / CSS3', 'TypeScript', 'Web Accessibility (a11y)'],
        baseScore: 94,
        description: 'Design and engineer pixel-perfect dashboard interfaces and payment SDKs that power global internet commerce.',
        interviewFormat: '1 Live Coding Practical (Building an interactive component) + 1 Frontend Architecture & Web Performance round.',
        interviewQuestions: [
          {
            q: 'Implement an accessible, keyboard-navigable autocomplete dropdown in pure Vanilla JavaScript or React.',
            hint: 'Handle keydown for ArrowUp, ArrowDown, Enter, and Escape. Use ARIA attributes like role="combobox" and aria-expanded.'
          },
          {
            q: 'How would you prevent duplicate payment charges when a user repeatedly clicks "Pay Now"?',
            hint: 'Discuss idempotency keys in request headers, disabling buttons on submission, and optimistic UI locking.'
          },
          {
            q: 'What strategies reduce Largest Contentful Paint (LCP) on heavy dashboard web apps?',
            hint: 'Prioritize critical CSS, defer non-critical JS chunks, use modern image formats with fetchpriority="high", and preconnect API endpoints.'
          }
        ]
      },
      {
        id: 3,
        company: 'Jane Street',
        logoInitial: 'JS',
        logoBg: 'linear-gradient(135deg, #0A2540, #00A699)',
        category: 'internship',
        domain: 'backend',
        role: 'Quantitative Software Systems Intern',
        location: 'New York, NY (Onsite)',
        stipend: '$75 / hr + Housing',
        deadlineDate: '2026-11-05',
        deadlineDisplay: 'Nov 05, 2026',
        daysLeft: 12,
        requiredSkills: ['Python', 'Data Structures & Algorithms', 'OCaml', 'Low-Latency C++', 'Linux Kernel'],
        baseScore: 68,
        description: 'Solve deeply complex algorithmic problems and engineer ultra-low latency trading and pricing engines.',
        interviewFormat: '2 Quantitative Problem-Solving Rounds + 2 In-depth Algorithmic Architecture interviews.',
        interviewQuestions: [
          {
            q: 'Given a continuous stream of stock quotes, maintain the running median in O(log N) time per trade.',
            hint: 'Maintain two heaps: a max-heap for the lower half of values and a min-heap for the upper half.'
          },
          {
            q: 'Why are garbage-collected languages typically avoided in sub-microsecond algorithmic trade matching engines?',
            hint: 'Unpredictable GC pauses (Stop-The-World) can cause sudden latency spikes of milliseconds, risking arbitrage losses.'
          }
        ]
      },
      {
        id: 4,
        company: 'OpenAI Fellows',
        logoInitial: 'OA',
        logoBg: 'linear-gradient(135deg, #10A37F, #007A5A)',
        category: 'internship',
        domain: 'aiml',
        role: 'AI Systems & Applied Research Intern',
        location: 'San Francisco, CA (Hybrid)',
        stipend: '$65 / hr + Equity',
        deadlineDate: '2026-11-28',
        deadlineDisplay: 'Nov 28, 2026',
        daysLeft: 35,
        requiredSkills: ['Python', 'Data Structures & Algorithms', 'PyTorch', 'Large Language Models', 'CUDA / GPU Compute'],
        baseScore: 72,
        description: 'Collaborate with world-class research scientists fine-tuning frontier generative AI models and evaluation benchmarks.',
        interviewFormat: '1 Machine Learning Theory Screen + 1 Hands-on Systems & PyTorch Implementation Round.',
        interviewQuestions: [
          {
            q: 'Explain the Transformer Multi-Head Self-Attention mathematical formulation and its memory complexity relative to sequence length.',
            hint: 'Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V. Memory scales quadratically O(N^2) without FlashAttention tiling.'
          },
          {
            q: 'How does Reinforcement Learning from Human Feedback (RLHF) differ from Supervised Fine-Tuning (SFT)?',
            hint: 'SFT teaches token probability distributions; RLHF trains a reward model to optimize generation policy via PPO or DPO.'
          }
        ]
      },
      {
        id: 5,
        company: 'CalHacks 13.0',
        logoInitial: 'CH',
        logoBg: 'linear-gradient(135deg, #FF5E3A, #FF2A68)',
        category: 'hackathon',
        domain: 'fullstack',
        role: "World's Largest Collegiate Hackathon",
        location: 'San Francisco, CA (In-Person)',
        stipend: '$100,000 Prize Pool',
        deadlineDate: '2026-10-31',
        deadlineDisplay: 'Oct 31, 2026',
        daysLeft: 7,
        requiredSkills: ['React', 'Node.js', 'REST APIs', 'SQL / PostgreSQL', 'Rapid Prototyping'],
        baseScore: 96,
        description: '36-hour hackathon with 3,000+ top hackers building impactful AI, Web3, and social good web and mobile applications.',
        interviewFormat: 'Team Pitch Review: 3-minute project demo to angel investors and technical sponsors.',
        interviewQuestions: [
          {
            q: 'How to structure a high-converting 3-minute hackathon demo pitch?',
            hint: 'Spend 30s on the painful problem, 90s on the live working demo, 40s on technical differentiation, and 20s on future roadmap.'
          }
        ]
      },
      {
        id: 6,
        company: 'MIT HackMIT 2026',
        logoInitial: 'MIT',
        logoBg: 'linear-gradient(135deg, #A31F34, #8A1B2D)',
        category: 'hackathon',
        domain: 'aiml',
        role: 'Flagship MIT Hackathon & Tech Showcase',
        location: 'Cambridge, MA (Hybrid)',
        stipend: '$80,000 Prize Pool',
        deadlineDate: '2026-11-15',
        deadlineDisplay: 'Nov 15, 2026',
        daysLeft: 22,
        requiredSkills: ['Python', 'JavaScript (ES6+)', 'REST APIs', 'Cloud APIs (AWS / GCP)', 'Computer Vision'],
        baseScore: 84,
        description: 'Bring creative software and hardware solutions to life alongside industry sponsors and venture capital judges.',
        interviewFormat: 'Live Technical Showcase and Q&A with MIT faculty and engineering leaders.',
        interviewQuestions: [
          {
            q: 'What cloud serverless architecture enables deploying an AI MVP in under 24 hours without server costs?',
            hint: 'Use modern edge functions (Cloudflare Workers or Vercel Edge) connecting to hosted vector databases like Pinecone/Supabase.'
          }
        ]
      }
    ],
    // Mock Hackathon Teammates
    teammates: [
      {
        id: 1,
        name: 'Sarah Lin',
        avatarText: 'SL',
        college: 'UC Berkeley',
        specialty: 'UI/UX Design & Product Strategy',
        lookingFor: 'Seeking a Full-Stack developer for CalHacks 13.0 (AI Social Impact track)',
        skills: ['Figma', 'UI/UX Design', 'Design Systems', 'CSS3']
      },
      {
        id: 2,
        name: 'David Chen',
        avatarText: 'DC',
        college: 'Carnegie Mellon',
        specialty: 'Computer Vision & Deep Learning',
        lookingFor: 'Seeking React / WebGL developer to build real-time interactive demo',
        skills: ['PyTorch', 'Python', 'OpenCV', 'FastAPI']
      },
      {
        id: 3,
        name: 'Maya Patel',
        avatarText: 'MP',
        college: 'MIT',
        specialty: 'Backend & High-Throughput Systems',
        lookingFor: 'Looking for ML hacker & Frontend engineer to compete in HackMIT',
        skills: ['Go', 'Docker', 'PostgreSQL', 'Distributed Systems']
      }
    ],
    filters: {
      searchTerm: '',
      category: 'all',
      domain: 'all',
      sortBy: 'match-desc'
    },
    selectedOpportunityForApply: null,
    selectedOpportunityForInterview: null,
    stagedFile: null
  };

  /* --------------------------------------------------------------------------
     2. DOM Element Selectors
     -------------------------------------------------------------------------- */
  const DOM = {
    // Top-level containers
    authSection: document.getElementById('auth-section'),
    appSection: document.getElementById('app-section'),

    // Auth forms & tabs
    tabLogin: document.getElementById('tab-login'),
    tabRegister: document.getElementById('tab-register'),
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    linkToRegister: document.getElementById('link-to-register'),
    linkToLogin: document.getElementById('link-to-login'),
    demoChip: document.getElementById('demo-chip'),
    loginEmail: document.getElementById('login-email'),
    loginPassword: document.getElementById('login-password'),
    regName: document.getElementById('reg-name'),
    regEmail: document.getElementById('reg-email'),
    regUniversity: document.getElementById('reg-university'),
    regMajor: document.getElementById('reg-major'),
    regPassword: document.getElementById('reg-password'),

    // Navigation & Header
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebar-backdrop'),
    btnToggleSidebar: document.getElementById('btn-toggle-sidebar'),
    btnCloseSidebar: document.getElementById('btn-close-sidebar'),
    navLinks: document.querySelectorAll('.sidebar-nav .nav-link'),
    headerPageTitle: document.getElementById('header-page-title'),
    btnLogout: document.getElementById('btn-logout'),

    // Theme toggle
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    iconThemeMoon: document.getElementById('icon-theme-moon'),
    iconThemeSun: document.getElementById('icon-theme-sun'),

    // Profile elements
    sidebarAvatar: document.getElementById('sidebar-avatar'),
    sidebarUserName: document.getElementById('sidebar-user-name'),
    sidebarUserRole: document.getElementById('sidebar-user-role'),
    headerAvatar: document.getElementById('header-avatar'),
    headerUserName: document.getElementById('header-user-name'),
    resumeStatusPill: document.getElementById('resume-status-pill'),
    internshipBadgeCount: document.getElementById('internship-badge-count'),
    hackathonBadgeCount: document.getElementById('hackathon-badge-count'),
    trackerBadgeCount: document.getElementById('tracker-badge-count'),

    // Notifications
    btnNotifications: document.getElementById('btn-notifications'),
    notificationsDropdown: document.getElementById('notifications-dropdown'),
    notificationCount: document.getElementById('notification-count'),
    notificationItemsList: document.getElementById('notification-items-list'),
    btnClearNotifications: document.getElementById('btn-clear-notifications'),

    // Views
    viewDashboard: document.getElementById('view-dashboard'),
    viewProfile: document.getElementById('view-profile'),
    viewOpportunities: document.getElementById('view-opportunities'),
    viewTracker: document.getElementById('view-tracker'),

    // Dashboard View elements
    dashboardWelcomeHeading: document.getElementById('dashboard-welcome-heading'),
    heroBtnUpload: document.getElementById('hero-btn-upload'),
    heroBtnExplore: document.getElementById('hero-btn-explore'),
    heroBtnTracker: document.getElementById('hero-btn-tracker'),
    btnSeeAllMatches: document.getElementById('btn-see-all-matches'),
    dashboardQuickGrid: document.getElementById('dashboard-quick-grid'),
    statInternshipsCount: document.getElementById('stat-internships-count'),
    statHackathonsCount: document.getElementById('stat-hackathons-count'),
    statSavedCount: document.getElementById('stat-saved-count'),

    // Profile View elements
    btnExportReport: document.getElementById('btn-export-report'),
    dropzone: document.getElementById('dropzone'),
    dropzonePrompt: document.getElementById('dropzone-prompt'),
    resumeFileInput: document.getElementById('resume-file-input'),
    btnBrowseFile: document.getElementById('btn-browse-file'),
    filePreviewBar: document.getElementById('file-preview-bar'),
    previewFileName: document.getElementById('preview-file-name'),
    previewFileSize: document.getElementById('preview-file-size'),
    btnRemoveFile: document.getElementById('btn-remove-file'),
    btnAnalyzeResume: document.getElementById('btn-analyze-resume'),
    analysisLoadingState: document.getElementById('analysis-loading-state'),
    analysisStatusText: document.getElementById('analysis-status-text'),
    profileOverviewCard: document.getElementById('profile-overview-card'),
    profileCardAvatar: document.getElementById('profile-card-avatar'),
    profileCardName: document.getElementById('profile-card-name'),
    profileCardEmail: document.getElementById('profile-card-email'),
    profileCardCollege: document.getElementById('profile-card-college'),
    profileCardMajor: document.getElementById('profile-card-major'),
    profileSkillsTags: document.getElementById('profile-skills-tags'),
    skillsCountPill: document.getElementById('skills-count-pill'),
    inputAddSkill: document.getElementById('input-add-skill'),
    btnAddSkill: document.getElementById('btn-add-skill'),
    profileStrengthsList: document.getElementById('profile-strengths-list'),
    profileWeaknessesList: document.getElementById('profile-weaknesses-list'),
    btnViewMatchesFromProfile: document.getElementById('btn-view-matches-from-profile'),
    lastAnalyzedTimestamp: document.getElementById('last-analyzed-timestamp'),

    // Live JD Matcher
    inputJdText: document.getElementById('input-jd-text'),
    btnRunJdMatch: document.getElementById('btn-run-jd-match'),
    btnLoadSampleJd: document.getElementById('btn-load-sample-jd'),
    jdResultBox: document.getElementById('jd-result-box'),
    jdScoreCircle: document.getElementById('jd-score-circle'),
    jdMatchVerdict: document.getElementById('jd-match-verdict'),
    jdMatchSubtext: document.getElementById('jd-match-subtext'),
    jdMatchedTags: document.getElementById('jd-matched-tags'),
    jdMissingTags: document.getElementById('jd-missing-tags'),

    // Opportunities View elements
    opportunitiesPageTitle: document.getElementById('opportunities-page-title'),
    filterSearchInput: document.getElementById('filter-search-input'),
    btnClearSearch: document.getElementById('btn-clear-search'),
    categoryPills: document.querySelectorAll('.category-pills .pill-btn'),
    filterRoleSelect: document.getElementById('filter-role-select'),
    sortSelect: document.getElementById('sort-select'),
    btnResetFilters: document.getElementById('btn-reset-filters'),
    opportunitiesGrid: document.getElementById('opportunities-grid'),
    resultsCountText: document.getElementById('results-count-text'),
    emptyState: document.getElementById('empty-state'),
    btnEmptyReset: document.getElementById('btn-empty-reset'),
    teammatesGrid: document.getElementById('teammates-grid'),

    // Kanban Board Elements
    kanbanListSaved: document.getElementById('kanban-list-saved'),
    kanbanListApplied: document.getElementById('kanban-list-applied'),
    kanbanListInterviewing: document.getElementById('kanban-list-interviewing'),
    kanbanListOffer: document.getElementById('kanban-list-offer'),
    kanbanCountSaved: document.getElementById('kanban-count-saved'),
    kanbanCountApplied: document.getElementById('kanban-count-applied'),
    kanbanCountInterviewing: document.getElementById('kanban-count-interviewing'),
    kanbanCountOffer: document.getElementById('kanban-count-offer'),
    metricTotalActive: document.getElementById('metric-total-active'),
    metricInterviewsCount: document.getElementById('metric-interviews-count'),
    metricOffersCount: document.getElementById('metric-offers-count'),
    metricResponseRate: document.getElementById('metric-response-rate'),

    // Apply Modal
    applyModal: document.getElementById('apply-modal'),
    modalCategoryBadge: document.getElementById('modal-category-badge'),
    modalTitle: document.getElementById('modal-title'),
    modalCompanyTitle: document.getElementById('modal-company-title'),
    modalMatchPill: document.getElementById('modal-match-pill'),
    modalMatchExplanation: document.getElementById('modal-match-explanation'),
    applyApplicantName: document.getElementById('apply-applicant-name'),
    applyApplicantEmail: document.getElementById('apply-applicant-email'),
    applyNote: document.getElementById('apply-note'),
    applyForm: document.getElementById('apply-form'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    btnCancelModal: document.getElementById('btn-cancel-modal'),

    // Interview Prep Modal
    interviewModal: document.getElementById('interview-modal'),
    interviewModalBadge: document.getElementById('interview-modal-badge'),
    interviewModalTitle: document.getElementById('interview-modal-title'),
    interviewModalSubtitle: document.getElementById('interview-modal-subtitle'),
    interviewFormatTitle: document.getElementById('interview-format-title'),
    interviewFormatDesc: document.getElementById('interview-format-desc'),
    interviewQuestionsList: document.getElementById('interview-questions-list'),
    btnCloseInterviewModal: document.getElementById('btn-close-interview-modal'),
    btnDoneInterviewModal: document.getElementById('btn-done-interview-modal'),
    btnApplyFromInterview: document.getElementById('btn-apply-from-interview'),

    // Toasts
    toastContainer: document.getElementById('toast-container')
  };

  /* --------------------------------------------------------------------------
     3. Toast Notifications & Helpers
     -------------------------------------------------------------------------- */
  function showToast(message, type = 'info', duration = 3500) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = '';
    if (type === 'success') {
      icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === 'warning') {
      icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
      icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `${icon}<span>${escapeHtml(message)}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.25s ease forwards';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getInitials(name) {
    if (!name) return 'IM';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /* --------------------------------------------------------------------------
     4. Theme Engine (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  function initTheme() {
    const savedTheme = localStorage.getItem('InternHunt_theme') || 'light';
    setTheme(savedTheme);

    DOM.btnThemeToggle.addEventListener('click', () => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      showToast(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`, 'info');
    });
  }

  function setTheme(theme) {
    state.theme = theme;
    localStorage.setItem('InternHunt_theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      DOM.iconThemeMoon.classList.add('hidden');
      DOM.iconThemeSun.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark-theme');
      DOM.iconThemeMoon.classList.remove('hidden');
      DOM.iconThemeSun.classList.add('hidden');
    }
  }

  /* --------------------------------------------------------------------------
     5. Auth Logic & View Transitions
     -------------------------------------------------------------------------- */
  function setAuthTab(tab) {
    if (tab === 'login') {
      DOM.tabLogin.classList.add('active');
      DOM.tabLogin.setAttribute('aria-selected', 'true');
      DOM.tabRegister.classList.remove('active');
      DOM.tabRegister.setAttribute('aria-selected', 'false');
      DOM.loginForm.classList.add('active');
      DOM.registerForm.classList.remove('active');
    } else {
      DOM.tabRegister.classList.add('active');
      DOM.tabRegister.setAttribute('aria-selected', 'true');
      DOM.tabLogin.classList.remove('active');
      DOM.tabLogin.setAttribute('aria-selected', 'false');
      DOM.registerForm.classList.add('active');
      DOM.loginForm.classList.remove('active');
    }
  }

  const AUTH_URL = "http://localhost/projects/internhunt/php/auth.php";
  const LOGOUT_URL = "http://localhost/projects/internhunt/php/logout.php";

  async function handleLoginSubmit(e) {
    e.preventDefault();

    const submitButton = DOM.loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      const response = await fetch(AUTH_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "login",
          email: DOM.loginEmail.value.trim(),
          password: DOM.loginPassword.value
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.detail || "Login failed.");
      }

      const user = data.user;

      state.user.name = user.name;
      state.user.email = user.email;
      state.user.university = user.university || "";
      state.user.major = user.major || "";
      state.user.avatarText = getInitials(user.name);
      state.isAuthenticated = true;

      showToast(`Welcome back, ${user.name}!`, "success");
      transitionToApp();

      DOM.loginForm.reset();
    } catch (error) {
      showToast(error.message || "Unable to connect to server.", "error");
    } finally {
      submitButton.disabled = false;
    }
  }


  async function handleRegisterSubmit(e) {
    e.preventDefault();

    const submitButton = DOM.registerForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      const response = await fetch(AUTH_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "register",
          name: DOM.regName.value.trim(),
          email: DOM.regEmail.value.trim(),
          password: DOM.regPassword.value
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.detail || "Registration failed.");
      }

      const user = data.user;

      state.user.name = user.name;
      state.user.email = user.email;
      state.user.university = user.university || "";
      state.user.major = user.major || "";
      state.user.avatarText = getInitials(user.name);
      state.isAuthenticated = true;

      showToast("Account created successfully!", "success");
      transitionToApp();

      DOM.registerForm.reset();
    } catch (error) {
      showToast(error.message || "Unable to connect to server.", "error");
    } finally {
      submitButton.disabled = false;
    }
  }


  async function handleLogout() {
    try {
      const response = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Logout request failed.");
      }

      state.isAuthenticated = false;
      DOM.appSection.classList.add("hidden");
      DOM.authSection.classList.remove("hidden");

      setAuthTab("login");
      showToast("You have been signed out.", "info");
    } catch (error) {
      showToast("Unable to log out. Please try again.", "error");
      console.error(error);
    }
  }


  async function restoreSession() {
    try {
      const response = await fetch(
        "http://localhost/projects/internhunt/php/me.php",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) {
        state.isAuthenticated = false;
        return;
      }

      const data = await response.json();

      if (!data.success || !data.user) {
        state.isAuthenticated = false;
        return;
      }

      const user = data.user;

      state.user.name = user.name;
      state.user.email = user.email;
      state.user.university = user.university || "";
      state.user.major = user.major || "";
      state.user.avatarText = getInitials(user.name);
      state.isAuthenticated = true;

      transitionToApp();

    } catch (error) {
      console.error("Session restoration failed:", error);
    }
  }


  function transitionToApp() {
    DOM.authSection.classList.add("hidden");
    DOM.appSection.classList.remove("hidden");

    updateUserProfileDisplays();
    renderOpportunities();
    renderDashboardTopPicks();
    renderNotifications();
    renderKanbanBoard();
    renderTeammates();

    switchSection("view-dashboard");

    loadUserSkills();
    // Fetch real matching internships from PHP.
    loadMatchingInternships();

  }



  const MATCHING_INTERNSHIPS_URL =
    "http://localhost/projects/internhunt/php/matching_internships.php";





async function loadMatchingInternships() {
  const container = DOM.opportunitiesGrid;
  if (!container) return;

  container.innerHTML = "<p>Loading matching opportunities...</p>";

  try {
    const response = await fetch(
      "http://localhost/projects/internhunt/php/matching_internships.php",
      {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || "Failed to load opportunities."
      );
    }

    const opportunities = data.matches || data.internships || [];
    const rawUserSkills = data.user_skills ?? data.userSkills ?? [];

    const userSkills = (
      Array.isArray(rawUserSkills)
        ? rawUserSkills
        : typeof rawUserSkills === "string"
          ? (() => {
              try {
                const parsed = JSON.parse(rawUserSkills);
                return Array.isArray(parsed)
                  ? parsed
                  : rawUserSkills.split(",");
              } catch {
                return rawUserSkills.split(",");
              }
            })()
          : []
    )
      .map(skill => String(skill).trim().toLowerCase())
      .filter(Boolean);

    const mappedOpportunities = opportunities.map((item, index) => {
      let requiredSkills =
        item.required_skills ?? item.requiredSkills ?? [];

      if (typeof requiredSkills === "string") {
        try {
          requiredSkills = JSON.parse(requiredSkills);
        } catch {
          requiredSkills = requiredSkills.split(",");
        }
      }

      if (!Array.isArray(requiredSkills)) {
        requiredSkills = [];
      }

      requiredSkills = [
        ...new Set(
          requiredSkills
            .map(skill => String(skill).trim().toLowerCase())
            .filter(Boolean)
        )
      ];

      const matchedSkills = requiredSkills.filter(skill =>
        userSkills.includes(skill)
      );

      const calculatedMatch = requiredSkills.length > 0
        ? Math.round(
            (matchedSkills.length / requiredSkills.length) * 100
          )
        : 0;

      const apiMatch = Number(
        item.match_percentage ?? item.match_score
      );

      const baseScore =
        Number.isFinite(apiMatch) &&
        item.match_percentage != null &&
        item.match_percentage !== ""
          ? apiMatch
          : calculatedMatch;

      const company = item.company ?? item.company_name ?? "Company";
      const title =
        item.title ?? item.role ?? item.job_title ?? "Opportunity";

      const type = String(item.type ?? "internship").toLowerCase();
      const category = type === "hackathon" ? "hackathon" : "internship";

      const deadline = item.deadline ?? item.deadline_date ?? null;
      const parsedDeadline = deadline ? new Date(deadline) : null;

      const validDeadline =
        parsedDeadline && !Number.isNaN(parsedDeadline.getTime());

      const daysLeft = validDeadline
        ? Math.max(
            0,
            Math.ceil(
              (parsedDeadline.getTime() - Date.now()) / 86400000
            )
          )
        : 30;

      return {
        id: `db-${item.id ?? index}`,
        originalId: item.id,
        company,
        logoInitial: company.substring(0, 2).toUpperCase(),
        logoBg: category === "hackathon"
          ? "linear-gradient(135deg, #ea580c, #db2777)"
          : "linear-gradient(135deg, #2563eb, #7c3aed)",
        category,
        domain: item.domain ?? "all",
        role: title,
        location: item.location ?? "Not specified",
        stipend: category === "hackathon"
          ? (item.stipend ?? item.prize_pool ?? "See details")
          : (item.stipend ?? item.salary ?? "Not specified"),
        deadlineDate: validDeadline
          ? parsedDeadline.toISOString().slice(0, 10)
          : "",
        deadlineDisplay: validDeadline
          ? parsedDeadline.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })
          : "Not specified",
        daysLeft,
        requiredSkills,
        baseScore,
        description: item.description ?? "",
        interviewFormat: item.interview_format ?? "",
        interviewQuestions: [],
        matchedSkills: item.matched_skills ?? matchedSkills,
        missingSkills: item.missing_skills ?? requiredSkills.filter(
          skill => !userSkills.includes(skill)
        ),
        register_url: item.register_url ?? "#"
      };
    });

    state.opportunities = mappedOpportunities;

    // Update hero percentage and circular SVG progress.
    const heroMatchPct = document.getElementById("hero-match-pct");
    const heroMatchCircle = document.getElementById("hero-match-circle");

    const overallMatch = mappedOpportunities.length > 0
      ? Math.round(
          mappedOpportunities.reduce(
            (total, item) => total + item.baseScore,
            0
          ) / mappedOpportunities.length
        )
      : 0;

    const percentage = Math.max(0, Math.min(100, overallMatch));

    if (heroMatchPct) {
      heroMatchPct.textContent = `${percentage}%`;
    }

    if (heroMatchCircle) {
      heroMatchCircle.setAttribute(
        "stroke-dasharray",
        `${percentage}, 100`
      );
    }

    renderOpportunities();
    renderDashboardTopPicks();

    const internshipCount = mappedOpportunities.filter(
      item => item.category === "internship"
    ).length;

    const hackathonCount = mappedOpportunities.filter(
      item => item.category === "hackathon"
    ).length;

    showToast(
      `Loaded ${internshipCount} internships and ${hackathonCount} hackathons.`,
      "success"
    );

  } catch (error) {
    console.error("Matching opportunities error:", error);

    container.innerHTML = "";

    if (DOM.emptyState) {
      DOM.emptyState.classList.remove("hidden");
    }

    if (DOM.resultsCountText) {
      DOM.resultsCountText.textContent =
        "Unable to load opportunities.";
    }

    showToast(
      error.message || "Unable to load opportunities.",
      "error"
    );
  }
}




  function updateUserProfileDisplays() {
    DOM.sidebarAvatar.textContent = state.user.avatarText;
    DOM.headerAvatar.textContent = state.user.avatarText;
    DOM.profileCardAvatar.textContent = state.user.avatarText;

    DOM.sidebarUserName.textContent = state.user.name;
    DOM.headerUserName.textContent = state.user.name;
    DOM.profileCardName.textContent = state.user.name;
    DOM.dashboardWelcomeHeading.textContent = `Welcome back, ${state.user.name.split(' ')[0]}! 👋`;

    DOM.profileCardEmail.textContent = state.user.email;
    DOM.profileCardCollege.textContent = state.user.university;
    DOM.profileCardMajor.textContent = state.user.major;

    renderProfileSkills();
    renderProfileStrengthsAndWeaknesses();
  }

  /* --------------------------------------------------------------------------
     6. Navigation & View Switcher
     -------------------------------------------------------------------------- */
  function switchSection(targetViewId, filterCategory = null) {
    state.currentView = targetViewId;

    document.querySelectorAll('.content-view').forEach(view => {
      view.classList.remove('active');
    });

    DOM.navLinks.forEach(link => {
      link.classList.remove('active');
      const viewAttr = link.getAttribute('data-view');
      const catAttr = link.getAttribute('data-category');

      if (viewAttr === targetViewId) {
        if (filterCategory && catAttr) {
          if (filterCategory === catAttr) link.classList.add('active');
        } else if (!filterCategory && !catAttr) {
          link.classList.add('active');
        }
      }
    });

    const targetElement = document.getElementById(targetViewId);
    if (targetElement) {
      targetElement.classList.add('active');
    }

    if (targetViewId === 'view-dashboard') {
      DOM.headerPageTitle.textContent = 'Dashboard Overview';
    } else if (targetViewId === 'view-profile') {
      DOM.headerPageTitle.textContent = 'Profile & Resume Analysis';
    } else if (targetViewId === 'view-tracker') {
      DOM.headerPageTitle.textContent = 'Application Pipeline Tracker';
      renderKanbanBoard();
    } else if (targetViewId === 'view-opportunities') {
      if (filterCategory === 'internship') {
        DOM.headerPageTitle.textContent = 'Matched Internships';
        DOM.opportunitiesPageTitle.textContent = 'Matched Internships';
        setOpportunityCategoryFilter('internship');
      } else if (filterCategory === 'hackathon') {
        DOM.headerPageTitle.textContent = 'Curated Hackathons';
        DOM.opportunitiesPageTitle.textContent = 'Curated Hackathons';
        setOpportunityCategoryFilter('hackathon');
      } else {
        DOM.headerPageTitle.textContent = 'Matched Opportunities';
        DOM.opportunitiesPageTitle.textContent = 'Matched Opportunities';
        setOpportunityCategoryFilter('all');
      }
    }

    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openMobileSidebar() {
    DOM.sidebar.classList.add('open');
    DOM.sidebarBackdrop.classList.add('active');
  }

  function closeMobileSidebar() {
    DOM.sidebar.classList.remove('open');
    DOM.sidebarBackdrop.classList.remove('active');
  }

  /* --------------------------------------------------------------------------
     7. Dynamic Opportunity & Skill Gap Computation
     -------------------------------------------------------------------------- */
  function evaluateOpportunityMatch(opportunity) {
    const candidateSkillsLower = state.user.skills.map(s => s.toLowerCase());
    const matchedSkills = [];
    const missingSkills = [];

    opportunity.requiredSkills.forEach(reqSkill => {
      const isPresent = candidateSkillsLower.some(candSkill => {
        return candSkill.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(candSkill);
      });

      if (isPresent) {
        matchedSkills.push(reqSkill);
      } else {
        missingSkills.push(reqSkill);
      }
    });

    const totalRequired = opportunity.requiredSkills.length;
    let score = totalRequired > 0 ? Math.round((matchedSkills.length / totalRequired) * 100) : 80;

    score = Math.round((score * 0.7) + (opportunity.baseScore * 0.3));
    score = Math.min(99, Math.max(45, score));

    return {
      score,
      matchedSkills,
      missingSkills
    };
  }

  function getMatchScoreClass(score) {
    if (score >= 80) return 'match-high';
    if (score >= 60) return 'match-medium';
    return 'match-low';
  }

  function renderOpportunities() {
    const container = DOM.opportunitiesGrid;
    container.innerHTML = '';

    const { searchTerm, category, domain, sortBy } = state.filters;
    const searchLower = searchTerm.toLowerCase().trim();

    let list = state.opportunities.filter(opp => {
      if (category !== 'all' && opp.category !== category) return false;
      if (domain !== 'all' && opp.domain !== domain) return false;

      if (searchLower) {
        const titleMatch = opp.role.toLowerCase().includes(searchLower);
        const companyMatch = opp.company.toLowerCase().includes(searchLower);
        const skillMatch = opp.requiredSkills.some(s => s.toLowerCase().includes(searchLower));
        if (!titleMatch && !companyMatch && !skillMatch) return false;
      }

      return true;
    });

    list.sort((a, b) => {
      const evalA = evaluateOpportunityMatch(a);
      const evalB = evaluateOpportunityMatch(b);

      if (sortBy === 'match-desc') return evalB.score - evalA.score;
      if (sortBy === 'deadline-asc') return a.daysLeft - b.daysLeft;
      if (sortBy === 'name-asc') return a.company.localeCompare(b.company);
      return 0;
    });

    DOM.resultsCountText.innerHTML = `Showing <strong>${list.length}</strong> matched ${list.length === 1 ? 'opportunity' : 'opportunities'}`;

    if (list.length === 0) {
      DOM.emptyState.classList.remove('hidden');
    } else {
      DOM.emptyState.classList.add('hidden');
    }

    list.forEach(opp => {
      const card = createOpportunityCardElement(opp);
      container.appendChild(card);
    });

    const internshipCount = state.opportunities.filter(o => o.category === 'internship').length;
    const hackathonCount = state.opportunities.filter(o => o.category === 'hackathon').length;
    DOM.internshipBadgeCount.textContent = internshipCount;
    DOM.hackathonBadgeCount.textContent = hackathonCount;
    DOM.statInternshipsCount.textContent = internshipCount + 10;
    DOM.statHackathonsCount.textContent = hackathonCount + 4;
    DOM.statSavedCount.textContent = state.user.bookmarkedIds.size;
  }


  function createOpportunityCardElement(opp) {
    const { score, missingSkills: evaluatedMissingSkills } =
      evaluateOpportunityMatch(opp);

    const scoreClass = getMatchScoreClass(score);
    const isBookmarked = state.user.bookmarkedIds.has(opp.id);

    const card = document.createElement('article');
    card.className = 'opportunity-card';
    card.setAttribute('data-id', opp.id);

    // Prefer skills calculated by PHP; fall back to frontend matching.
    const requiredSkills = Array.isArray(opp.requiredSkills)
      ? opp.requiredSkills
      : [];

    const matchedSkills = Array.isArray(opp.matchedSkills)
      ? opp.matchedSkills
      : requiredSkills.filter(skill =>
        state.user.skills.some(
          userSkill =>
            userSkill.trim().toLowerCase() ===
            skill.trim().toLowerCase()
        )
      );

    const missingSkills = Array.isArray(opp.missingSkills)
      ? opp.missingSkills
      : evaluatedMissingSkills;

    // Required competencies: green for matched skills, neutral otherwise.
    const reqSkillsHtml = requiredSkills.map(skill => {
      const matched = matchedSkills.some(
        item => item.trim().toLowerCase() === skill.trim().toLowerCase()
      );

      return `
            <span class="card-tag ${matched ? 'skill-matched' : ''}"
                  title="${matched ? 'You have this skill' : 'Required skill'}">
                ${matched ? '✓ ' : ''}${escapeHtml(skill)}
            </span>
        `;
    }).join('');

    // Skills the user still needs to learn.
    const skillGapsHtml = missingSkills.length > 0
      ? missingSkills.map(skill => `
            <span class="card-tag skill-gap"
                  title="Skill to learn or improve">
                ${escapeHtml(skill)}
            </span>
        `).join('')
      : `
            <span class="card-tag skill-matched">
                ✓ All required skills matched!
            </span>
        `;

    card.innerHTML = `
      <div class="card-top-row">
        <div class="company-branding">
          <div class="company-logo-placeholder"
               style="background: ${opp.logoBg};">
            ${escapeHtml(opp.logoInitial)}
          </div>

          <div class="company-info">
            <span class="company-name">
              ${escapeHtml(opp.company)}
            </span>

            <span class="location-mode">
              <svg width="12" height="12" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${escapeHtml(opp.location)}
            </span>
          </div>
        </div>

        <span class="category-badge ${opp.category}">
          ${opp.category === 'internship' ? 'Internship' : 'Hackathon'}
        </span>
      </div>

      <h3 class="role-title">${escapeHtml(opp.role)}</h3>

      <div class="match-score-pill ${scoreClass}">
        <svg width="15" height="15" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${score}% Match</span>
      </div>

      <div class="card-skills-section">
        <div class="skills-group">
          <span class="skills-group-label">
            Matched Skills (${matchedSkills.length})
          </span>
          <div class="skills-tags-wrap">
            ${matchedSkills.length
        ? matchedSkills.map(skill => `
                        <span class="card-tag skill-matched">
                          ✓ ${escapeHtml(skill)}
                        </span>
                    `).join('')
        : '<span class="card-tag">No matching skills yet</span>'
      }
          </div>
        </div>

        <div class="skills-group">
          <span class="skills-group-label"
                style="color: var(--rose-600);">
            Missing Skills (${missingSkills.length})
          </span>
          <div class="skills-tags-wrap">
            ${skillGapsHtml}
          </div>
        </div>
      </div>

      <div class="card-meta-row">
        <span class="meta-stipend">${escapeHtml(opp.stipend)}</span>

        <span class="meta-deadline ${opp.daysLeft <= 14 ? 'urgent' : ''}">
          <svg width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 14 14"></polyline>
          </svg>
          ${escapeHtml(opp.deadlineDisplay)}
          (${opp.daysLeft}d left)
        </span>
      </div>

      <div class="card-actions-row">
        <button type="button"
                class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}"
                data-id="${opp.id}"
                title="${isBookmarked ? 'Remove Bookmark' : 'Save Opportunity'}">
          <svg width="18" height="18" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <button type="button"
                class="btn btn-secondary-sm btn-prep-card"
                data-id="${opp.id}"
                title="Interview prep & questions">
          <svg width="15" height="15" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Prep Questions</span>
        </button>

        <button type="button"
                class="btn btn-primary btn-block btn-apply-card"
                data-id="${opp.id}">
          <span>Apply Now</span>
          <svg width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    `;

    const bookmarkBtn = card.querySelector('.btn-bookmark');
    bookmarkBtn.addEventListener('click', () =>
      toggleBookmark(opp.id, bookmarkBtn)
    );

    const prepBtn = card.querySelector('.btn-prep-card');
    prepBtn.addEventListener('click', () =>
      openInterviewPrepModal(opp)
    );

    const applyBtn = card.querySelector('.btn-apply-card');

    applyBtn.addEventListener('click', () => {
      const url = opp.register_url;

      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        showToast('Registration URL is not available.', 'warning');
      }
    });
    return card;
  }

  function toggleBookmark(oppId, btnElement) {
    if (state.user.bookmarkedIds.has(oppId)) {
      state.user.bookmarkedIds.delete(oppId);
      btnElement.classList.remove('bookmarked');
      // remove from kanban saved
      state.kanban.saved = state.kanban.saved.filter(id => id !== oppId);
      showToast('Removed from saved opportunities', 'info');
    } else {
      state.user.bookmarkedIds.add(oppId);
      btnElement.classList.add('bookmarked');
      if (!state.kanban.saved.includes(oppId)) {
        state.kanban.saved.push(oppId);
      }
      showToast('Opportunity saved to your Application Tracker!', 'success');
    }
    DOM.statSavedCount.textContent = state.user.bookmarkedIds.size;
    renderKanbanBoard();
  }

  function renderDashboardTopPicks() {
    const quickGrid = DOM.dashboardQuickGrid;
    quickGrid.innerHTML = '';

    const sorted = [...state.opportunities].sort((a, b) => {
      return evaluateOpportunityMatch(b).score - evaluateOpportunityMatch(a).score;
    }).slice(0, 3);

    sorted.forEach(opp => {
      const { score } = evaluateOpportunityMatch(opp);
      const scoreClass = getMatchScoreClass(score);

      const item = document.createElement('div');
      item.className = 'metric-card';
      item.style.cursor = 'pointer';
      item.innerHTML = `
        <div class="company-logo-placeholder" style="background: ${opp.logoBg}; width: 44px; height: 44px; font-size: 1rem;">
          ${escapeHtml(opp.logoInitial)}
        </div>
        <div style="flex: 1; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">${escapeHtml(opp.company)}</span>
            <span class="match-score-pill ${scoreClass}" style="margin: 0; padding: 2px 7px; font-size: 0.72rem;">${score}%</span>
          </div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px;">
            ${escapeHtml(opp.role)}
          </h4>
          <span style="font-size: 0.775rem; color: var(--text-muted);">${escapeHtml(opp.deadlineDisplay)} • ${escapeHtml(opp.location)}</span>
        </div>
      `;
      item.addEventListener('click', () => {
        switchSection('view-opportunities');
      });
      quickGrid.appendChild(item);
    });
  }

  function setOpportunityCategoryFilter(category) {
    state.filters.category = category;
    DOM.categoryPills.forEach(pill => {
      if (pill.getAttribute('data-category') === category) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
    renderOpportunities();
  }



  /* --------------------------------------------------------------------------
     8. Resume Drag & Drop, File Upload & 2-Second Mock Analysis
     -------------------------------------------------------------------------- */
  function initResumeHandlers() {
    const dropzone = DOM.dropzone;
    const fileInput = DOM.resumeFileInput;

    DOM.btnBrowseFile.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });

    dropzone.addEventListener('click', () => {
      if (!state.stagedFile) fileInput.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        handleFileSelection(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
      }
    });

    DOM.btnRemoveFile.addEventListener('click', (e) => {
      e.stopPropagation();
      clearStagedFile();
    });

    DOM.btnAnalyzeResume.addEventListener('click', runResumeAnalysis);
  }

  function handleFileSelection(file) {
    const validExtensions = ['.pdf', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      showToast('Please upload a valid PDF or DOCX resume.', 'warning');
      return;
    }

    state.stagedFile = file;
    state.user.resumeFileName = file.name;

    DOM.previewFileName.textContent = file.name;
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    DOM.previewFileSize.textContent = `${sizeInMB} MB • Ready for ATS analysis`;

    DOM.dropzonePrompt.classList.add('hidden');
    DOM.filePreviewBar.classList.remove('hidden');
    showToast(`File "${file.name}" staged. Click "Analyze Resume".`, 'info');
  }

  function clearStagedFile() {
    state.stagedFile = null;
    DOM.resumeFileInput.value = '';
    DOM.dropzonePrompt.classList.remove('hidden');
    DOM.filePreviewBar.classList.add('hidden');
  }
  DOM.resumeFileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await uploadResume(file);
  });
  function runResumeAnalysis() {
    DOM.analysisLoadingState.classList.remove('hidden');
    DOM.btnAnalyzeResume.disabled = true;

    const statusTexts = [
      'Parsing PDF syntax and document AST...',
      'Extracting verified technical competencies & projects...',
      'Cross-referencing requirements across 2026/2027 job database...'
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < statusTexts.length) {
        DOM.analysisStatusText.textContent = statusTexts[step];
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      DOM.analysisLoadingState.classList.add('hidden');
      DOM.btnAnalyzeResume.disabled = false;

      state.user.resumeAnalyzed = true;
      state.user.atsScore = Math.floor(Math.random() * 6) + 91;

      const potentialSkills = ['Docker', 'TypeScript', 'GraphQL', 'AWS'];
      potentialSkills.forEach(newSkill => {
        if (!state.user.skills.includes(newSkill) && Math.random() > 0.4) {
          state.user.skills.push(newSkill);
        }
      });

      updateUserProfileDisplays();
      renderOpportunities();
      renderDashboardTopPicks();

      DOM.resumeStatusPill.textContent = 'Analyzed';
      DOM.resumeStatusPill.classList.add('analyzed');

      const now = new Date();
      DOM.lastAnalyzedTimestamp.textContent = `Analyzed at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} with InternHunt AI Engine v4.2`;

      DOM.profileOverviewCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast('Resume analysis complete! 9+ verified technical skills extracted.', 'success');
    }, 2000);
  }


  async function uploadResume(file) {
    if (!file) {
      showToast("Please select a resume.", "warning");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      showToast("Only PDF and DOCX files are allowed.", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Resume must be smaller than 5 MB.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      showToast("Uploading resume...", "info");

      const response = await fetch(
        "http://localhost/projects/internhunt/php/upload_resume.php",
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Resume upload failed.");
      }

      state.user.resumeFileName = file.name;
      state.user.resumeAnalyzed = false;

      showToast("Resume uploaded successfully!", "success");

      if (DOM.resumeStatusPill) {
        DOM.resumeStatusPill.textContent = "Uploaded";
      }

      return data;
    } catch (error) {
      showToast(error.message || "Unable to upload resume.", "error");
      return null;
    }
  }


  function renderProfileSkills() {
    const cloud = DOM.profileSkillsTags;
    cloud.innerHTML = '';

    state.user.skills.forEach(skill => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.innerHTML = `
        <span>${escapeHtml(skill)}</span>
        <button type="button" class="btn-remove-skill" data-skill="${escapeHtml(skill)}" title="Remove skill" style="cursor:pointer; color:var(--text-light); font-weight:700;">×</button>
      `;

      tag.querySelector('.btn-remove-skill').addEventListener('click', (e) => {
        e.stopPropagation();
        removeSkill(skill);
      });

      cloud.appendChild(tag);
    });

    DOM.skillsCountPill.textContent = `${state.user.skills.length} Skills`;
  }

  function removeSkill(skillToRemove) {
    state.user.skills = state.user.skills.filter(s => s !== skillToRemove);
    renderProfileSkills();
    renderOpportunities();
    renderDashboardTopPicks();
    renderKanbanBoard();
    showToast(`Skill "${skillToRemove}" removed. Opportunities recalculated.`, 'info');
  }

  function addCustomSkill() {
    const input = DOM.inputAddSkill;
    const newSkill = input.value.trim();

    if (!newSkill) return;

    if (state.user.skills.map(s => s.toLowerCase()).includes(newSkill.toLowerCase())) {
      showToast('This skill is already in your profile!', 'warning');
      return;
    }

    state.user.skills.push(newSkill);
    input.value = '';
    renderProfileSkills();
    renderOpportunities();
    renderDashboardTopPicks();
    renderKanbanBoard();
    showToast(`Added "${newSkill}" to your skill profile!`, 'success');
  }

  function renderProfileStrengthsAndWeaknesses() {
    const strengthsContainer = DOM.profileStrengthsList;
    strengthsContainer.innerHTML = '';
    state.user.strengths.forEach(str => {
      const li = document.createElement('li');
      li.className = 'list-bullet-item';
      li.innerHTML = `
        <svg class="bullet-icon emerald" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${escapeHtml(str)}</span>
      `;
      strengthsContainer.appendChild(li);
    });

    const weaknessesContainer = DOM.profileWeaknessesList;
    weaknessesContainer.innerHTML = '';
    state.user.weaknesses.forEach(wk => {
      const li = document.createElement('li');
      li.className = 'list-bullet-item';
      li.innerHTML = `
        <svg class="bullet-icon rose" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>${escapeHtml(wk)}</span>
      `;
      weaknessesContainer.appendChild(li);
    });
  }

  /* --------------------------------------------------------------------------
     9. PREMIUM FEATURE: Live Job Description (JD) Matcher
     -------------------------------------------------------------------------- */
  function initLiveJdMatcher() {
    DOM.btnLoadSampleJd.addEventListener('click', () => {
      DOM.inputJdText.value = `We are looking for a Summer Software Engineering Intern to join our Web Infrastructure team. 
The ideal candidate is proficient with Python, JavaScript (ES6+), React, and RESTful APIs. 
Experience with Docker, Kubernetes, and PostgreSQL is a big plus. Candidates should have a solid foundation in Data Structures and Algorithms.`;
      showToast('Sample job description loaded.', 'info');
    });

    DOM.btnRunJdMatch.addEventListener('click', runJdAnalysis);
  }

  function runJdAnalysis() {
    const text = DOM.inputJdText.value.trim().toLowerCase();
    if (!text) {
      showToast('Please paste a job description or click "Load Sample Job Posting"', 'warning');
      return;
    }

    const testKeywords = [
      'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'PostgreSQL',
      'Docker', 'Kubernetes', 'REST APIs', 'Data Structures', 'TypeScript',
      'GraphQL', 'AWS', 'Go', 'Git'
    ];

    const matched = [];
    const missing = [];

    const userSkillsLower = state.user.skills.map(s => s.toLowerCase());

    testKeywords.forEach(kw => {
      if (text.includes(kw.toLowerCase())) {
        const userHas = userSkillsLower.some(us => us.includes(kw.toLowerCase()) || kw.toLowerCase().includes(us));
        if (userHas) {
          matched.push(kw);
        } else {
          missing.push(kw);
        }
      }
    });

    const totalKeywords = matched.length + missing.length;
    let matchPct = totalKeywords > 0 ? Math.round((matched.length / totalKeywords) * 100) : 75;
    matchPct = Math.max(35, Math.min(98, matchPct));

    DOM.jdScoreCircle.textContent = `${matchPct}%`;
    DOM.jdResultBox.classList.remove('hidden');

    if (matchPct >= 80) {
      DOM.jdMatchVerdict.textContent = 'High ATS Compatibility';
      DOM.jdMatchSubtext.textContent = `Your verified resume matches ${matched.length} key competencies found in this JD.`;
    } else if (matchPct >= 60) {
      DOM.jdMatchVerdict.textContent = 'Moderate Match - Action Recommended';
      DOM.jdMatchSubtext.textContent = `Add missing skills (${missing.slice(0, 2).join(', ')}) to your resume to increase interview callback rate.`;
    } else {
      DOM.jdMatchVerdict.textContent = 'Skill Gap Detected';
      DOM.jdMatchSubtext.textContent = `Consider completing projects in ${missing.slice(0, 3).join(', ')} before applying.`;
    }

    DOM.jdMatchedTags.innerHTML = matched.length > 0
      ? matched.map(m => `<span class="card-tag" style="background:#ecfdf5; color:#047857;">${escapeHtml(m)}</span>`).join('')
      : '<span class="card-tag">None detected</span>';

    DOM.jdMissingTags.innerHTML = missing.length > 0
      ? missing.map(m => `<span class="card-tag skill-gap">${escapeHtml(m)}</span>`).join('')
      : '<span class="card-tag" style="background:#ecfdf5; color:#047857;">No missing gaps!</span>';

    showToast(`JD Match calculated: ${matchPct}% compatibility`, 'success');
  }

  /* --------------------------------------------------------------------------
     10. PREMIUM FEATURE: Application Tracker & Kanban Pipeline
     -------------------------------------------------------------------------- */
  function renderKanbanBoard() {
    const stages = ['saved', 'applied', 'interviewing', 'offer'];
    let totalCount = 0;

    stages.forEach(stage => {
      const listContainer = document.getElementById(`kanban-list-${stage}`);
      const countBadge = document.getElementById(`kanban-count-${stage}`);
      if (!listContainer) return;

      listContainer.innerHTML = '';
      const ids = state.kanban[stage] || [];
      countBadge.textContent = ids.length;
      totalCount += ids.length;

      if (ids.length === 0) {
        listContainer.innerHTML = `<div class="kanban-empty-slot">No opportunities in this stage</div>`;
        return;
      }

      ids.forEach(id => {
        const opp = state.opportunities.find(o => o.id === id);
        if (!opp) return;

        const { score } = evaluateOpportunityMatch(opp);
        const scoreClass = getMatchScoreClass(score);

        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.innerHTML = `
          <div class="kanban-card-top">
            <span class="kanban-company">${escapeHtml(opp.company)}</span>
            <span class="match-score-pill ${scoreClass}" style="margin: 0; padding: 2px 6px; font-size: 0.7rem;">${score}%</span>
          </div>
          <h5 class="kanban-role">${escapeHtml(opp.role)}</h5>
          <div class="kanban-meta-row">
            <span>${escapeHtml(opp.deadlineDisplay)}</span>
            <span style="font-weight:700;">${escapeHtml(opp.stipend.split('+')[0])}</span>
          </div>
          <div class="kanban-move-actions">
            ${stage !== 'saved' ? `<button type="button" class="btn-kanban-stage btn-move-prev" title="Move back">← Back</button>` : ''}
            ${stage !== 'offer' ? `<button type="button" class="btn-kanban-stage btn-move-next" title="Advance stage">Advance →</button>` : ''}
            <button type="button" class="btn-kanban-stage btn-remove-kanban" title="Remove" style="color:var(--rose-600);">✕</button>
          </div>
        `;

        const prevBtn = card.querySelector('.btn-move-prev');
        if (prevBtn) {
          prevBtn.addEventListener('click', () => moveKanbanCard(id, stage, -1));
        }

        const nextBtn = card.querySelector('.btn-move-next');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => moveKanbanCard(id, stage, 1));
        }

        const removeBtn = card.querySelector('.btn-remove-kanban');
        removeBtn.addEventListener('click', () => removeKanbanCard(id, stage));

        listContainer.appendChild(card);
      });
    });

    // Update Pipeline Metrics
    DOM.metricTotalActive.textContent = totalCount;
    DOM.metricInterviewsCount.textContent = state.kanban.interviewing.length;
    DOM.metricOffersCount.textContent = state.kanban.offer.length;

    const appliedPlusBeyond = state.kanban.applied.length + state.kanban.interviewing.length + state.kanban.offer.length;
    const responseRate = appliedPlusBeyond > 0
      ? Math.round(((state.kanban.interviewing.length + state.kanban.offer.length) / appliedPlusBeyond) * 100)
      : 60;
    DOM.metricResponseRate.textContent = `${responseRate}%`;
    DOM.trackerBadgeCount.textContent = totalCount;
  }

  function moveKanbanCard(id, currentStage, direction) {
    const stages = ['saved', 'applied', 'interviewing', 'offer'];
    const currentIndex = stages.indexOf(currentStage);
    const newIndex = currentIndex + direction;

    if (newIndex < 0 || newIndex >= stages.length) return;

    const targetStage = stages[newIndex];
    state.kanban[currentStage] = state.kanban[currentStage].filter(item => item !== id);
    if (!state.kanban[targetStage].includes(id)) {
      state.kanban[targetStage].push(id);
    }

    renderKanbanBoard();
    const stageNames = { saved: 'Saved', applied: 'Applied', interviewing: 'Interviewing', offer: 'Offers' };
    showToast(`Application moved to "${stageNames[targetStage]}"`, 'success');
  }

  function removeKanbanCard(id, stage) {
    state.kanban[stage] = state.kanban[stage].filter(item => item !== id);
    renderKanbanBoard();
    showToast('Removed from Application Tracker', 'info');
  }

  /* --------------------------------------------------------------------------
     11. PREMIUM FEATURE: Company-Specific Interview Prep Modal
     -------------------------------------------------------------------------- */
  function openInterviewPrepModal(opp) {
    state.selectedOpportunityForInterview = opp;

    DOM.interviewModalBadge.textContent = `${opp.company} • ${opp.category === 'internship' ? 'Internship' : 'Hackathon'}`;
    DOM.interviewModalTitle.textContent = `${opp.role} - Interview Prep`;
    DOM.interviewModalSubtitle.textContent = `Technical rounds, core competencies & interview questions for ${opp.company}`;

    DOM.interviewFormatTitle.textContent = `${opp.company} Evaluation Process`;
    DOM.interviewFormatDesc.textContent = opp.interviewFormat || 'Technical evaluation, systems architecture, and live coding problem solving.';

    const container = DOM.interviewQuestionsList;
    container.innerHTML = '';

    const questions = opp.interviewQuestions || [];
    questions.forEach((item, index) => {
      const accordion = document.createElement('div');
      accordion.className = 'accordion-item';
      accordion.innerHTML = `
        <button type="button" class="accordion-trigger">
          <span>Question ${index + 1}: ${escapeHtml(item.q)}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="accordion-panel hidden">
          <p><strong>Core Concept Evaluated:</strong> Analyze time/space complexity, distributed state, and clean API design.</p>
          <div class="hint-box">
            <strong>💡 Recommended Solution Approach:</strong> ${escapeHtml(item.hint)}
          </div>
        </div>
      `;

      accordion.querySelector('.accordion-trigger').addEventListener('click', () => {
        const panel = accordion.querySelector('.accordion-panel');
        panel.classList.toggle('hidden');
      });

      container.appendChild(accordion);
    });

    DOM.interviewModal.classList.remove('hidden');
  }

  function closeInterviewPrepModal() {
    DOM.interviewModal.classList.add('hidden');
    state.selectedOpportunityForInterview = null;
  }

  /* --------------------------------------------------------------------------
     12. PREMIUM FEATURE: Hackathon Teammates Finder
     -------------------------------------------------------------------------- */
  function renderTeammates() {
    const grid = DOM.teammatesGrid;
    grid.innerHTML = '';

    state.teammates.forEach(tm => {
      const card = document.createElement('div');
      card.className = 'teammate-card';
      card.innerHTML = `
        <div class="teammate-header">
          <div class="avatar avatar-sm" style="background: linear-gradient(135deg, #7c3aed, #4f46e5);">${escapeHtml(tm.avatarText)}</div>
          <div class="teammate-info">
            <h5>${escapeHtml(tm.name)}</h5>
            <span class="teammate-role">${escapeHtml(tm.college)} • ${escapeHtml(tm.specialty)}</span>
          </div>
        </div>
        <p class="teammate-looking-for">${escapeHtml(tm.lookingFor)}</p>
        <div class="tags-cloud" style="margin-bottom: 6px;">
          ${tm.skills.map(s => `<span class="card-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
        <button type="button" class="btn btn-secondary-sm btn-invite-teammate" data-id="${tm.id}">
          <span>Connect & Invite</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      `;

      const inviteBtn = card.querySelector('.btn-invite-teammate');
      inviteBtn.addEventListener('click', () => {
        inviteBtn.disabled = true;
        inviteBtn.innerHTML = `<span>✓ Invitation Sent</span>`;
        inviteBtn.style.backgroundColor = 'var(--emerald-50)';
        inviteBtn.style.color = 'var(--emerald-700)';
        inviteBtn.style.borderColor = 'var(--emerald-200)';
        showToast(`Teammate invitation sent to ${tm.name}!`, 'success');
      });

      grid.appendChild(card);
    });
  }

  /* --------------------------------------------------------------------------
     13. Application Modal & Apply Logic
     -------------------------------------------------------------------------- */
  function openApplyModal(opportunity) {
    state.selectedOpportunityForApply = opportunity;

    const { score } = evaluateOpportunityMatch(opportunity);
    const scoreClass = getMatchScoreClass(score);

    DOM.modalCategoryBadge.textContent = opportunity.category === 'internship' ? 'Internship' : 'Hackathon';
    DOM.modalTitle.textContent = `Apply for ${opportunity.role}`;
    DOM.modalCompanyTitle.textContent = `${opportunity.company} • ${opportunity.location}`;

    DOM.modalMatchPill.textContent = `${score}% Match`;
    DOM.modalMatchPill.className = `summary-match-pill ${scoreClass}`;

    if (score >= 80) {
      DOM.modalMatchExplanation.textContent = 'Your evaluated technical profile strongly matches this opening.';
    } else {
      DOM.modalMatchExplanation.textContent = 'Consider reviewing the highlighted skill gaps to tailor your application.';
    }

    DOM.applyApplicantName.value = state.user.name;
    DOM.applyApplicantEmail.value = state.user.email;
    DOM.applyNote.value = '';

    DOM.applyModal.classList.remove('hidden');
  }

  function closeApplyModal() {
    DOM.applyModal.classList.add('hidden');
    state.selectedOpportunityForApply = null;
  }

  function handleApplicationSubmit(e) {
    e.preventDefault();
    if (!state.selectedOpportunityForApply) return;

    const opp = state.selectedOpportunityForApply;
    closeApplyModal();

    // Place in Kanban Applied stage automatically
    if (!state.kanban.applied.includes(opp.id)) {
      state.kanban.applied.push(opp.id);
    }
    state.kanban.saved = state.kanban.saved.filter(id => id !== opp.id);

    renderKanbanBoard();
    renderOpportunities();

    showToast(`Application submitted! Added to "Applied" in your Application Tracker.`, 'success');
  }

  /* --------------------------------------------------------------------------
     14. Notifications System
     -------------------------------------------------------------------------- */
  function renderNotifications() {
    const list = DOM.notificationItemsList;
    list.innerHTML = '';

    const unreadCount = state.user.notifications.filter(n => n.unread).length;
    DOM.notificationCount.textContent = unreadCount;
    DOM.notificationCount.style.display = unreadCount > 0 ? 'flex' : 'none';

    state.user.notifications.forEach(n => {
      const li = document.createElement('li');
      li.className = `notification-item ${n.unread ? 'unread' : ''}`;
      li.innerHTML = `
        ${n.unread ? '<span class="notification-dot"></span>' : ''}
        <div class="notification-content">
          <p class="notification-text">${escapeHtml(n.text)}</p>
          <span class="notification-time">${escapeHtml(n.time)}</span>
        </div>
      `;
      list.appendChild(li);
    });
  }

  function toggleNotifications() {
    DOM.notificationsDropdown.classList.toggle('hidden');
  }

  function clearAllNotifications() {
    state.user.notifications.forEach(n => n.unread = false);
    renderNotifications();
    showToast('All notifications marked as read', 'info');
  }


  const SKILLS_URL =
    "http://localhost/projects/internhunt/php/skills.php";

  // Fetch the logged-in user's skills from the database.
  async function loadUserSkills() {
    try {
      const response = await fetch(SKILLS_URL, {
        method: "GET",
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch skills.");
      }

      state.user.skills = Array.isArray(data.skills)
        ? data.skills
        : [];

      renderProfileSkills();
      renderOpportunities();
      renderDashboardTopPicks();
      renderKanbanBoard();
    } catch (error) {
      console.error("Load skills error:", error);
      showToast(error.message, "error");
    }
  }

  // Save the current skill list to the database.
  async function saveUserSkills() {
    const response = await fetch(SKILLS_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        skills: state.user.skills
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to save skills.");
    }

    return data;
  }

  // Display skills in your existing profile section.
  function renderProfileSkills() {
    const cloud = DOM.profileSkillsTags;
    cloud.innerHTML = "";

    state.user.skills.forEach(skill => {
      const tag = document.createElement("span");
      tag.className = "skill-tag";

      const label = document.createElement("span");
      label.textContent = skill;

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "btn-remove-skill";
      removeButton.textContent = "×";
      removeButton.title = "Remove skill";
      removeButton.setAttribute("aria-label", `Remove ${skill}`);

      removeButton.addEventListener("click", () => {
        removeSkill(skill);
      });

      tag.append(label, removeButton);
      cloud.appendChild(tag);
    });

    DOM.skillsCountPill.textContent =
      `${state.user.skills.length} Skills`;
  }

  // Add a skill and save it to the database.
  async function addCustomSkill() {
    const input = DOM.inputAddSkill;
    const newSkill = input.value.trim();

    if (!newSkill) {
      showToast("Enter a skill first.", "warning");
      return;
    }

    if (state.user.skills.some(
      skill => skill.toLowerCase() === newSkill.toLowerCase()
    )) {
      showToast("This skill already exists.", "warning");
      return;
    }

    const previousSkills = [...state.user.skills];

    state.user.skills.push(newSkill);
    renderProfileSkills();

    DOM.btnAddSkill.disabled = true;

    try {
      await saveUserSkills();

      input.value = "";
      renderOpportunities();
      renderDashboardTopPicks();
      renderKanbanBoard();

      showToast(`Added "${newSkill}" successfully.`, "success");
    } catch (error) {
      state.user.skills = previousSkills;
      renderProfileSkills();
      showToast(error.message, "error");
    } finally {
      DOM.btnAddSkill.disabled = false;
    }
  }

  // Remove a skill and persist the change.
  async function removeSkill(skillToRemove) {
    const previousSkills = [...state.user.skills];

    state.user.skills = state.user.skills.filter(
      skill => skill !== skillToRemove
    );

    renderProfileSkills();

    try {
      await saveUserSkills();

      renderOpportunities();
      renderDashboardTopPicks();
      renderKanbanBoard();

      showToast(`Removed "${skillToRemove}".`, "success");
    } catch (error) {
      state.user.skills = previousSkills;
      renderProfileSkills();
      showToast(error.message, "error");
    }
  }


  /* --------------------------------------------------------------------------
     15. Event Listeners Setup
     -------------------------------------------------------------------------- */
  function setupEventListeners() {
    initTheme();

    DOM.tabLogin.addEventListener('click', () => setAuthTab('login'));
    DOM.tabRegister.addEventListener('click', () => setAuthTab('register'));
    DOM.linkToRegister.addEventListener('click', (e) => { e.preventDefault(); setAuthTab('register'); });
    DOM.linkToLogin.addEventListener('click', (e) => { e.preventDefault(); setAuthTab('login'); });

    DOM.demoChip.addEventListener('click', () => {
      DOM.loginEmail.value = 'alex@student.edu';
      DOM.loginPassword.value = 'password123';
      showToast('Demo credentials filled! Click "Sign In".', 'info');
    });

    DOM.loginForm.addEventListener('submit', handleLoginSubmit);
    DOM.registerForm.addEventListener('submit', handleRegisterSubmit);
    DOM.btnLogout.addEventListener('click', handleLogout);

    DOM.btnToggleSidebar.addEventListener('click', openMobileSidebar);
    DOM.btnCloseSidebar.addEventListener('click', closeMobileSidebar);
    DOM.sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    DOM.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const view = link.getAttribute('data-view');
        const category = link.getAttribute('data-category');
        switchSection(view, category);
      });
    });

    DOM.heroBtnUpload.addEventListener('click', () => switchSection('view-profile'));
    DOM.heroBtnExplore.addEventListener('click', () => switchSection('view-opportunities'));
    DOM.heroBtnTracker.addEventListener('click', () => switchSection('view-tracker'));
    DOM.btnSeeAllMatches.addEventListener('click', () => switchSection('view-opportunities'));

    DOM.btnViewMatchesFromProfile.addEventListener('click', () => switchSection('view-opportunities'));
    DOM.btnAddSkill.addEventListener('click', addCustomSkill);
    DOM.inputAddSkill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addCustomSkill();
      }
    });

    // Export Report
    DOM.btnExportReport.addEventListener('click', () => {
      window.print();
    });

    DOM.filterSearchInput.addEventListener('input', (e) => {
      state.filters.searchTerm = e.target.value;
      DOM.btnClearSearch.classList.toggle('hidden', !e.target.value);
      renderOpportunities();
    });

    DOM.btnClearSearch.addEventListener('click', () => {
      DOM.filterSearchInput.value = '';
      state.filters.searchTerm = '';
      DOM.btnClearSearch.classList.add('hidden');
      renderOpportunities();
    });

    DOM.categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const category = pill.getAttribute('data-category');
        setOpportunityCategoryFilter(category);
      });
    });

    DOM.filterRoleSelect.addEventListener('change', (e) => {
      state.filters.domain = e.target.value;
      renderOpportunities();
    });

    DOM.sortSelect.addEventListener('change', (e) => {
      state.filters.sortBy = e.target.value;
      renderOpportunities();
    });

    DOM.btnResetFilters.addEventListener('click', resetAllFilters);
    DOM.btnEmptyReset.addEventListener('click', resetAllFilters);

    // Apply Modal Events
    DOM.btnCloseModal.addEventListener('click', closeApplyModal);
    DOM.btnCancelModal.addEventListener('click', closeApplyModal);
    DOM.applyForm.addEventListener('submit', handleApplicationSubmit);
    DOM.applyModal.addEventListener('click', (e) => {
      if (e.target === DOM.applyModal) closeApplyModal();
    });

    // Interview Prep Modal Events
    DOM.btnCloseInterviewModal.addEventListener('click', closeInterviewPrepModal);
    DOM.btnDoneInterviewModal.addEventListener('click', closeInterviewPrepModal);
    DOM.btnApplyFromInterview.addEventListener('click', () => {
      const opp = state.selectedOpportunityForInterview;
      closeInterviewPrepModal();
      if (opp) openApplyModal(opp);
    });
    DOM.interviewModal.addEventListener('click', (e) => {
      if (e.target === DOM.interviewModal) closeInterviewPrepModal();
    });

    // Notifications
    DOM.btnNotifications.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNotifications();
    });

    DOM.btnClearNotifications.addEventListener('click', clearAllNotifications);

    document.addEventListener('click', (e) => {
      if (!DOM.notificationsDropdown.contains(e.target) && e.target !== DOM.btnNotifications) {
        DOM.notificationsDropdown.classList.add('hidden');
      }
    });

    initResumeHandlers();
    initLiveJdMatcher();
  }

  function resetAllFilters() {
    DOM.filterSearchInput.value = '';
    DOM.filterRoleSelect.value = 'all';
    DOM.sortSelect.value = 'match-desc';
    DOM.btnClearSearch.classList.add('hidden');

    state.filters.searchTerm = '';
    state.filters.category = 'all';
    state.filters.domain = 'all';
    state.filters.sortBy = 'match-desc';

    DOM.categoryPills.forEach(pill => {
      if (pill.getAttribute('data-category') === 'all') pill.classList.add('active');
      else pill.classList.remove('active');
    });

    renderOpportunities();
    showToast('Filters reset to default view', 'info');
  }

  /* --------------------------------------------------------------------------
     16. Initialize Application
     -------------------------------------------------------------------------- */
  function init() {
    setupEventListeners();
    restoreSession();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
