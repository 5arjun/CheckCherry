// 1. IMPORTS
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // adjust path if needed

// 2. COMPONENT FUNCTION
export default function AdminClients() {
  // 3. STATE
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // 4. LOAD CLIENT DATA FROM SUPABASE
  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*');

      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        setClients(data);
      }

      setLoading(false);
    };

    fetchClients();
  }, []);

  // FORM STATE
  const [newClient, setNewClient] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });


  // 5. RENDER CLIENT LIST
  return (

    <div className="p-4">
      <div className="mb-6 border p-4 rounded shadow bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Add New Client</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { data, error } = await supabase
              .from('clients')
              .insert([
                { ...newClient },
              ]);

            if (error) {
              alert('Error adding client: ' + error.message);
            } else {
              setClients([...clients, ...data]);
              setNewClient({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
              });
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="First Name"
            className="border p-2 rounded"
            value={newClient.first_name}
            onChange={(e) =>
              setNewClient({ ...newClient, first_name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border p-2 rounded"
            value={newClient.last_name}
            onChange={(e) =>
              setNewClient({ ...newClient, last_name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={newClient.email}
            onChange={(e) =>
              setNewClient({ ...newClient, email: e.target.value })
            }
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border p-2 rounded"
            value={newClient.phone_number}
            onChange={(e) =>
              setNewClient({ ...newClient, phone_number: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-full mt-2"
          >
            Add Client
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      {loading ? (
        <p>Loading...</p>
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <ul className="space-y-2">
          {clients.map(client => (
            <li key={client.id} className="border p-4 rounded shadow">
              <p><strong>Name:</strong> {client.first_name} {client.last_name}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Phone:</strong> {client.phone_number}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
