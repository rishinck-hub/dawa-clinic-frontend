# Quick Start Guide - Dawa Clinic Frontend

## Installation & Setup

### 1. Install Dependencies

```bash
cd d:\Projects\dawa_clinic\frontend\clinic-frontend
npm install
```

This will install:

- React 19 & React DOM
- Bootstrap 5.3 + React Bootstrap
- Axios for API calls
- React Router for navigation
- React Icons for icons

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

Production-ready files will be in the `dist/` folder.

## Project Structure Overview

```
clinic-frontend/
├── src/
│   ├── components/
│   │   ├── layout/           # Navbar, Sidebar, MainLayout
│   │   └── Logout.jsx        # Logout component
│   ├── ui/                   # Reusable UI components
│   ├── context/              # State management providers
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   ├── auth/                 # Auth-related components
│   ├── services/             # API services
│   ├── App.jsx               # Main app with providers
│   ├── App.css               # Global styles
│   ├── index.css             # CSS variables & base styles
│   └── main.jsx              # Entry point
├── public/                   # Static assets
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # Project documentation
```

## Common Tasks

### Creating a New Page with Layout

```jsx
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Card from "../ui/Card";
import useNotification from "../hooks/useNotification";

export default function MyPage() {
  const { showNotification } = useNotification();

  const sidebarLinks = [
    { to: "/dashboard", label: "Dashboard", icon: "bi bi-house" },
    { to: "/doctors", label: "Doctors", icon: "bi bi-person-badge" },
  ];

  const handleAction = () => {
    showNotification("Action successful!", "success");
  };

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <h1>My Page</h1>

      <Card>
        <h5>Card Title</h5>
        <p>Card content here</p>
        <button className="btn btn-primary" onClick={handleAction}>
          Click Me
        </button>
      </Card>
    </MainLayout>
  );
}
```

### Using Authentication

```jsx
import useAuth from "../hooks/useAuth";

export default function MyComponent() {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
```

### Showing Notifications

```jsx
import useNotification from "../hooks/useNotification";

export default function Form() {
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your API call
      showNotification("Saved successfully!", "success");
    } catch (error) {
      showNotification("Error occurred!", "error");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Using Modal Component

```jsx
import { useState } from "react";
import Modal from "../ui/Modal";

export default function Example() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Open Modal
      </button>

      <Modal
        show={showModal}
        title="Confirmation"
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          console.log("Confirmed");
          setShowModal(false);
        }}
      >
        Are you sure you want to proceed?
      </Modal>
    </>
  );
}
```

### Using Table Component

```jsx
import Table from "../ui/Table";

export default function DoctorList() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "specialty", label: "Specialty" },
    { key: "email", label: "Email" },
  ];

  const data = [
    {
      id: 1,
      name: "Dr. Smith",
      specialty: "Cardiology",
      email: "smith@clinic.com",
    },
    {
      id: 2,
      name: "Dr. Jones",
      specialty: "Pediatrics",
      email: "jones@clinic.com",
    },
  ];

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

## Bootstrap Classes Quick Reference

### Layout

- `container` - Fixed width container
- `row` - Flex row
- `col-*` - Column (col-12, col-md-6, col-lg-4, etc.)
- `d-flex` - Display flex
- `justify-content-center` - Horizontal center
- `align-items-center` - Vertical center

### Spacing

- `m-*` - Margin (m-1 to m-5)
- `p-*` - Padding (p-1 to p-5)
- `mt-*`, `mb-*`, `ms-*`, `me-*` - Directional margins
- `pt-*`, `pb-*`, `ps-*`, `pe-*` - Directional padding

### Text

- `h1` to `h6` - Headings
- `text-center` - Center text
- `text-primary` - Blue text
- `text-danger` - Red text
- `fw-bold` - Bold text

### Buttons

- `btn btn-primary` - Primary button
- `btn btn-secondary` - Secondary button
- `btn btn-danger` - Danger button
- `btn btn-sm` - Small button
- `btn btn-lg` - Large button

### Cards

- `card` - Card container
- `card-body` - Card content area
- `card-header` - Card header
- `card-footer` - Card footer

### Forms

- `form-control` - Text input
- `form-label` - Form label
- `form-select` - Select dropdown
- `form-check` - Checkbox/Radio

### Other

- `table` - Table styling
- `table-hover` - Hover rows
- `alert` - Alert box
- `badge` - Badge label
- `spinner-border` - Loading spinner

## API Configuration

Update `src/services/api.js` or create one:

```javascript
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

## Environment Variables

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Clinic Management
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

## Troubleshooting

### Components not appearing

- Ensure Bootstrap CSS is imported in `main.jsx`
- Check that components are properly imported
- Verify component file paths

### Styling not working

- Clear browser cache or do hard refresh (Ctrl+Shift+R)
- Check CSS class names match Bootstrap
- Verify App.css is imported correctly

### Context errors

- Ensure all providers wrap components in App.jsx
- Check that hooks are used inside provider scope
- Verify context is exported correctly

### API calls failing

- Check backend is running on correct port
- Verify API endpoints are correct
- Check network tab in browser DevTools
- Ensure JWT token is being sent

## Documentation

- [Full UI Theme Guide](./UI_THEME_GUIDE.md)
- [Migration Summary](./MIGRATION_SUMMARY.md)
- [Bootstrap Docs](https://getbootstrap.com/docs/5.3)
- [React Docs](https://react.dev)
- [Vite Docs](https://vite.dev)

## Support

For issues or questions:

1. Check the documentation files
2. Review existing components for examples
3. Check browser console for errors
4. Verify API is running and accessible

---

**Good luck! 🚀**
