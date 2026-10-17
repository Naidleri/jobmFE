import { useEffect, useState } from 'react'
import { Button, showToast } from '../components'
import {
  getApplicationHistory,
  getMyApplications,
  type Application,
  type ApplicationHistory,
} from '../features/auth/services/application.service'
import { useAuth } from '../hooks/useAuth'
import { formatDate } from '../utils/date'

function readableRole(role: 'JOB_SEEKER' | 'COMPANY') {
  return role === 'JOB_SEEKER' ? 'Job Seeker' : 'Company'
}

function MyProfilePage() {
  const { user, logout } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [history, setHistory] = useState<Record<string, ApplicationHistory[]>>({})
  const [loading, setLoading] = useState(user?.role === 'JOB_SEEKER')

  useEffect(() => {
    async function loadApplications() {
      try {
        const result = await getMyApplications()
        setApplications(result)
      } catch (requestError) {
        showToast(
          'error',
          requestError instanceof Error
            ? requestError.message
            : 'Gagal mengambil history lamaran',
        )
      } finally {
        setLoading(false)
      }
    }

    if (user?.role === 'JOB_SEEKER') void loadApplications()
  }, [user])

  async function toggleHistory(applicationId: string) {
    if (history[applicationId]) {
      setHistory({ ...history, [applicationId]: [] })
      return
    }

    try {
      const result = await getApplicationHistory(applicationId)
      setHistory({ ...history, [applicationId]: result })
    } catch (requestError) {
      showToast(
        'error',
        requestError instanceof Error
          ? requestError.message
          : 'Gagal mengambil riwayat status',
      )
    }
  }

  if (!user) return <p role="alert">Silakan login terlebih dahulu.</p>
  if (user.role !== 'JOB_SEEKER') {
    return <p role="alert">Halaman ini khusus untuk Job Seeker.</p>
  }

  return (
    <section className="mx-auto max-w-[1000px]">
      <div className="flex items-start justify-between gap-4 max-sm:flex-col">
        <div>
          <p className="mb-1 text-sm font-bold uppercase tracking-wide text-[#66718a]">
            My Profile
          </p>
          <h1 className="m-0 text-2xl font-bold text-[#15213f]">{user.name}</h1>
        </div>
        <Button.Root variant="secondary" onClick={logout}>Logout</Button.Root>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-[#e4e7ed] bg-white p-6">
        <h2 className="m-0 text-lg text-[#15213f]">Account</h2>
        <p className="m-0 text-[#45516c]"><strong>Name:</strong> {user.name}</p>
        <p className="m-0 text-[#45516c]"><strong>Role:</strong> {readableRole(user.role)}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-[#15213f]">Application History</h2>
        {loading && <p className="text-[#66718a]">Loading applications...</p>}
        {!loading && applications.length === 0 && (
          <p className="text-[#66718a]">Belum ada lamaran.</p>
        )}
        <div className="grid gap-4">
          {applications.map((application) => (
            <article
              key={application.applicationId}
              className="rounded-2xl border border-[#e4e7ed] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4 max-sm:flex-col">
                <div>
                  <h3 className="m-0 font-bold text-[#15213f]">{application.jobTitle}</h3>
                  <p className="mt-1 text-[#66718a]">{application.company}</p>
                  <p className="mt-2 text-sm text-[#66718a]">
                    Applied: {formatDate(application.appliedAt)}
                  </p>
                </div>
                <span className="rounded-lg bg-[#eef1f7] px-3 py-1.5 text-sm font-bold text-[#45516c]">
                  {application.status}
                </span>
              </div>
              <button
                type="button"
                className="mt-4 text-sm font-bold text-[#15213f] underline"
                onClick={() => toggleHistory(application.applicationId)}
              >
                {history[application.applicationId] ? 'Hide history' : 'View history'}
              </button>
              {history[application.applicationId] && (
                <div className="mt-4 border-t border-[#e4e7ed] pt-3">
                  {history[application.applicationId].map((item) => (
                    <p key={item.id} className="m-0 py-1 text-sm text-[#45516c]">
                      {item.fromStatus ? `${item.fromStatus} → ` : ''}
                      {item.toStatus} · {formatDate(item.changedAt)}
                    </p>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MyProfilePage
