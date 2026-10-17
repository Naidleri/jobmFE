import { useEffect, useState } from 'react'
import { Button, Filter, showToast } from '../components'
import {
  getCandidates,
  updateCandidateStatus,
} from '../features/company/services/company.service'
import type { CompanyCandidate } from '../features/company/types/company'
import type { ApplicationStatus } from '../features/auth/services/application.service'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../utils/date'

const candidateStatuses: ApplicationStatus[] = [
  'APPLIED',
  'REVIEWING',
  'SHORTLISTED',
  'REJECTED',
  'ACCEPTED',
]

function CompanyApplicantsPage() {
  const { user } = useAuth()
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const [candidates, setCandidates] = useState<CompanyCandidate[]>([])
  const [candidateStatus, setCandidateStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCandidates() {
      if (!jobId) return

      setLoading(true)
      try {
        setCandidates(await getCandidates(jobId, candidateStatus))
      } catch (error) {
        showToast('error', error instanceof Error ? error.message : 'Gagal memuat kandidat')
      } finally {
        setLoading(false)
      }
    }

    void loadCandidates()
  }, [candidateStatus, jobId])

  async function changeCandidateStatus(
    candidate: CompanyCandidate,
    nextStatus: ApplicationStatus,
  ) {
    try {
      await updateCandidateStatus(candidate.applicationId, nextStatus, '')
      showToast('success', 'Status kandidat berhasil diperbarui.')
      if (jobId) setCandidates(await getCandidates(jobId, candidateStatus))
    } catch (error) {
      showToast(
        'error',
        error instanceof Error ? error.message : 'Gagal memperbarui status kandidat',
      )
    }
  }

  if (!user || user.role !== 'COMPANY') {
    return <p role="alert">Halaman ini khusus untuk Company.</p>
  }

  if (!jobId) {
    return <p role="alert">Job tidak ditemukan.</p>
  }

  return (
    <section className="mx-auto max-w-[1000px]">
      <div className="flex items-start justify-between gap-4 max-sm:flex-col">
        <div>
          <p className="mb-1 text-sm font-bold uppercase tracking-wide text-[#66718a]">
            Company
          </p>
          <h1 className="m-0 text-2xl font-bold text-[#15213f]">Job applicants</h1>
          <p className="mt-2 text-[#66718a]">Job ID: {jobId}</p>
        </div>
        <Button.Root variant="ghost" onClick={() => navigate('/')}>Back to My Job</Button.Root>
      </div>

      <div className="my-6">
        <Filter.Select value={candidateStatus} onChange={setCandidateStatus}>
          <option value="">All candidate status</option>
          {candidateStatuses.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </Filter.Select>
      </div>

      {loading && <p className="text-[#66718a]">Loading applicants...</p>}
      {!loading && candidates.length === 0 && (
        <p className="text-[#66718a]">Belum ada kandidat yang melamar.</p>
      )}
      <div className="grid gap-3">
        {candidates.map((candidate) => (
          <article
            key={candidate.applicationId}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[#e4e7ed] bg-white p-5 max-sm:flex-col max-sm:items-start"
          >
            <div>
              <h2 className="m-0 text-lg font-bold text-[#15213f]">{candidate.name}</h2>
              <p className="m-0 text-sm text-[#66718a]">{candidate.email}</p>
              <p className="mt-1 text-sm text-[#66718a]">
                Applied: {formatDate(candidate.appliedAt)}
              </p>
            </div>
            <select
              className="rounded-lg border p-2"
              value={candidate.status}
              onChange={(event) => void changeCandidateStatus(
                candidate,
                event.target.value as ApplicationStatus,
              )}
            >
              {candidateStatuses.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CompanyApplicantsPage
