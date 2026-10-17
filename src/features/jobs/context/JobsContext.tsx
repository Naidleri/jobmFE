/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import { getJobs } from '../services/jobs.service'
import type { Job, JobFilters } from '../types/job'

export type JobsContextValue = {
  jobs: Job[]
  filters: JobFilters
  loading: boolean
  error: string
  setFilters: (filters: JobFilters) => void
}

export const JobsContext = createContext<JobsContextValue | undefined>(
  undefined,
)

const initialFilters: JobFilters = {
  keyword: '',
  location: '',
  jobType: '',
}

export function JobsProvider({ children }: PropsWithChildren) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filters, setFilters] = useState(initialFilters)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadJobs() {
      setLoading(true)
      setError('')

      try {
        const result = await getJobs(filters)
        if (active) setJobs(result.data)
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Gagal mengambil data jobs',
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadJobs()

    return () => {
      active = false
    }
  }, [filters])

  return (
    <JobsContext.Provider
      value={{ jobs, filters, loading, error, setFilters }}
    >
      {children}
    </JobsContext.Provider>
  )
}
