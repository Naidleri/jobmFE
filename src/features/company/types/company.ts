import type { ApplicationStatus } from '../../auth/services/application.service'

export type CompanyJob = {
  id: string
  companyId: string
  title: string
  description: string
  requirements: string[]
  location: string
  salaryMin: number
  salaryMax: number
  currency: string
  jobType: string
  status: string
  applicationDeadline: string
  createdAt: string
  updatedAt: string
}

export type CompanyCandidate = {
  applicationId: string
  jobSeekerId: string
  name: string
  email: string
  status: ApplicationStatus
  appliedAt: string
}
