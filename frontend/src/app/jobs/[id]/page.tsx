'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  salary?: string
  createdAt: string
  employer: { name: string; email: string }
}

export default function JobPage() {
  const { id } = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [applied, setApplied] = useState(false)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`)
      .then(res => res.json())
      .then(data => { setJob(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const handleApply = async () => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')
    setApplying(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) setApplied(true)
    } catch (err) {
      console.error(err)
    } finally {
      setApplying(false)
    }
  }

  if (loading) return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </main>
  )

  if (!job) return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-gray-400">Job not found.</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl tracking-tight">JobBoard</Link>
        <Link href="/" className="text-gray-400 text-sm hover:text-white transition">← Back to Jobs</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="border border-white/10 rounded-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-black mb-2">{job.title}</h1>
              <p className="text-orange-400 font-mono">{job.company} · {job.location}</p>
            </div>
            {job.salary && (
              <span className="text-green-400 font-mono text-lg">{job.salary}</span>
            )}
          </div>

          <div className="border-t border-white/10 pt-6 mb-8">
            <h2 className="font-bold text-lg mb-3">Job Description</h2>
            <p className="text-gray-400 leading-relaxed">{job.description}</p>
          </div>

          <div className="border-t border-white/10 pt-6 mb-8">
            <h2 className="font-bold text-lg mb-3">Posted By</h2>
            <p className="text-gray-400">{job.employer.name}</p>
            <p className="text-gray-500 text-sm">{job.employer.email}</p>
          </div>

          {applied ? (
            <div className="bg-green-500/20 text-green-400 px-6 py-4 rounded text-center font-semibold">
              ✓ Application Submitted!
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white py-4 rounded font-semibold text-lg transition disabled:opacity-50"
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}