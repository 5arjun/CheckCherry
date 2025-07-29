import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Navbar({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
      <Link to="/" style={{ marginRight: '1rem' }}><strong>CheckCherry Clone</strong></Link>

      {session && (
        <>
          <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
          <Link to="/admin/users" style={{ marginRight: '1rem' }}>Users</Link>
          <Link to="/admin/events" style={{ marginRight: '1rem' }}>Events</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {!session && (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
