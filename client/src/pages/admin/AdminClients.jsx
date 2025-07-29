import React from "react";

const AdminClients = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Clients</h1>
      <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded">+ New Client</button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">Jane Smith</td>
            <td className="p-2 border">jane@example.com</td>
            <td className="p-2 border">555-1234</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminClients;
