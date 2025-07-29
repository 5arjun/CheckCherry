import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav
        style={{
          width: '200px',
          padding: '20px',
          background: '#f4f4f4',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <h3>Admin Panel</h3>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/clients">Clients</Link>
        <Link to="/admin/packages">Packages</Link>
        <Link to="/admin/calendar">Calendar</Link>
      </nav>

      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
