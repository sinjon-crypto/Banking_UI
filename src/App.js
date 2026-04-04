import { useMemo, useState } from 'react';
import './App.css';

const HIDE_PASSWORD_ICON = 'Hide';
const SHOW_PASSWORD_ICON = 'Show';
const STRONG_PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
const NAV_ITEMS = ['Dashboard', 'Report', 'Payment', 'Payment Settlement'];
const REPORT_OPTIONS = [
  'Transaction Report',
  'Settlement Report',
  'Payout Report',
  'Login Activity Report',
];
const PAYMENT_OPTIONS = [
  'Payment Request',
  'Create Payment Link',
  'Collect Payment',
  'Payment History',
];
const PROFILE_OPTIONS = [
  'My Profile',
  'Settings',
  'Activity Logs',
  'Commission Structure',
  'Certificate',
  'Transaction Pin',
  'Developer Zone',
];
const NOTIFICATIONS = [
  'Settlement update processed successfully.',
  'A new login was detected from Chrome on Windows 10.',
  'Your daily merchant report is ready to view.',
];
const METRIC_CARDS = [
  { title: 'Total Revenue', value: '1,28,450.00', trend: '+12.4%', tone: 'up' },
  { title: 'Total Transactions', value: '2,486', trend: '+8.1%', tone: 'up' },
  { title: 'Successful Payments', value: '2,310', trend: '+6.8%', tone: 'up' },
  { title: 'Failed Payments', value: '76', trend: '-1.4%', tone: 'down' },
  { title: 'Active Users', value: '142', trend: '+4.0%', tone: 'up' },
  { title: 'Pending Settlement', value: '18,420.00', trend: '+2.7%', tone: 'neutral' },
];
const QUICK_ACTIONS = ['Add Payment', 'Send Money', 'Request Payment', 'Download Report'];
const REVENUE_BARS = [
  { label: 'Mon', value: 48 },
  { label: 'Tue', value: 64 },
  { label: 'Wed', value: 52 },
  { label: 'Thu', value: 82 },
  { label: 'Fri', value: 74 },
  { label: 'Sat', value: 58 },
  { label: 'Sun', value: 67 },
];
const PAYMENT_METHODS = [
  { label: 'UPI', value: '46%', fill: '#2563eb' },
  { label: 'Wallet', value: '24%', fill: '#0ea5e9' },
  { label: 'Card', value: '18%', fill: '#7c3aed' },
  { label: 'Banking', value: '12%', fill: '#14b8a6' },
];
const SERVICES = [
  'Yes Bank Merchant Collection',
  'UPI Intent Collection',
  'Wallet To Wallet',
  'Vendor Payout',
];
const LOGIN_RECORDS = [
  {
    device: 'Computer - Chrome - Windows 10',
    time: '2 seconds ago',
    ip: '49.207.203.134',
    location: 'Latitude: 12.974804566694413, Longitude: 77.61922721832066',
  },
  {
    device: 'Mobile - Safari Browser - Android',
    time: '3 hours ago',
    ip: '49.207.203.134',
    location: 'Latitude: 12.9744189, Longitude: 77.6191102',
  },
  {
    device: 'Mobile - Safari Browser - iPhone',
    time: '4 hours ago',
    ip: '103.79.255.83',
    location: 'Latitude: 15.50582017786194, Longitude: 73.81070473710385',
  },
  {
    device: 'Mobile - Safari Browser - Android',
    time: '5 hours ago',
    ip: '49.207.203.134',
    location: 'Latitude: 12.9743748, Longitude: 77.6191121',
  },
  {
    device: 'Mobile - Safari Browser - Android',
    time: '19 hours ago',
    ip: '157.35.1.253',
    location: 'Latitude: 12.9764871, Longitude: 77.6228774',
  },
];
const OVERVIEW_STATS = [
  { label: 'Success', value: '0.00' },
  { label: 'Failure', value: '0.00' },
  { label: 'Pending', value: '0.00' },
  { label: 'Refunded', value: '0.00' },
  { label: 'Debit', value: '0.00' },
  { label: 'Credit', value: '0.00' },
];
const MINI_STATEMENT = [
  ['669904', '2026-04-01 11:38:59', 'Yes Bank Merchant Collection', '1.00', '0.00', '18.00', 'Success'],
  ['31341', '2025-11-01 07:36:55', 'Yes Bank Merchant Collection', '1.00', '0.00', '18.00', 'Success'],
  ['31188', '2025-10-31 21:12:13', 'Yes Bank Merchant Collection', '1.00', '0.00', '18.00', 'Success'],
  ['31187', '2025-10-31 21:02:01', 'Yes Bank Merchant Collection', '1.00', '0.00', '18.00', 'Success'],
  ['31177', '2025-10-31 20:51:39', 'Yes Bank Merchant Collection', '1.00', '0.00', '18.00', 'Success'],
  ['22838', '2025-10-29 01:20:36', 'Yes Bank Merchant Collection', '11.00', '0.00', '18.00', 'Success'],
  ['22837', '2025-10-29 01:07:30', 'Yes Bank Merchant Collection', '10.00', '0.00', '18.00', 'Success'],
  ['14438', '2025-10-23 10:12:08', 'Yes Bank Merchant Collection', '2.00', '0.00', '18.00', 'Success'],
  ['14437', '2025-10-23 10:11:48', 'Yes Bank Merchant Collection', '1.00', '0.00', '18.00', 'Success'],
  ['12578', '2025-10-22 12:27:53', 'Yes Bank Merchant Collection', '2.00', '0.00', '18.00', 'Success'],
];

const formatDisplayName = (value) => {
  if (!value) return 'User';

  const baseName = value.includes('@') ? value.split('@')[0] : value;

  return baseName
    .replace(/[._-]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState({});
  const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);
  const [isPaymentMenuOpen, setIsPaymentMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeQuickAction, setActiveQuickAction] = useState('');

  const transactions = useMemo(
    () =>
      MINI_STATEMENT.map(([id, date, provider, amount, profit, balance, status]) => ({
        id,
        date,
        provider,
        amount,
        profit,
        balance,
        status,
      })),
    []
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        const matchesSearch =
          transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.date.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [transactions, searchTerm, statusFilter]
  );

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const closeHeaderMenus = () => {
    setIsReportMenuOpen(false);
    setIsPaymentMenuOpen(false);
    setIsProfileMenuOpen(false);
    setIsNotificationMenuOpen(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    setLoggedInUser(email);
    setDisplayName(registeredUsers[email] || formatDisplayName(email));
    setCurrentPage(1);
    closeHeaderMenus();
    setStatusMessage(`Logged in as ${email}.`);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!STRONG_PASSWORD_PATTERN.test(password)) {
      setStatusMessage(
        'Password must include letters, numbers, and at least one special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage('Passwords do not match.');
      return;
    }

    setRegisteredUsers((prev) => ({ ...prev, [email]: name }));
    setStatusMessage(`Account created for ${name} with ${email}.`);
  };

  const handleLogout = () => {
    setLoggedInUser('');
    setDisplayName('');
    setActiveQuickAction('');
    closeHeaderMenus();
    setActiveTab('login');
    setStatusMessage('');
  };

  if (loggedInUser) {
    return (
      <div className="App app-dashboard">
        <div className="dashboard-shell">
          <header className="dashboard-topbar portal-topbar">
            <div className="dashboard-brand">
              <div className="dashboard-brand-badge">
                <img
                  className="dashboard-brand-image"
                  src="/images/WhatsApp%20Image%202026-04-03%20at%203.24.55%20AM.jpeg"
                  alt="Brand logo"
                />
              </div>
              <div className="dashboard-brand-copy">
                <p className="dashboard-overline">Dashboard</p>
                <h1>{displayName || formatDisplayName(loggedInUser)}</h1>
                <p className="dashboard-brand-subtitle">
                  Premium merchant workspace with live payments and wallet visibility.
                </p>
              </div>
            </div>
            <div className="dashboard-userbar">
              <div className="dashboard-usercard">
                <span className="user-label">
                  Hi, {displayName || formatDisplayName(loggedInUser)} welcome back!
                </span>
                <div className="dashboard-usercard-row">
                  <strong>{loggedInUser}</strong>
                  <span className="user-status-pill">Secure Session</span>
                </div>
              </div>
              <div className="notification-menu-wrap">
                <button
                  type="button"
                  className={
                    isNotificationMenuOpen ? 'notification-trigger active' : 'notification-trigger'
                  }
                  onClick={() => {
                    setIsNotificationMenuOpen((prev) => !prev);
                    setIsProfileMenuOpen(false);
                    setIsReportMenuOpen(false);
                  }}
                  aria-expanded={isNotificationMenuOpen}
                  aria-haspopup="menu"
                  aria-label="Notifications"
                >
                  <span className="notification-bell" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="notification-bell-icon">
                      <path
                        d="M12 3a4 4 0 0 0-4 4v1.1c0 .8-.28 1.58-.8 2.18L5.6 12.2A2 2 0 0 0 7.1 15.5h9.8a2 2 0 0 0 1.5-3.3l-1.6-1.92A3.36 3.36 0 0 1 16 8.1V7a4 4 0 0 0-4-4Z"
                        fill="currentColor"
                      />
                      <path
                        d="M9.8 17.5a2.2 2.2 0 0 0 4.4 0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="notification-trigger-label">Alerts</span>
                  <span className="notification-badge">{NOTIFICATIONS.length}</span>
                </button>
                {isNotificationMenuOpen ? (
                  <div className="notification-dropdown-menu" role="menu">
                    <div className="dropdown-section-title">Notifications</div>
                    {NOTIFICATIONS.map((note) => (
                      <button
                        key={note}
                        type="button"
                        className="notification-dropdown-item"
                        role="menuitem"
                        onClick={() => setIsNotificationMenuOpen(false)}
                      >
                        {note}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="profile-menu-wrap">
                <button
                  type="button"
                  className={isProfileMenuOpen ? 'profile-trigger active' : 'profile-trigger'}
                  onClick={() => {
                    setIsProfileMenuOpen((prev) => !prev);
                    setIsReportMenuOpen(false);
                    setIsNotificationMenuOpen(false);
                  }}
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="menu"
                  aria-label="Profile menu"
                >
                  <span className="profile-trigger-avatar">
                    {(displayName || formatDisplayName(loggedInUser))
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part.charAt(0).toUpperCase())
                      .join('')}
                  </span>
                  <span className="profile-trigger-copy">
                    <span className="profile-trigger-label">Account</span>
                    <span className="profile-trigger-name">
                      {displayName || formatDisplayName(loggedInUser)}
                    </span>
                  </span>
                  <span className="profile-trigger-caret" aria-hidden="true">
                    {isProfileMenuOpen ? '^' : 'v'}
                  </span>
                </button>
                {isProfileMenuOpen ? (
                  <div className="profile-dropdown-menu" role="menu">
                    <div className="profile-dropdown-header">
                      <div className="profile-dropdown-avatar">
                        {(displayName || formatDisplayName(loggedInUser))
                          .split(' ')
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part.charAt(0).toUpperCase())
                          .join('')}
                      </div>
                      <div className="profile-dropdown-meta">
                        <strong>{displayName || formatDisplayName(loggedInUser)}</strong>
                        <span>{loggedInUser}</span>
                      </div>
                    </div>
                    <div className="dropdown-section-title">Account</div>
                    {PROFILE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="profile-dropdown-item"
                        role="menuitem"
                        onClick={() => setIsProfileMenuOpen(false)}
                        >
                          {option}
                        </button>
                      ))}
                    <div className="dropdown-section-title">Session</div>
                    <button
                      type="button"
                      className="profile-dropdown-item logout-item"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <nav className="portal-nav">
            {NAV_ITEMS.map((item, index) =>
              item === 'Report' ? (
                <div className="portal-nav-dropdown" key={item}>
                  <button
                    type="button"
                    className={isReportMenuOpen ? 'portal-nav-item active' : 'portal-nav-item'}
                    onClick={() => {
                      setIsReportMenuOpen((prev) => !prev);
                      setIsProfileMenuOpen(false);
                      setIsNotificationMenuOpen(false);
                    }}
                    aria-expanded={isReportMenuOpen}
                    aria-haspopup="menu"
                  >
                    {item}
                    <span className="portal-nav-caret">{isReportMenuOpen ? '^' : 'v'}</span>
                  </button>
                  {isReportMenuOpen ? (
                    <div className="report-dropdown-menu" role="menu">
                      {REPORT_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="report-dropdown-item"
                          role="menuitem"
                          onClick={() => setIsReportMenuOpen(false)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : item === 'Payment' ? (
                <div className="portal-nav-dropdown" key={item}>
                  <button
                    type="button"
                    className={isPaymentMenuOpen ? 'portal-nav-item active' : 'portal-nav-item'}
                    onClick={() => {
                      setIsPaymentMenuOpen((prev) => !prev);
                      setIsReportMenuOpen(false);
                      setIsProfileMenuOpen(false);
                      setIsNotificationMenuOpen(false);
                    }}
                    aria-expanded={isPaymentMenuOpen}
                    aria-haspopup="menu"
                  >
                    {item}
                    <span className="portal-nav-caret">{isPaymentMenuOpen ? '^' : 'v'}</span>
                  </button>
                  {isPaymentMenuOpen ? (
                    <div className="report-dropdown-menu" role="menu">
                      {PAYMENT_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="report-dropdown-item"
                          role="menuitem"
                          onClick={() => setIsPaymentMenuOpen(false)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <button
                  key={item}
                  type="button"
                  className={index === 0 ? 'portal-nav-item active' : 'portal-nav-item'}
                  onClick={() => {
                    setIsReportMenuOpen(false);
                    setIsProfileMenuOpen(false);
                    setIsNotificationMenuOpen(false);
                  }}
                >
                  {item}
                </button>
              )
            )}
          </nav>

          <section className="metric-grid premium-metric-grid">
            {METRIC_CARDS.map((metric) => (
              <div className="metric-card metric-hero-card" key={metric.title}>
                <span>{metric.title}</span>
                <strong>{metric.value}</strong>
                <p className={`metric-trend ${metric.tone}`}>{metric.trend} vs last week</p>
              </div>
            ))}
          </section>

          <section className="dashboard-grid dashboard-grid-top">
            <div className="dashboard-panel dashboard-panel-wide">
              <div className="panel-header">
                <h3>Quick Actions</h3>
                <span>Merchant tools</span>
              </div>
              <div className="quick-action-grid">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="quick-action-card"
                    onClick={() => setActiveQuickAction(action)}
                  >
                    <span>{action}</span>
                    <strong>Open</strong>
                  </button>
                ))}
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Balance + Wallet</h3>
                <span>Live summary</span>
              </div>
              <div className="wallet-summary-grid">
                <div className="wallet-summary-card">
                  <span>Current Balance</span>
                  <strong>18.00</strong>
                </div>
                <div className="wallet-summary-card">
                  <span>Pending Settlement</span>
                  <strong>1,245.00</strong>
                </div>
                <div className="wallet-summary-card">
                  <span>Last Credited</span>
                  <strong>325.00</strong>
                </div>
              </div>
              <div className="wallet-action-grid">
                <button
                  type="button"
                  className="wallet-action-button"
                  onClick={() => setActiveQuickAction('Add Money')}
                >
                  Add Money
                </button>
                <button
                  type="button"
                  className="wallet-action-button"
                  onClick={() => setActiveQuickAction('Withdraw Money')}
                >
                  Withdraw Money
                </button>
                <button
                  type="button"
                  className="wallet-action-button"
                  onClick={() => setActiveQuickAction('Transfer Money')}
                >
                  Transfer Money
                </button>
              </div>
            </div>
          </section>

          <section className="dashboard-grid dashboard-grid-charts">
            <div className="dashboard-panel dashboard-panel-wide">
              <div className="panel-header">
                <h3>Transactions Over Time</h3>
                <span>7-day trend</span>
              </div>
              <div className="chart-line-card">
                <svg viewBox="0 0 420 160" className="line-chart-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(37,99,235,0.28)" />
                      <stop offset="100%" stopColor="rgba(37,99,235,0.02)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 120 C35 110, 55 80, 70 86 S120 98, 140 74 S190 88, 210 58 S260 64, 280 42 S330 66, 350 52 S395 60, 420 48 L420 160 L0 160 Z"
                    fill="url(#lineFill)"
                  />
                  <path
                    d="M0 120 C35 110, 55 80, 70 86 S120 98, 140 74 S190 88, 210 58 S260 64, 280 42 S330 66, 350 52 S395 60, 420 48"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="chart-label-row">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Revenue</h3>
                <span>Weekly bar chart</span>
              </div>
              <div className="bar-chart">
                {REVENUE_BARS.map((bar) => (
                  <div className="bar-chart-item" key={bar.label}>
                    <div className="bar-chart-track">
                      <div className="bar-chart-fill" style={{ height: `${bar.value}%` }}></div>
                    </div>
                    <span>{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Payment Methods</h3>
                <span>Usage split</span>
              </div>
              <div className="payment-method-chart">
                <div className="payment-method-donut"></div>
                <div className="payment-method-legend">
                  {PAYMENT_METHODS.map((method) => (
                    <div className="legend-row" key={method.label}>
                      <span className="legend-dot" style={{ backgroundColor: method.fill }}></span>
                      <span>{method.label}</span>
                      <strong>{method.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Dashboard</h3>
                <span>Dashboard</span>
              </div>
              <div className="metric-grid">
                <div className="metric-card">
                  <span>Today Sale</span>
                  <strong>0.00</strong>
                </div>
                <div className="metric-card">
                  <span>Today Profit</span>
                  <strong>0.00</strong>
                </div>
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Services</h3>
                <span>Available</span>
              </div>
              <div className="service-grid">
                {SERVICES.map((service) => (
                  <div className="service-card" key={service}>
                    {service}
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-panel dashboard-panel-wide">
              <div className="panel-header">
                <h3>Last 5 login records</h3>
                <button type="button" className="inline-action-button">
                  Logout from all devices
                </button>
              </div>
              <div className="login-record-list">
                {LOGIN_RECORDS.map((record) => (
                  <div className="login-record-card" key={`${record.device}-${record.time}`}>
                    <div>
                      <strong>{record.device}</strong>
                      <p>{record.time}</p>
                      <p>IP Address: {record.ip}</p>
                      <p>{record.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Today Overview</h3>
                <span>Current totals</span>
              </div>
              <div className="overview-grid">
                {OVERVIEW_STATS.map((item) => (
                  <div className="overview-stat-card" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Balance Snapshot</h3>
                <span>16:14</span>
              </div>
              <div className="balance-stack">
                <div className="balance-card-light">
                  <span>Friday, April 3rd 2026</span>
                </div>
                <div className="balance-card-light">
                  <span>Normal Balance</span>
                  <strong>18.00</strong>
                </div>
                <div className="balance-card-light">
                  <span>Sms Balance</span>
                  <strong>0.00</strong>
                </div>
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Reports</h3>
                <span>Downloads</span>
              </div>
              <div className="report-action-grid">
                <button type="button" className="report-action-card">
                  Download Monthly Report
                </button>
                <button type="button" className="report-action-card">
                  Transaction History (CSV)
                </button>
              </div>
            </div>

            <div className="dashboard-panel dashboard-panel-wide">
              <div className="panel-header">
                <h3>Mini Statement</h3>
                <span>{filteredTransactions.length} records</span>
              </div>
              <div className="statement-toolbar">
                <input
                  className="statement-search"
                  type="search"
                  placeholder="Search by id, date or provider"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                />
                <select
                  className="statement-filter"
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="statement-table-wrap">
                <table className="statement-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Date</th>
                      <th>Provider</th>
                      <th>Amount</th>
                      <th>Profit</th>
                      <th>Balance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.date}</td>
                        <td>{row.provider}</td>
                        <td>{row.amount}</td>
                        <td>{row.profit}</td>
                        <td>{row.balance}</td>
                        <td>
                          <span className={`status-pill status-${row.status.toLowerCase()}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="statement-pagination">
                <button
                  type="button"
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  className="pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </section>

          <footer className="dashboard-footer">
            Copyright (c) 2026 TPI Pay. All rights reserved.
          </footer>
        </div>

        {activeQuickAction ? (
          <div className="modal-overlay" onClick={() => setActiveQuickAction('')}>
            <div className="quick-action-modal" onClick={(event) => event.stopPropagation()}>
              <div className="panel-header">
                <h3>{activeQuickAction}</h3>
                <button
                  type="button"
                  className="inline-action-button"
                  onClick={() => setActiveQuickAction('')}
                >
                  Close
                </button>
              </div>
              <p className="modal-copy">
                This is a placeholder action panel for <strong>{activeQuickAction}</strong>. You
                can connect this to real merchant flows next.
              </p>
              <div className="modal-form-grid">
                <input type="text" placeholder="Reference or beneficiary" />
                <input type="number" placeholder="Amount" />
                <button type="button" className="primary-button">
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="App app-auth">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-wrap">
              <img
                className="auth-logo"
                src="/images/WhatsApp%20Image%202026-04-03%20at%203.24.55%20AM.jpeg"
                alt="Brand logo"
              />
            </div>
            <p className="auth-subtitle">Secure access for your financial dashboard.</p>
          </div>

          <div className="tab-switcher">
            <button
              type="button"
              className={activeTab === 'login' ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={activeTab === 'register' ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          {activeTab === 'login' ? (
            <form className="auth-form" onSubmit={handleLogin}>
              <label className="input-label">
                Email address
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
              <label className="input-label">
                Password
                <div className="input-with-icon">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? HIDE_PASSWORD_ICON : SHOW_PASSWORD_ICON}
                  </button>
                </div>
              </label>
              {statusMessage ? (
                <p className="form-message" role="status">
                  {statusMessage}
                </p>
              ) : null}
              <div className="form-help-row">
                <div></div>
                <button type="button" className="link-small password-recovery-button">
                  Forgot password?
                </button>
              </div>
              <button className="primary-button" type="submit">
                Sign In
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleRegister}>
              <label className="input-label">
                Full name
                <input type="text" name="name" placeholder="Your full name" required />
              </label>
              <label className="input-label">
                Email
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
              <label className="input-label">
                Password
                <div className="input-with-icon">
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowRegisterPassword((prev) => !prev)}
                    aria-label={showRegisterPassword ? 'Hide password' : 'Show password'}
                  >
                    {showRegisterPassword ? HIDE_PASSWORD_ICON : SHOW_PASSWORD_ICON}
                  </button>
                </div>
                <span className="input-hint">
                  Use letters, numbers, and at least one special character.
                </span>
              </label>
              <label className="input-label">
                Confirm password
                <div className="input-with-icon">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? HIDE_PASSWORD_ICON : SHOW_PASSWORD_ICON}
                  </button>
                </div>
              </label>
              {statusMessage ? (
                <p className="form-message" role="status">
                  {statusMessage}
                </p>
              ) : null}
              <label className="checkbox-label">
                <input type="checkbox" name="terms" required /> I agree to the terms and privacy policy
              </label>
              <button className="primary-button" type="submit">
                Create Account
              </button>
            </form>
          )}
        </div>

        <div className="feature-panel">
          <div className="feature-content">
            <div className="animation-space">
              <span>Reserved space for animation</span>
            </div>

            <span className="feature-eyebrow">Digital banking, simplified</span>
            <h2>Designed for smarter banking experience.</h2>
            <p className="feature-description">
              Fast access to your account, a smoother registration flow, and a clean experience
              designed for modern finance.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span>{'\u2713'}</span>
                Quick sign-in with a clear, secure interface
              </div>
              <div className="feature-item">
                <span>{'\u2713'}</span>
                Simple registration built for new users
              </div>
              <div className="feature-item">
                <span>{'\u2713'}</span>
                Responsive layout for desktop and mobile screens
              </div>
            </div>

            <div className="feature-stats">
              <div className="stat-card">
                <strong>24/7</strong>
                <span>Account access anytime</span>
              </div>
              <div className="stat-card">
                <strong>Secure</strong>
                <span>Built for trusted user flows</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


