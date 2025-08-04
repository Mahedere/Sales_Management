# Sales Management System

A Vue 3 mobile-friendly business management system with user authentication, sales tracking, and lender management.

## Features

- 🔐 User Authentication (Manager roles)
- 🛒 Sales Input with confirmation dialog and auto-complete
- 💳 Lender Management with search and payment tracking
- 🌐 Bilingual support (English/Amharic)
- 📱 Mobile-responsive design
- 💾 Local storage data persistence
- 📄 CSV export functionality

## Demo Accounts

- **Manager 1**: `manager1` / `manager1`
- **Manager 2**: `manager2` / `manager2`
- **Manager 3**: `manager3` / `manager3`

## Installation & Setup

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser and navigate to:**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Usage

1. **Login** with one of the demo accounts
2. **Dashboard** shows overview statistics and quick actions
3. **Sales Input** allows recording daily sales with item suggestions and confirmation dialog
4. **Lender Management** tracks customer loans and payments with search functionality
5. **Language Toggle** switches between English and Amharic

## Data Storage

- Data is stored in browser's localStorage
- Exports available in CSV format
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
