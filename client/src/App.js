// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Dashboard from './pages/Dashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEvents from './pages/admin/AdminEvents';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  const user = session?.user;
  const userEmail = user?.email;

  const isAdmin = userEmail === 'admin@example.com'; // Change this later for real role checking

  return (
    <Router>
      <Navbar session={session} />
      <Routes>
        <Route path="/" element={session ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin routes */}
        <Route path="/admin/users" element={isAdmin ? <AdminUsers /> : <Navigate to="/" />} />
        <Route path="/admin/events" element={isAdmin ? <AdminEvents /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
