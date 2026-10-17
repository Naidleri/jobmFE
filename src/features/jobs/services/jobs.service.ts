import { buildApiUrl } from '../../../config/api'
import type { JobDetail, JobFilters, JobsResponse } from '../types/job'

function getErrorMessage(message: unknown): string {
  if (Array.isArray(message)) {
    return message.join(', ')
  }

  if (typeof message === 'string' && message.length > 0) {
    return message
  }

  return 'Terjadi kesalahan pada server'
}

export async function getJobs(
  filters: JobFilters,
  page = 1,
  pageSize = 10,
): Promise<JobsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })

  if (filters.keyword) params.set('keyword', filters.keyword)
  if (filters.location) params.set('location', filters.location)
  if (filters.jobType) params.set('jobType', filters.jobType)

  const token = localStorage.getItem('access_token')
  const response = await fetch(`${buildApiUrl('/jobs')}?${params.toString()}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    throw new Error(
      'Response API bukan JSON. Pastikan VITE_API_BASE_URL mengarah ke backend dan restart Vite.',
    )
  }

  const body = await response.json()

  if (!response.ok) {
    throw new Error(getErrorMessage(body.message))
  }

  return body as JobsResponse
}

export async function getJobById(jobId: string): Promise<JobDetail> {
  const token = localStorage.getItem('access_token')
  const response = await fetch(buildApiUrl(`/jobs/${jobId}`), {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    throw new Error('Response API bukan JSON.')
  }

  const body = await response.json()

  if (!response.ok) {
    throw new Error(getErrorMessage(body.message))
  }

  return body as JobDetail
}
