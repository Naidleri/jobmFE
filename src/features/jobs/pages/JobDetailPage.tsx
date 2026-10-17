import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, ModalNotAuth, showToast } from '../../../components'
import ApplyModal from '../components/ApplyModal'
import { applyJob, getJobById } from '../services/jobs.service'
import type { JobDetail } from '../types/job'
import { formatDate } from '../../../utils/date'

function JobDetailPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applying, setApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const requestedJobId = jobId ?? ''
  const isClosed = job?.status !== 'OPEN'
  const isApplyDisabled = hasApplied || isClosed

  function handleApply() {
    if (isApplyDisabled) return

    const token = localStorage.getItem('access_token')

    if (!token) {
      setShowLoginModal(true)
      return
    }

    if (hasApplied) return
    setShowApplyModal(true)
  }

  async function submitApplication(coverLetter: string) {
    if (!requestedJobId) return
    setApplying(true)

    try {
      await applyJob(requestedJobId, coverLetter)
      setHasApplied(true)
      setShowApplyModal(false)
      showToast('success', 'Lamaran berhasil dikirim.')
    } catch (requestError) {
      showToast(
        'error',
        requestError instanceof Error
          ? requestError.message
          : 'Gagal mengirim lamaran',
      )
    } finally {
      setApplying(false)
    }
  }

  useEffect(() => {
    if (!requestedJobId) return

    let active = true

    async function loadJob() {
      try {
        const result = await getJobById(requestedJobId)
        if (active) {
          setJob(result)
          setHasApplied(result.hasApplied)
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Gagal mengambil detail job',
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadJob()

    return () => {
      active = false
    }
  }, [requestedJobId])

  if (!jobId) return <p role="alert">Job tidak ditemukan.</p>
  if (loading) return <p>Loading job detail...</p>
  if (error) return <p role="alert">{error}</p>
  if (!job) return <p>Job tidak ditemukan.</p>

  return (
    <section className="mx-auto max-w-[1000px]">
      <Button.Root variant="ghost" onClick={() => navigate(-1)}>
        ← Back
      </Button.Root>

      <div className="my-7 flex items-start justify-between gap-6 max-sm:flex-col">
        <div>
          <p className="mb-1.5 text-sm font-bold uppercase text-[#66718a]">Job detail</p>
          <h1 className="m-0 text-[#15213f]">{job.title}</h1>
          <p className="mt-2.5 text-[#66718a]">
            {job.company} · Posted {formatDate(job.postedAt)}
          </p>
        </div>
        <Button.Root
          variant="primary"
          className="max-sm:w-full"
          onClick={handleApply}
          disabled={isApplyDisabled}
        >
          {hasApplied ? 'Applied' : isClosed ? 'Closed' : 'Apply'}
        </Button.Root>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-6 max-sm:flex max-sm:flex-col">
        <div className="rounded-2xl border border-[#e4e7ed] bg-white p-6">
          <h2 className="m-0 mb-3 text-lg text-[#15213f]">Description</h2>
          <p className="leading-7 text-[#45516c]">{job.description}</p>

          <h2 className="mt-7 mb-3 text-lg text-[#15213f]">Requirement</h2>
          <ul className="text-[#45516c] leading-7">
            {job.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl border border-[#e4e7ed] bg-white p-6">
          <h2 className="m-0 mb-3 text-lg text-[#15213f]">Job detail</h2>
          <p className="mt-[18px] grid gap-1 text-[#45516c]"><strong className="text-[13px] text-[#66718a]">Location</strong>{job.location}</p>
          <p className="mt-[18px] grid gap-1 text-[#45516c]"><strong className="text-[13px] text-[#66718a]">Job type</strong>{job.jobType.replace('_', '-')}</p>
          <p className="mt-[18px] grid gap-1 text-[#45516c]"><strong className="text-[13px] text-[#66718a]">Status</strong>{job.status}</p>
          <p className="mt-[18px] grid gap-1 text-[#45516c]"><strong className="text-[13px] text-[#66718a]">Salary</strong>{job.salaryMin.toLocaleString('id-ID')} - {job.salaryMax.toLocaleString('id-ID')} {job.currency}</p>
        </aside>
      </div>
      {showLoginModal && (
        <ModalNotAuth onClose={() => setShowLoginModal(false)} />
      )}
      {showApplyModal && (
        <ApplyModal
          loading={applying}
          onClose={() => setShowApplyModal(false)}
          onSubmit={submitApplication}
        />
      )}
    </section>
  )
}

export default JobDetailPage
