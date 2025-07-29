// src/layouts/AdminLayout.jsx
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '200px',
        background: '#f4f4f4',
        padding: '1rem',
        borderRight: '1px solid #ccc'
      }}>
        <h3>Admin Panel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/bookings">Bookings</NavLink>
          <NavLink to="/admin/clients">Clients</NavLink>
          <NavLink to="/admin/packages">Packages</NavLink>
          <NavLink to="/admin/calendar">Calendar</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
