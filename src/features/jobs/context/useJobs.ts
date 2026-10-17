import { useContext } from 'react'
import { JobsContext } from './JobsContext'

export function useJobs() {
  const context = useContext(JobsContext)

  if (!context) {
    throw new Error('useJobs harus digunakan di dalam JobsProvider')
  }

  return context
}
