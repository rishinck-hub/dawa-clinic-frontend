import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientList from "./pages/doctor/PatientList";
import AddPatient from "./pages/doctor/AddPatient";
import AddConsultation from "./pages/doctor/AddConsultation";
import ConsultationHistory from "./pages/doctor/ConsultationHistory";
import DoctorList from "./pages/admin/DoctorList";
import AddDoctor from "./pages/admin/AddDoctor";
import MedicineList from "./pages/admin/MedicineList";
import APITest from "./pages/APITest";
import Toast from "./ui/Toast";
import useNotification from "./hooks/useNotification";
import ThemeToggle from "./components/ThemeToggle";

function AppContent() {
  const { message, hideNotification } = useNotification() || {};
  return (
    <>
      <div className="theme-toggle-float">
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<APITest />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute role="ADMIN">
              <DoctorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-doctor"
          element={
            <ProtectedRoute role="ADMIN">
              <AddDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/medicines"
          element={
            <ProtectedRoute role="ADMIN">
              <MedicineList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute role="DOCTOR">
              <PatientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/add-patient"
          element={
            <ProtectedRoute role="DOCTOR">
              <AddPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/consult"
          element={
            <ProtectedRoute role="DOCTOR">
              <AddConsultation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/history"
          element={
            <ProtectedRoute role="DOCTOR">
              <ConsultationHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toast
        show={!!message}
        message={message?.text}
        type={message?.type}
        onClose={hideNotification}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <ThemeProvider>
          <NotificationProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </NotificationProvider>
        </ThemeProvider>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
