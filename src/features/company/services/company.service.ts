import { buildApiUrl } from '../../../config/api'
import type { CompanyCandidate, CompanyJob } from '../types/company'
import type { ApplicationStatus } from '../../auth/services/application.service'

type ListResponse<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
}

function getErrorMessage(message: unknown) {
  if (Array.isArray(message)) return message.join(', ')
  if (typeof message === 'string' && message.length > 0) return message
  return 'Terjadi kesalahan pada server'
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('access_token')
  const headers = new Headers(options?.headers)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(buildApiUrl(endpoint), { ...options, headers })
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

export async function getCompanyJobs(status = '') {
  const query = status ? `?page=1&pageSize=10&status=${status}` : '?page=1&pageSize=10'
  const response = await request<ListResponse<CompanyJob>>(`/company/jobs${query}`)
  return response.data
}

export async function createCompanyJob(data: Omit<CompanyJob, 'id' | 'companyId' | 'createdAt' | 'updatedAt'>) {
  return request<CompanyJob>('/company/jobs', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getCandidates(jobId: string, status = '') {
  const query = status ? `?page=1&pageSize=10&status=${status}` : '?page=1&pageSize=10'
  const response = await request<ListResponse<CompanyCandidate>>(
    `/company/jobs/${jobId}/applications${query}`,
  )
  return response.data
}

export async function updateCandidateStatus(
  applicationId: string,
  status: ApplicationStatus,
  note: string,
) {
  return request(`/company/applications/${applicationId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, ...(note.trim() ? { note: note.trim() } : {}) }),
  })
}
