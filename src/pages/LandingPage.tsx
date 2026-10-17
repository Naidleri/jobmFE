import { useEffect, useState } from 'react'
import { Filter, Search } from '../components'
import JobCard from '../features/jobs/components/JobCard'
import { JobsProvider } from '../features/jobs/context/JobsContext'
import { useJobs } from '../features/jobs/context/useJobs'
import { useDebounce } from '../hooks/useDebounce'

function JobsContent() {
  const { jobs, filters, loading, error, setFilters } = useJobs()
  const [keyword, setKeyword] = useState(filters.keyword)
  const debouncedKeyword = useDebounce(keyword)

  useEffect(() => {
    if (debouncedKeyword === filters.keyword) return

    setFilters({
      keyword: debouncedKeyword,
      location: filters.location,
      jobType: filters.jobType,
    })
  }, [debouncedKeyword, filters, setFilters])

  function updateLocation(location: string) {
    setFilters({
      keyword: filters.keyword,
      location,
      jobType: filters.jobType,
    })
  }

  function updateJobType(jobType: string) {
    setFilters({
      keyword: filters.keyword,
      location: filters.location,
      jobType,
    })
  }

  return (
    <section className="mx-auto max-w-[900px]" aria-labelledby="jobs-title">

      <div className="mb-6 flex items-start justify-between gap-5 rounded-[14px] border border-[#e4e7ed] bg-[#f8f9fb] p-4 max-sm:flex-col">
        <Search.Root>
          <Search.Input
            placeholder="Search jobs..."
            value={keyword}
            onChange={setKeyword}
          />
        </Search.Root>

        <Filter.Root className="shrink-0">
          <Filter.Trigger>Filter</Filter.Trigger>
          <Filter.Content>
            <Filter.Select
              value={filters.location}
              onChange={updateLocation}
            >
              <option value="">All locations</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bekasi">Bekasi</option>
            </Filter.Select>
            <Filter.Select
              value={filters.jobType}
              onChange={updateJobType}
            >
              <option value="">All job types</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
            </Filter.Select>
          </Filter.Content>
        </Filter.Root>
      </div>

      {loading && <p>Loading jobs...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && jobs.length === 0 && <p>Job tidak ditemukan.</p>}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}

function LandingPage() {
  return (
    <JobsProvider>
      <JobsContent />
    </JobsProvider>
  )
}

export default LandingPage