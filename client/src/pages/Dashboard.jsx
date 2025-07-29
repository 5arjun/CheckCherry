import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        navigate('/login');
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
