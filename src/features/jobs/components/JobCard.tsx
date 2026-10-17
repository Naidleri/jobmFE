import type { Job } from '../types/job'

type JobCardProps = {
job: Job
}

function getCompanyInitials(company: string) {
return company
  .split(' ')
  .filter((word) => word.length > 0)
  .slice(0, 2)
  .map((word) => word[0])
  .join('')
  .toUpperCase()
}

function JobCard({ job }: JobCardProps) {
return (
  <article className="job-card">
    <div className="job-card__logo" aria-label={job.company}>
      {getCompanyInitials(job.company)}
    </div>

    <div className="job-card__content">
      <p className="job-card__label">Job</p>
      <h2>{job.title}</h2>
      <p className="job-card__company">{job.company}</p>
      <p className="job-card__location">@ {job.location}</p>

      <div className="job-card__tags" aria-label="Job skills and type">
            <span className="job-card__tag--type">
              {job.jobType.replace('_', '-')}
            </span>
      </div>
    </div>
    </article>
)
}

export default JobCard