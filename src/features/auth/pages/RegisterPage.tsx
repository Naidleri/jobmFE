import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, showToast } from '../../../components'
import {
  registerCompany,
  registerJobSeeker,
} from '../services/auth.service'
import type { AuthRole } from '../types/auth'

function RegisterPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState<AuthRole>('JOB_SEEKER')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (role === 'JOB_SEEKER') {
        await registerJobSeeker(name, email, password)
      } else {
        await registerCompany(name, email, password, description)
      }

      showToast('success', 'Account berhasil dibuat. Silakan login.')
      navigate('/login')
    } catch (requestError) {
      const message = requestError instanceof Error
        ? requestError.message
        : 'Register gagal'
      showToast('error', message)
      setError(
        message,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-[#f8f9fb] p-5">
      <section className="w-full max-w-md rounded-2xl border border-[#e4e7ed] bg-white p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[#66718a]">
          Join IndoKerja
        </p>
        <h1 className="m-0 text-2xl font-bold text-[#15213f]">Register</h1>
        <p className="mt-2 text-[#66718a]">
          Buat akun untuk mulai menggunakan IndoKerja.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-[#f1f3f7] p-1">
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
              role === 'JOB_SEEKER'
                ? 'bg-[#101c40] text-white shadow-sm'
                : 'text-[#66718a] hover:text-[#15213f]'
            }`}
            onClick={() => setRole('JOB_SEEKER')}
          >
            Job Seeker
          </button>
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              role === 'COMPANY'
                ? 'bg-white text-[#45516c] shadow-sm'
                : 'text-[#8b94a6] hover:text-[#45516c]'
            }`}
            onClick={() => setRole('COMPANY')}
          >
            Company
          </button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1.5 text-sm font-semibold text-[#45516c]">
            {role === 'JOB_SEEKER' ? 'Name' : 'Company name'}
            <input
              className="min-h-11 rounded-[10px] border border-[#dfe2e8] px-3 text-[#15213f] outline-none focus:border-[#101c40]"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-[#45516c]">
            Email
            <input
              className="min-h-11 rounded-[10px] border border-[#dfe2e8] px-3 text-[#15213f] outline-none focus:border-[#101c40]"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-[#45516c]">
            Password
            <input
              className="min-h-11 rounded-[10px] border border-[#dfe2e8] px-3 text-[#15213f] outline-none focus:border-[#101c40]"
              type="password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {role === 'COMPANY' && (
            <label className="grid gap-1.5 text-sm font-semibold text-[#45516c]">
              Description
              <textarea
                className="min-h-24 rounded-[10px] border border-[#dfe2e8] p-3 text-[#15213f] outline-none focus:border-[#101c40]"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </label>
          )}

          {error && <p className="m-0 text-sm text-red-600" role="alert">{error}</p>}

          <Button.Root type="submit" variant="primary">
            {loading ? 'Registering...' : `Register as ${role === 'JOB_SEEKER' ? 'Job Seeker' : 'Company'}`}
          </Button.Root>
        </form>

        <p className="mt-5 text-center text-sm text-[#66718a]">
          Sudah punya akun?{' '}
          <Link className="font-bold text-[#15213f] underline" to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
