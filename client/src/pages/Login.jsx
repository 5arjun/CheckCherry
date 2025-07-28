import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert('Login error: ' + error.message)
    else alert('Check your email for a login link!')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Log in via Email Link</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="border p-2 w-full"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 mt-2">
          Send Magic Link
        </button>
      </form>
    </div>
  )
}

export default Login
