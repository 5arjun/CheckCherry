import { useEffect, useState } from "react";
import { supabase } from "@/supabase"; // make sure this is your correct Supabase client path

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch clients for the logged-in user
  useEffect(() => {
    const fetchClients = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id); // optional, since RLS handles this

      if (error) console.error("Error fetching clients:", error);
      else setClients(data);

      setLoading(false);
    };

    fetchClients();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {clients.map((client) => (
            <li key={client.id} className="border p-4 rounded-md shadow">
              <p><strong>Name:</strong> {client.name}</p>
              <p><strong>Email:</strong> {client.email}</p>
              {/* Add other fields here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
