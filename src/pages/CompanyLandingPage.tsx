import { useEffect, useState } from 'react'
import { Button, Filter, showToast } from '../components'
import { getCompanyJobs } from '../features/company/services/company.service'
import type { CompanyJob } from '../features/company/types/company'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/date'

function CompanyLandingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<CompanyJob[]>([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadJobs() {
      setLoading(true)
      try {
        setJobs(await getCompanyJobs(status))
      } catch (error) {
        showToast('error', error instanceof Error ? error.message : 'Gagal memuat job')
      } finally {
        setLoading(false)
      }
    }

    void loadJobs()
  }, [status])

  if (!user || user.role !== 'COMPANY') {
    return <p role="alert">Halaman ini khusus untuk Company.</p>
  }

  return (
    <section className="mx-auto max-w-[1100px]">
      <div>
        <p className="mb-1 text-sm font-bold uppercase tracking-wide text-[#66718a]">
          Company dashboard
        </p>
        <h1 className="m-0 text-2xl font-bold text-[#15213f]">Manage your jobs</h1>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[#e4e7ed] bg-white p-6 max-sm:flex-col max-sm:items-start">
        <div>
          <h2 className="m-0 text-lg font-bold text-[#15213f]">My jobs</h2>
          <p className="mt-2 text-[#66718a]">
            Daftar lowongan milik perusahaan Anda.
          </p>
        </div>
        <Button.Root onClick={() => navigate('/company/jobs/create')}>
          Create job
        </Button.Root>
      </div>

      <div className="my-6">
        <Filter.Select value={status} onChange={setStatus}>
          <option value="">All job status</option>
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
          <option value="DRAFT">DRAFT</option>
        </Filter.Select>
      </div>

      {loading && <p>Loading jobs...</p>}
      {!loading && jobs.length === 0 && (
        <p className="text-[#66718a]">Belum ada job yang dibuat.</p>
      )}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <article key={job.id} className="rounded-2xl border border-[#e4e7ed] bg-white p-5">
            <div className="flex items-start justify-between gap-4 max-sm:flex-col">
              <div>
                <h2 className="m-0 font-bold text-[#15213f]">{job.title}</h2>
                <p className="mt-1 text-[#66718a]">{job.location} · {job.jobType}</p>
                <p className="mt-2 text-sm text-[#66718a]">
                  Deadline: {formatDate(job.applicationDeadline)}
                </p>
              </div>
              <span className="rounded-lg bg-[#eef1f7] px-3 py-1 text-sm font-bold">
                {job.status}
              </span>
            </div>
            <Button.Root
              variant="secondary"
              className="mt-4"
              onClick={() => navigate(`/company/jobs/${job.id}/applicants`)}
            >
              View applicants
            </Button.Root>
          </article>
        ))}
      </div>

    </section>
  )
}

export default CompanyLandingPage
