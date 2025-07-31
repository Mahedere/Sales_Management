# Business Management System

A Vue 3 mobile-friendly business management system with user authentication, sales tracking, and lender management.

## Features

- 🔐 User Authentication (Admin, Sales Manager, Customer Service roles)
- 📊 Dashboard with real-time statistics
- 🛒 Sales Input with auto-complete item selection
- 💳 Lender Management with payment tracking
- 👥 User Management (Admin only)
- 📱 Mobile-responsive design
- 💾 Local storage data persistence
- 📄 Export functionality (CSV, JSON, PDF)

## Demo Accounts

- **Admin**: `admin` / `admin`
- **Sales Manager**: `manager` / `manager`
- **Customer Service**: `service` / `service`

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation & Setup

1. **Clone or download the project files**

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser and navigate to:**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

\`\`\`
src/
├── components/          # Vue components
│   ├── LoginPage.vue   # Authentication page
│   ├── Dashboard.vue   # Main dashboard
│   ├── SalesInput.vue  # Sales recording
│   ├── LenderManagement.vue # Lender tracking
│   └── ...
├── composables/        # Vue composables
│   ├── useAuth.js     # Authentication logic
│   └── useData.js     # Data management
├── main.js            # App entry point
├── App.vue            # Root component
└── style.css          # Global styles
\`\`\`

## Usage

1. **Login** with one of the demo accounts
2. **Dashboard** shows overview statistics and quick actions
3. **Sales Input** allows recording daily sales with item suggestions
4. **Lender Management** tracks customer loans and payments
5. **User Management** (Admin only) manages system users

## Data Storage

- Data is stored in browser's localStorage
- Exports available in CSV, JSON, and PDF formats
- Data persists between sessions

## Mobile Support

The application is fully responsive and optimized for mobile devices with:
- Touch-friendly interface
- Responsive grid layouts
- Mobile-optimized forms
- Swipe-friendly navigation

## Customization

- Modify `src/composables/useData.js` to change default items and lenders
- Update `src/composables/useAuth.js` to modify user roles and permissions
- Customize styling in `src/style.css` and component files
