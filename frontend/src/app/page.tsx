'use client'
import { useEffect, useState } from 'react'
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

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => { setJobs(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* NAV */}
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-xl tracking-tight">JobBoard</span>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition">Login</Link>
          <Link href="/register" className="bg-orange-500 hover:bg-orange-400 text-white text-sm px-4 py-2 rounded transition">Sign Up</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="text-center py-20 px-6">
        <h1 className="text-5xl font-black tracking-tight mb-4">Find Your Next <span className="text-orange-400">Dev Role</span></h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">Browse the latest software development jobs across Canada and remote worldwide.</p>
      </div>

      {/* JOBS LIST */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">{loading ? 'Loading...' : `${jobs.length} Jobs Available`}</h2>
          <Link href="/post-job" className="border border-orange-500 text-orange-400 text-sm px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition">Post a Job</Link>
        </div>

        {loading && <p className="text-gray-500 text-center py-10">Loading jobs...</p>}

        {!loading && jobs.length === 0 && (
          <p className="text-gray-500 text-center py-10">No jobs posted yet.</p>
        )}

        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="border border-white/10 rounded-lg p-6 hover:border-orange-400/50 transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-orange-400 text-sm font-mono">{job.company} · {job.location}</p>
                </div>
                {job.salary && <span className="text-green-400 text-sm font-mono">{job.salary}</span>}
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">{job.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs">Posted by {job.employer.name}</span>
                <Link href={`/jobs/${job.id}`} className="text-orange-400 text-sm hover:underline">View Job →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}