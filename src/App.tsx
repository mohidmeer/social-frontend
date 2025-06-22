import { HashRouter, Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accounts from "./pages/Accounts";
import DashboardLayout from "./layout/DashboardLayout";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Schedule from "./pages/Schedule";
import { Toaster } from "./components/ui/sonner";
function App() {

  // 🔥 Choose router based on environment
  const Router = import.meta.env.VITE_APP_ENV === "plugin" ? HashRouter : BrowserRouter;
  return (
    <>
      <Toaster/>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />


      <Router>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-of-service" element={<Terms />} />


          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={
            <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
      
          }>
            <Route path="" element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="history" element={<History />} />
            <Route path="settings" element={<Settings />} />
            <Route path="schedules" element={<Schedule />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
