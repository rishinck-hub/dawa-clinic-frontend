# Component Catalog - Dawa Clinic Frontend

Complete reference guide for all created components and utilities.

---

## 🎨 Layout Components

### `Navbar.jsx`

**Location**: `src/components/layout/Navbar.jsx`
**Purpose**: Top navigation bar with clinic branding
**Features**:

- Brand logo/name
- Responsive navbar
- Bootstrap styling

**Usage**:

```jsx
import Navbar from "./components/layout/Navbar";

export default function App() {
  return <Navbar />;
}
```

---

### `Sidebar.jsx`

**Location**: `src/components/layout/Sidebar.jsx`
**Purpose**: Side navigation panel with links
**Props**:

- `links` (array) - Navigation items

**Features**:

- Role-based navigation links
- Fixed width sidebar
- Responsive design

**Usage**:

```jsx
import Sidebar from "./components/layout/Sidebar";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "bi bi-house" },
  { to: "/doctors", label: "Doctors", icon: "bi bi-person-badge" },
];

export default function App() {
  return <Sidebar links={links} />;
}
```

---

### `MainLayout.jsx`

**Location**: `src/components/layout/MainLayout.jsx`
**Purpose**: Complete page layout combining Navbar + Sidebar
**Props**:

- `children` (ReactNode) - Page content
- `sidebarLinks` (array) - Navigation links

**Features**:

- Flexbox layout
- Responsive design
- Automatic scrolling

**Usage**:

```jsx
import MainLayout from "./components/layout/MainLayout";

export default function Dashboard() {
  const links = [{ to: "/dashboard", label: "Dashboard", icon: "bi bi-house" }];

  return (
    <MainLayout sidebarLinks={links}>
      <h1>Dashboard Content</h1>
    </MainLayout>
  );
}
```

---

## 🧩 UI Components

### `Card.jsx`

**Location**: `src/ui/Card.jsx`
**Purpose**: Bootstrap card container for content
**Props**:

- `children` (ReactNode) - Card content
- `className` (string) - Additional CSS classes

**Features**:

- Bootstrap card styling
- Flexible content
- Optional custom classes

**Usage**:

```jsx
import Card from "./ui/Card";

export default function Page() {
  return (
    <Card className="mb-4">
      <h5>Card Title</h5>
      <p>Card content here</p>
    </Card>
  );
}
```

---

### `Modal.jsx`

**Location**: `src/ui/Modal.jsx`
**Purpose**: Dialog modal for forms and confirmations
**Props**:

- `show` (boolean) - Show/hide modal
- `title` (string) - Modal title
- `children` (ReactNode) - Modal content
- `onClose` (function) - Close handler
- `onConfirm` (function) - Confirm handler (optional)
- `confirmText` (string) - Confirm button text (default: "Confirm")
- `cancelText` (string) - Cancel button text (default: "Cancel")

**Features**:

- Centered modal
- Backdrop overlay
- Confirm/Cancel buttons
- Close button

**Usage**:

```jsx
import { useState } from "react";
import Modal from "./ui/Modal";

export default function Page() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShow(true)}>
        Open Modal
      </button>

      <Modal
        show={show}
        title="Confirmation"
        onClose={() => setShow(false)}
        onConfirm={() => {
          console.log("Confirmed");
          setShow(false);
        }}
      >
        Are you sure you want to proceed?
      </Modal>
    </>
  );
}
```

---

### `Toast.jsx`

**Location**: `src/ui/Toast.jsx`
**Purpose**: Toast notification messages
**Props**:

- `show` (boolean) - Show/hide toast
- `message` (string) - Toast message
- `type` (string) - Alert type (info/success/warning/error)
- `onClose` (function) - Close handler

**Features**:

- Auto-dismissing (3 seconds)
- Positioned fixed top-right
- Alert types: info, success, warning, error
- Dismissible

**Usage**:

```jsx
import Toast from "./ui/Toast";
import useNotification from "./hooks/useNotification";

export default function Page() {
  const { message, hideNotification } = useNotification();

  return (
    <Toast
      show={!!message}
      message={message?.text}
      type={message?.type}
      onClose={hideNotification}
    />
  );
}
```

---

### `Table.jsx`

**Location**: `src/ui/Table.jsx`
**Purpose**: Responsive data table with actions
**Props**:

- `columns` (array) - Column definitions
- `data` (array) - Row data
- `onEdit` (function) - Edit action handler
- `onDelete` (function) - Delete action handler

**Features**:

- Responsive table
- Action buttons (Edit/Delete)
- Bootstrap styling
- Hover effects

**Usage**:

```jsx
import Table from "./ui/Table";

export default function DoctorList() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "specialty", label: "Specialty" },
  ];

  const data = [{ id: 1, name: "Dr. Smith", specialty: "Cardiology" }];

  return (
    <Table
      columns={columns}
      data={data}
      onEdit={(row) => console.log("Edit", row)}
      onDelete={(row) => console.log("Delete", row)}
    />
  );
}
```

---

### `LoadingSpinner.jsx`

**Location**: `src/ui/LoadingSpinner.jsx`
**Purpose**: Loading indicator
**Props**: None

**Features**:

- Centered spinner
- Bootstrap spinner
- Minimum height 400px

**Usage**:

```jsx
import LoadingSpinner from "./ui/LoadingSpinner";

export default function Page() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <div>Content</div>;
}
```

---

### `Alert.jsx`

**Location**: `src/ui/Alert.jsx`
**Purpose**: Alert message component
**Props**:

- `type` (string) - Alert type (info/success/warning/error)
- `message` (string) - Alert message
- `dismissible` (boolean) - Show close button
- `onClose` (function) - Close handler

**Features**:

- Multiple alert types
- Optional dismissible
- Bootstrap styling

**Usage**:

```jsx
import Alert from "./ui/Alert";

export default function Page() {
  return (
    <Alert
      type="success"
      message="Operation completed successfully!"
      dismissible={true}
      onClose={() => {}}
    />
  );
}
```

---

### `Breadcrumb.jsx`

**Location**: `src/ui/Breadcrumb.jsx`
**Purpose**: Breadcrumb navigation trail
**Props**:

- `items` (array) - Breadcrumb items

**Features**:

- Navigation breadcrumbs
- Active state on last item
- Bootstrap styling

**Usage**:

```jsx
import Breadcrumb from "./ui/Breadcrumb";

export default function Page() {
  const items = [
    { label: "Home", link: "/" },
    { label: "Doctors", link: "/doctors" },
    { label: "Details" },
  ];

  return <Breadcrumb items={items} />;
}
```

---

### `ConfirmDialog.jsx`

**Location**: `src/ui/ConfirmDialog.jsx`
**Purpose**: Confirmation dialog
**Props**:

- `show` (boolean) - Show/hide dialog
- `title` (string) - Dialog title
- `message` (string) - Dialog message
- `onConfirm` (function) - Confirm handler
- `onCancel` (function) - Cancel handler
- `confirmText` (string) - Confirm button text
- `cancelText` (string) - Cancel button text

**Features**:

- Centered dialog
- Danger confirm button
- Modal backdrop

**Usage**:

```jsx
import { useState } from "react";
import ConfirmDialog from "./ui/ConfirmDialog";

export default function Page() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Delete</button>

      <ConfirmDialog
        show={show}
        title="Confirm Delete"
        message="Are you sure you want to delete this item?"
        onConfirm={() => {
          console.log("Deleted");
          setShow(false);
        }}
        onCancel={() => setShow(false)}
      />
    </>
  );
}
```

---

### `Pagination.jsx`

**Location**: `src/ui/Pagination.jsx`
**Purpose**: Page navigation
**Props**:

- `currentPage` (number) - Current page
- `totalPages` (number) - Total pages
- `onPageChange` (function) - Page change handler

**Features**:

- Multiple pages
- Previous/Next buttons
- Active page highlighting

**Usage**:

```jsx
import { useState } from "react";
import Pagination from "./ui/Pagination";

export default function Page() {
  const [page, setPage] = useState(1);

  return (
    <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
  );
}
```

---

### `StatCard.jsx`

**Location**: `src/ui/StatCard.jsx`
**Purpose**: Statistics display card
**Props**:

- `title` (string) - Stat title
- `value` (string/number) - Stat value
- `icon` (string) - Icon class (e.g., 'bi bi-people')
- `color` (string) - Color (primary/success/danger/warning)

**Features**:

- Icon display
- Color variants
- Clean statistics display

**Usage**:

```jsx
import StatCard from "./ui/StatCard";

export default function Dashboard() {
  return (
    <StatCard
      title="Total Patients"
      value={1234}
      icon="bi bi-people"
      color="primary"
    />
  );
}
```

---

### `AuthLayout.jsx`

**Location**: `src/ui/AuthLayout.jsx`
**Purpose**: Full-screen layout for authentication pages
**Props**:

- `children` (ReactNode) - Page content

**Features**:

- Centered layout
- Full screen height
- Light background

**Usage**:

```jsx
import AuthLayout from "./ui/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="card">
        <div className="card-body">{/* Login form */}</div>
      </div>
    </AuthLayout>
  );
}
```

---

## 🔗 Context Providers

### `AuthContext.jsx`

**Location**: `src/context/AuthContext.jsx`
**Purpose**: User authentication state management

**Provides**:

- `user` - Current user object
- `loading` - Loading state
- `setLoading` - Set loading state
- `login` - Login function
- `logout` - Logout function

**Usage**:

```jsx
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
// Or use hook: import useAuth from './hooks/useAuth';

export default function Component() {
  const { user, login, logout } = useContext(AuthContext);
  // Or: const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout {user.name}</button>
      ) : (
        <button onClick={() => login(userData)}>Login</button>
      )}
    </div>
  );
}
```

---

### `NotificationContext.jsx`

**Location**: `src/context/NotificationContext.jsx`
**Purpose**: Toast notification state management

**Provides**:

- `message` - Current notification
- `showNotification` - Show notification
- `hideNotification` - Hide notification

**Usage**:

```jsx
import useNotification from "./hooks/useNotification";

export default function Component() {
  const { showNotification } = useNotification();

  const handleAction = () => {
    showNotification("Success!", "success");
    // Types: 'success', 'error', 'warning', 'info'
  };

  return <button onClick={handleAction}>Action</button>;
}
```

---

### `ThemeContext.jsx`

**Location**: `src/context/ThemeContext.jsx`
**Purpose**: Theme switching management

**Provides**:

- `theme` - Current theme (light/dark)
- `toggleTheme` - Toggle theme

**Usage**:

```jsx
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

export default function Component() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

---

### `RoleContext.jsx`

**Location**: `src/context/RoleContext.jsx`
**Purpose**: User role management

**Provides**:

- `role` - Current user role
- `setRole` - Set user role

**Usage**:

```jsx
import { useContext } from "react";
import { RoleContext } from "./context/RoleContext";

export default function Component() {
  const { role, setRole } = useContext(RoleContext);

  return (
    <div>
      <p>User role: {role}</p>
      <button onClick={() => setRole("ADMIN")}>Set Admin</button>
    </div>
  );
}
```

---

## 🪝 Custom Hooks

### `useAuth.js`

**Location**: `src/hooks/useAuth.js`
**Purpose**: Easy access to authentication context

**Returns**: All AuthContext values

**Usage**:

```jsx
import useAuth from "./hooks/useAuth";

export default function Component() {
  const { user, login, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login(data)}>Login</button>
      )}
    </div>
  );
}
```

---

### `useNotification.js`

**Location**: `src/hooks/useNotification.js`
**Purpose**: Easy access to notification context

**Returns**: All NotificationContext values

**Usage**:

```jsx
import useNotification from "./hooks/useNotification";

export default function Form() {
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your API call
      await saveData();
      showNotification("Saved successfully!", "success");
    } catch (error) {
      showNotification("Error occurred!", "error");
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form */}</form>;
}
```

---

## 📋 Summary

| Category    | Count | Components                                                                                       |
| ----------- | ----- | ------------------------------------------------------------------------------------------------ |
| **Layout**  | 3     | Navbar, Sidebar, MainLayout                                                                      |
| **UI**      | 11    | Card, Modal, Toast, Table, Spinner, Alert, Breadcrumb, Confirm, Pagination, StatCard, AuthLayout |
| **Context** | 4     | Auth, Notification, Theme, Role                                                                  |
| **Hooks**   | 2     | useAuth, useNotification                                                                         |
| **Total**   | 20+   | All components above                                                                             |

---

## 🚀 Best Practices

1. **Always use hooks** instead of useContext directly:

   ```jsx
   // ✅ Good
   const { user } = useAuth();

   // ❌ Avoid
   const { user } = useContext(AuthContext);
   ```

2. **Wrap components with MainLayout** for standard pages:

   ```jsx
   // ✅ Good
   <MainLayout sidebarLinks={links}>
     <YourContent />
   </MainLayout>
   ```

3. **Use notification hook** for user feedback:

   ```jsx
   // ✅ Good
   const { showNotification } = useNotification();
   showNotification("Success!", "success");
   ```

4. **Bootstrap classes** for styling:

   ```jsx
   // ✅ Good
   <div className="container mt-4 mb-5">

   // ❌ Avoid custom CSS when Bootstrap exists
   ```

5. **Reuse components** instead of creating new ones:

   ```jsx
   // ✅ Good - use Card component
   <Card><h5>Title</h5></Card>

   // ❌ Avoid - custom div styling
   <div style={{...}}>Title</div>
   ```

---

## 📚 References

- [Bootstrap Docs](https://getbootstrap.com/docs/5.3)
- [React Docs](https://react.dev)
- [Context API](https://react.dev/reference/react/useContext)
- [Bootstrap Icons](https://icons.getbootstrap.com)

---

**All components are production-ready and follow Bootstrap best practices.**
