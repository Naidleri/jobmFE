import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

type ModalNotAuthProps = {
  onClose: () => void
  onLogin?: () => void
}

export default function ModalNotAuth({
  onClose,
  onLogin = onClose,
}: ModalNotAuthProps) {
  const navigate = useNavigate()

  function goToLogin() {
    onClose()
    if (onLogin === onClose) {
      navigate('/login')
      return
    }
    onLogin()
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-5"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-required-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="login-required-title"
          className="m-0 text-xl font-bold text-[#15213f]"
        >
          Login untuk melamar
        </h2>
        <p className="mt-3 text-[#66718a]">
          Kamu harus login terlebih dahulu sebelum bisa melamar pekerjaan ini.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button.Root variant="ghost" onClick={onClose}>
            Nanti
          </Button.Root>
          <Button.Root variant="primary" onClick={goToLogin}>
            Login
          </Button.Root>
        </div>
      </div>
    </div>
  )
}
