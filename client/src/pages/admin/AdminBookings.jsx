import React from "react";

const AdminBookings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Bookings</h1>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">+ New Booking</button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Client</th>
            <th className="p-2 border">Event</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">John Doe</td>
            <td className="p-2 border">Wedding</td>
            <td className="p-2 border">2025-09-01</td>
            <td className="p-2 border">Confirmed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
