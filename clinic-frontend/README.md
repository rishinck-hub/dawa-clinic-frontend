# Clinic Frontend - Dawa Clinic

A modern, professional clinic management system frontend built with **React**, **Vite**, and **Bootstrap 5**.

## Features

- ✅ **Bootstrap 5 Theme** - Professional healthcare clinic UI
- ✅ **Context API** - State management for Auth, Notifications, Theme, and Roles
- ✅ **Role-Based Access** - Admin, Doctor, and other role routing
- ✅ **Reusable Components** - Card, Modal, Toast, Table, etc.
- ✅ **Custom Hooks** - useAuth, useNotification for easy context access
- ✅ **Responsive Layout** - Navbar, Sidebar, MainLayout components
- ✅ **Form Validation** - Ready-to-use form components
- ✅ **API Integration** - Axios configured for backend communication

## Project Structure

```
src/
├── components/layout/     # Navbar, Sidebar, MainLayout
├── ui/                    # Reusable UI components (Card, Modal, Table, etc.)
├── context/               # Context providers (Auth, Notifications, Theme, Role)
├── hooks/                 # Custom hooks (useAuth, useNotification)
├── pages/                 # Page components
├── auth/                  # Authentication components
├── services/              # API services
├── App.jsx                # Main app with providers
├── App.css                # Global styles
└── index.css              # Global CSS variables
```

## Tech Stack

- **React 19** - UI Framework
- **Vite 7** - Build tool
- **Bootstrap 5.3** - UI Framework
- **Axios 1.12** - HTTP client
- **React Router 7** - Routing

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## UI Theme

The application uses Bootstrap 5 with custom healthcare branding:

- **Primary Color**: `#0d6efd` (Blue)
- **Background**: `#f7f9fc` (Light Blue-Gray)
- **Success**: `#198754` (Green)
- **Danger**: `#dc3545` (Red)

See [UI_THEME_GUIDE.md](./UI_THEME_GUIDE.md) for detailed theme documentation.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Key Components

### Layout

- `<MainLayout>` - Main layout with Navbar and Sidebar
- `<Navbar>` - Top navigation bar
- `<Sidebar>` - Side navigation with role-based links

### UI Components

- `<Card>` - Bootstrap card component
- `<Modal>` - Dialog modal
- `<Toast>` - Toast notifications
- `<Table>` - Responsive table with actions
- `<LoadingSpinner>` - Loading indicator
- `<Alert>` - Alert message
- `<StatCard>` - Statistics card with icon
- `<Pagination>` - Page navigation

### Context Providers

- `<AuthProvider>` - Authentication state
- `<NotificationProvider>` - Notifications
- `<ThemeProvider>` - Theme management
- `<RoleProvider>` - Role management

## API Integration

Axios is configured in `src/services/` for API calls. Example:

```javascript
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
```

## Documentation

For more detailed information, see:

- [UI Theme Guide](./UI_THEME_GUIDE.md)
- [React Documentation](https://react.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [Vite Documentation](https://vite.dev)

## License

This project is part of the Dawa Clinic management system.
