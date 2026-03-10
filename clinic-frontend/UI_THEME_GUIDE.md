# Dawa Clinic Frontend - UI Theme Documentation

## Overview

The dawa_clinic frontend now uses **Bootstrap 5.3** framework with a professional healthcare clinic theme matching the Clinic Management System design.

## Color Scheme

- **Primary Color**: `#0d6efd` (Bootstrap Blue)
- **Background Light**: `#f7f9fc` (Light Blue Gray)
- **Success**: `#198754` (Green)
- **Warning**: `#ffc107` (Amber)
- **Danger**: `#dc3545` (Red)

## Architecture

### Directory Structure

```
src/
├── components/
│   ├── layout/              # Layout components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── MainLayout.jsx
│   └── ...                  # Other components
├── ui/                      # Reusable UI components
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Toast.jsx
│   ├── Table.jsx
│   ├── LoadingSpinner.jsx
│   ├── Alert.jsx
│   ├── Breadcrumb.jsx
│   ├── ConfirmDialog.jsx
│   ├── Pagination.jsx
│   ├── StatCard.jsx
│   └── AuthLayout.jsx
├── context/                 # Context providers
│   ├── AuthContext.jsx
│   ├── NotificationContext.jsx
│   ├── ThemeContext.jsx
│   └── RoleContext.jsx
├── hooks/                   # Custom hooks
│   ├── useAuth.js
│   └── useNotification.js
├── pages/                   # Page components
├── auth/                    # Authentication components
├── services/                # API services
├── App.jsx                  # Main app with providers
└── index.css                # Global styles
```

## Key Components

### Layout Components

- **Navbar**: Top navigation bar with brand
- **Sidebar**: Side navigation with role-based links
- **MainLayout**: Combines Navbar + Sidebar + Main content

### UI Components

- **Card**: Bootstrap card with default styling
- **Modal**: Dialog modal for forms/confirmations
- **Toast**: Toast notifications (auto-dismiss)
- **Table**: Responsive table with actions
- **LoadingSpinner**: Centered loading indicator
- **Alert**: Dismissible alert messages
- **Breadcrumb**: Navigation breadcrumb trail
- **ConfirmDialog**: Confirmation dialog
- **Pagination**: Page navigation
- **StatCard**: Statistics card with icon
- **AuthLayout**: Full-screen auth page layout

### Context Providers

- **AuthContext**: User authentication state
- **NotificationContext**: Toast notifications state
- **ThemeContext**: Theme switching (light/dark)
- **RoleContext**: User role management

### Custom Hooks

- **useAuth()**: Access auth context
- **useNotification()**: Access notification functions

## CSS Framework

- **Bootstrap 5.3** - Core framework
- **CSS Variables** - Defined in `index.css`:
  - `--color-primary`: #0d6efd
  - `--color-bg-light`: #f7f9fc

## Dependencies

```json
{
  "dependencies": {
    "axios": "^1.12.2",
    "bootstrap": "^5.3.8",
    "chart.js": "^4.5.1",
    "react": "^19.1.1",
    "react-bootstrap": "^2.10.10",
    "react-router-dom": "^7.9.4",
    "react-icons": "^5.5.0"
  }
}
```

## Usage Examples

### Using MainLayout

```jsx
import MainLayout from "./components/layout/MainLayout";

const sidebarLinks = [
  { to: "/dashboard", label: "Dashboard", icon: "bi bi-house" },
  { to: "/doctors", label: "Doctors", icon: "bi bi-person-badge" },
];

export default function Dashboard() {
  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <h1>Dashboard</h1>
      {/* Your content here */}
    </MainLayout>
  );
}
```

### Using UI Components

```jsx
import Card from "./ui/Card";
import Modal from "./ui/Modal";
import Toast from "./ui/Toast";
import useNotification from "./hooks/useNotification";

function MyPage() {
  const { showNotification } = useNotification();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card>
        <h5>Card Title</h5>
        <p>Card content goes here</p>
      </Card>

      <Modal
        show={showModal}
        title="Confirm"
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          showNotification("Action completed!", "success");
          setShowModal(false);
        }}
      >
        Are you sure?
      </Modal>
    </>
  );
}
```

## Notifications

```jsx
import useNotification from "./hooks/useNotification";

function MyComponent() {
  const { showNotification } = useNotification();

  const handleAction = () => {
    showNotification("Success!", "success"); // success, error, warning, info
  };

  return <button onClick={handleAction}>Action</button>;
}
```

## Bootstrap Classes

All standard Bootstrap classes are available:

- Layout: `container`, `row`, `col-*`, `d-flex`, `justify-content-*`, `align-items-*`
- Typography: `h1` through `h6`, `display-*`, `lead`, `text-*`
- Buttons: `btn`, `btn-primary`, `btn-secondary`, `btn-danger`, etc.
- Cards: `card`, `card-body`, `card-header`, `card-footer`
- Forms: `form-control`, `form-label`, `form-group`, `form-check`
- Utilities: `mb-*`, `mt-*`, `p-*`, `bg-*`, `text-*`, `border-*`

## Installation & Setup

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

## Styling Guide

### Adding Custom Styles

Add global styles to `src/App.css` or `src/index.css`:

```css
.custom-class {
  color: var(--color-primary);
  background-color: var(--color-bg-light);
}
```

### Component-Level Styles

Use inline styles or CSS modules in individual components:

```jsx
<div style={{ backgroundColor: "var(--color-bg-light)" }}>Content</div>
```

## Notes

- The theme now matches the Clinic Management System project exactly
- Bootstrap removes the need for Tailwind CSS dependency
- All functionality remains intact with consistent styling
- Role-based components work with the RoleContext provider
