import { Filter, Search } from '../components'
import JobCard from '../features/jobs/components/JobCard'
import { JobsProvider } from '../features/jobs/context/JobsContext'
import { useJobs } from '../features/jobs/context/useJobs'

function JobsContent() {
  const { jobs, filters, loading, error, setFilters } = useJobs()

  function updateKeyword(keyword: string) {
    setFilters({
      keyword,
      location: filters.location,
      jobType: filters.jobType,
    })
  }

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
    <section className="jobs-fragment" aria-labelledby="jobs-title">

      <div className="jobs-fragment__toolbar">
        <Search.Root>
          <Search.Input
            placeholder="Search jobs..."
            value={filters.keyword}
            onChange={updateKeyword}
          />
        </Search.Root>

        <Filter.Root>
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
      <div className="jobs-list">
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