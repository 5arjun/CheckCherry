import React from "react";

const AdminPackages = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Packages</h1>
      <button className="mb-4 px-4 py-2 bg-purple-600 text-white rounded">+ New Package</button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">Gold Package</td>
            <td className="p-2 border">$1500</td>
            <td className="p-2 border">Full-day coverage + edits</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminPackages;
