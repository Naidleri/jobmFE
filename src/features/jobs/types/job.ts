export type Job = {
  id: string
  title: string
  company: string
  location: string
  salaryMin: number
  salaryMax: number
  currency: string
  jobType: string
  hasApplied: boolean
}

export type JobsResponse = {
  data: Job[]
  total: number
  page: number
  pageSize: number
}

export type JobFilters = {
  keyword: string
  location: string
  jobType: string
}
