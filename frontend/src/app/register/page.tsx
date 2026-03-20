'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CANDIDATE' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/login')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-black mb-2">Create Account</h1>
        <p className="text-gray-400 mb-8">Join JobBoard to find or post dev roles.</p>

        {error && <p className="bg-red-500/20 text-red-400 px-4 py-3 rounded mb-4 text-sm">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-400"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="CANDIDATE">I am looking for a job</option>
            <option value="EMPLOYER">I want to hire</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white py-3 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account? <Link href="/login" className="text-orange-400 hover:underline">Login</Link>
        </p>
      </div>
    </main>
  )
}