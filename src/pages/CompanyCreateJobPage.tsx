import { useState, type FormEvent } from 'react'
import { Button, showToast } from '../components'
import { createCompanyJob } from '../features/company/services/company.service'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function CompanyCreateJobPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [requirements, setRequirements] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [deadline, setDeadline] = useState('')
  const [jobType, setJobType] = useState('FULL_TIME')

  if (!user || user.role !== 'COMPANY') {
    return <p role="alert">Halaman ini khusus untuk Company.</p>
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const minimum = Number(salaryMin)
    const maximum = Number(salaryMax)

    if (maximum < minimum) {
      showToast('error', 'Gaji maksimum harus lebih besar atau sama dengan gaji minimum')
      return
    }

    try {
      await createCompanyJob({
        title,
        description,
        requirements: requirements.split('\n').filter((item) => item.trim()),
        location,
        salaryMin: minimum,
        salaryMax: maximum,
        currency: 'IDR',
        jobType,
        status: 'OPEN',
        applicationDeadline: new Date(deadline).toISOString(),
      })
      showToast('success', 'Job berhasil dibuat.')
      navigate('/')
    } catch (error) {
      showToast('error', error instanceof Error ? error.message : 'Gagal membuat job')
    }
  }

  return (
    <section className="mx-auto max-w-[800px]">
      <div className="flex items-start justify-between gap-4 max-sm:flex-col">
        <div>
          <p className="mb-1 text-sm font-bold uppercase tracking-wide text-[#66718a]">
            Company
          </p>
          <h1 className="m-0 text-2xl font-bold text-[#15213f]">Create job</h1>
        </div>
        <Button.Root variant="ghost" onClick={() => navigate('/')}>Back</Button.Root>
      </div>

      <form
        className="mt-6 grid gap-3 rounded-2xl border border-[#e4e7ed] bg-white p-6"
        onSubmit={(event) => void handleCreate(event)}
      >
        <input className="min-h-11 rounded-lg border p-3" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} required />
        <textarea className="min-h-24 rounded-lg border p-3" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} required />
        <textarea className="min-h-20 rounded-lg border p-3" placeholder="Requirements, satu per baris" value={requirements} onChange={(event) => setRequirements(event.target.value)} required />
        <input className="min-h-11 rounded-lg border p-3" placeholder="Location" value={location} onChange={(event) => setLocation(event.target.value)} required />
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <input className="min-h-11 rounded-lg border p-3" type="number" placeholder="Salary min" value={salaryMin} onChange={(event) => setSalaryMin(event.target.value)} required />
          <input className="min-h-11 rounded-lg border p-3" type="number" placeholder="Salary max" value={salaryMax} onChange={(event) => setSalaryMax(event.target.value)} required />
        </div>
        <label className="grid gap-1 text-sm font-semibold text-[#45516c]">
          Application deadline
          <input
            className="min-h-11 rounded-lg border p-3 text-base font-normal text-[#15213f]"
            type="datetime-local"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            required
          />
        </label>
        <select className="min-h-11 rounded-lg border p-3" value={jobType} onChange={(event) => setJobType(event.target.value)}>
          <option value="FULL_TIME">Full-time</option>
          <option value="PART_TIME">Part-time</option>
        </select>
        <Button.Root type="submit">Save job</Button.Root>
      </form>
    </section>
  )
}

export default CompanyCreateJobPage
