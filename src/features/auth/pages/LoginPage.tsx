import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, showToast } from '../../../components'
import { login } from '../services/auth.service'
import type { AuthRole } from '../types/auth'

function LoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState<AuthRole>('JOB_SEEKER')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(email, password)

      if (result.user.role !== role) {
        const message = `Akun ini bukan akun ${role === 'JOB_SEEKER' ? 'Job Seeker' : 'Company'}.`
        setError(message)
        showToast('error', message)
        return
      }

      localStorage.setItem('access_token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      window.dispatchEvent(new Event('auth-changed'))
      showToast('success', 'Berhasil login. Selamat datang kembali!')
      navigate('/')
    } catch (requestError) {
      const message = requestError instanceof Error
        ? requestError.message
        : 'Login gagal'
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
          Welcome back
        </p>
        <h1 className="m-0 text-2xl font-bold text-[#15213f]">Login</h1>
        <p className="mt-2 text-[#66718a]">
          Masuk untuk melanjutkan ke IndoKerja.
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
            Email
            <input
              className="min-h-11 rounded-[10px] border border-[#dfe2e8] px-3 text-[#15213f] outline-none focus:border-[#101c40]"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-[#45516c]">
            Password
            <input
              className="min-h-11 rounded-[10px] border border-[#dfe2e8] px-3 text-[#15213f] outline-none focus:border-[#101c40]"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <p className="m-0 text-sm text-red-600" role="alert">{error}</p>}

          <Button.Root type="submit" variant="primary">
            {loading ? 'Logging in...' : `Login as ${role === 'JOB_SEEKER' ? 'Job Seeker' : 'Company'}`}
          </Button.Root>
        </form>
        <p className="mt-5 text-center text-sm text-[#66718a]">
          Belum punya akun?{' '}
          <Link className="font-bold text-[#15213f] underline" to="/register">
            Register
          </Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
