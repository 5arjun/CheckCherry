// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Dashboard from "./pages/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminClients from "./pages/admin/AdminClients";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminCalendar from "./pages/admin/AdminCalendar";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setSession(session);

        // Query your 'users' table to get the role for this user
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
        } else {
          setRole(data.role);
        }
      } else {
        setSession(null);
        setRole(null);
      }

      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // You’d want to also update role here similarly
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  const user = session?.user;
  const userEmail = user?.email;

  const isAdmin = userEmail?.toLowerCase() === "arjunpat107@gmail.com"; // Change this later for real role checking

  return (
    <Router>
      <Navbar session={session} isAdmin={isAdmin} />
      <Routes>
        <Route
          path="/"
          element={
            session ? (
              isAdmin ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Dashboard />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminLayout /> : <Navigate to="/" />}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="calendar" element={<AdminCalendar />} />
        </Route>

        <Route
          path="/admin/users"
          element={isAdmin ? <AdminUsers /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/events"
          element={isAdmin ? <AdminEvents /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
