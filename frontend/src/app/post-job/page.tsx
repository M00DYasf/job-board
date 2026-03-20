'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PostJob() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', company: '', location: '', description: '', salary: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return router.push('/login')
    const parsed = JSON.parse(user)
    if (parsed.role !== 'EMPLOYER') router.push('/')
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl tracking-tight">JobBoard</Link>
        <Link href="/" className="text-gray-400 text-sm hover:text-white transition">← Back to Jobs</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black mb-2">Post a Job</h1>
        <p className="text-gray-400 mb-8">Fill in the details to post your job listing.</p>

        {error && <p className="bg-red-500/20 text-red-400 px-4 py-3 rounded mb-4 text-sm">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Company Name"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location (e.g. Toronto, ON or Remote)"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Salary (e.g. $70,000 - $90,000)"
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
            value={form.salary}
            onChange={e => setForm({ ...form, salary: e.target.value })}
          />
          <textarea
            placeholder="Job Description"
            rows={6}
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 resize-none"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white py-3 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </div>
    </main>
  )
}