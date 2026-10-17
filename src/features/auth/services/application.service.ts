import { buildApiUrl } from '../../../config/api'

export type ApplicationStatus =
  | 'APPLIED'
  | 'REVIEWING'
  | 'SHORTLISTED'
  | 'REJECTED'
  | 'ACCEPTED'

export type Application = {
  applicationId: string
  jobId: string
  jobTitle: string
  company: string
  status: ApplicationStatus
  appliedAt: string
}

export type ApplicationHistory = {
  id: number
  fromStatus: ApplicationStatus | null
  toStatus: ApplicationStatus
  changedBy: string
  note: string | null
  changedAt: string
}

type ApplicationsResponse = {
  data: Application[]
  total: number
  page: number
  pageSize: number
}

function getErrorMessage(message: unknown) {
  if (Array.isArray(message)) return message.join(', ')
  if (typeof message === 'string' && message.length > 0) return message
  return 'Terjadi kesalahan pada server'
}

async function request<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('access_token')
  const response = await fetch(buildApiUrl(endpoint), {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  const body = await response.json()

  if (response.status === 401) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('auth-changed'))
    window.location.href = '/login'
    throw new Error('Sesi telah berakhir. Silakan login kembali.')
  }

  if (!response.ok) throw new Error(getErrorMessage(body.message))

  return body as T
}

export async function getMyApplications() {
  const response = await request<ApplicationsResponse>('/me/applications')
  return response.data
}

export async function getApplicationHistory(applicationId: string) {
  const response = await request<{ data: ApplicationHistory[] }>(
    `/applications/${applicationId}/history`,
  )
  return response.data
}
