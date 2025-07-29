// 📍 1. Imports (Top of File)
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Dashboard() {
  // 📍 2. React State
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [packages, setPackages] = useState([])

  // 📍 3. On Mount: Check if user is logged in
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        navigate('/') // Redirect to homepage if not logged in
      } else {
        setUser(session.user)
      }
    }

    getSession()
  }, [navigate])

  // 📍 4. Fetch Client Packages when `user` is set
  useEffect(() => {
    const fetchPackages = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('client_id', user.id)

      if (error) {
        console.error('Error fetching packages:', error)
      } else {
        setPackages(data)
      }
    }

    fetchPackages()
  }, [user])

  // 📍 5. What to Render
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

      {user ? (
        <>
          <p className="mb-4">Welcome, {user.email}</p>

          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div
                key={pkg.id}
                className="border p-4 my-2 rounded-lg shadow-md bg-white"
              >
                <h2 className="text-xl font-semibold">{pkg.name}</h2>
                <p className="text-gray-700">{pkg.description}</p>
                <p className="text-gray-500 font-medium">${pkg.price}</p>
              </div>
            ))
          ) : (
            <p>No packages available yet.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
