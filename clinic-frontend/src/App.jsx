import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Doctors from "./pages/Doctors.jsx";
import Appointments from "./pages/Appointment.jsx";
import "./App.css"; // global styles

function useAuth() {
  return !!localStorage.getItem("token");
}

function PrivateRoute({ children }) {
  const authed = useAuth();
  const location = useLocation();
  if (!authed) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function Nav() {
  const authed = useAuth();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">Doctors</Link>
        <Link to="/appointments" className="nav-link">My Appointments</Link>
      </div>
      <div className="nav-right">
        {authed ? (
          <button className="btn btn-logout" onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" className="btn btn-login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Doctors />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Clinic Booking System</p>
      </footer>
    </>
  );
}
