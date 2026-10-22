import type { Job } from '../types/job'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components'
import type { MouseEvent } from 'react'

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
  const navigate = useNavigate()

  function openDetail() {
    navigate(`/jobs/${job.id}`)
  }

  function openDetailFromButton(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    openDetail()
  }

return (
  <article className="flex cursor-pointer items-start justify-start gap-5 rounded-[18px] border border-[#e4e7ed] bg-white p-[22px] max-sm:flex-col" onClick={openDetail}>
    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-[#15213f] text-base font-extrabold text-white" aria-label={job.company}>
      {getCompanyInitials(job.company)}
    </div>

    <div className="min-w-0 flex-1">
      <p className="mb-1 text-[13px] font-bold text-[#66718a]">Job</p>
      <h2 className="m-0 text-[#15213f]">{job.title}</h2>
      <p className="mt-2 text-[15px] font-bold text-[#66718a]">{job.company}</p>
      <p className="mt-1 text-sm text-[#66718a]">@ {job.location}</p>

      <div className="mt-[18px] flex flex-wrap gap-2" aria-label="Job skills and type">
          <span className="rounded-[7px] bg-[#e2f3e8] px-2.5 py-1.5 text-xs font-extrabold text-[#237242]">
              {job.jobType.replace('_', '-')}
            </span>
      </div>
    </div>
    <Button.Root
      variant="secondary"
      className="shrink-0 max-sm:w-full"
      onClick={openDetailFromButton}
    >
      View & Apply
    </Button.Root>
    </article>
)
}

export default JobCard