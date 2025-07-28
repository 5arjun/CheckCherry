import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/')
      else setUser(data.session.user)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Welcome, {user?.email}</h2>
      <button className="bg-red-500 text-white px-4 py-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
