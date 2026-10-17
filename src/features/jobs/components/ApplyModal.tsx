import { useState, type FormEvent } from 'react'
import { Button } from '../../../components'

type ApplyModalProps = {
  loading: boolean
  onClose: () => void
  onSubmit: (coverLetter: string) => void
}

export default function ApplyModal({
  loading,
  onClose,
  onSubmit,
}: ApplyModalProps) {
  const [coverLetter, setCoverLetter] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(coverLetter)
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-5"
      role="presentation"
      onClick={onClose}
    >
      <form
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 id="apply-title" className="m-0 text-xl font-bold text-[#15213f]">
          Apply untuk posisi ini
        </h2>
        <p className="mt-2 text-sm text-[#66718a]">
          Tulis cover letter sebelum mengirim lamaran.
        </p>
        <textarea
          className="mt-5 min-h-32 w-full rounded-[10px] border border-[#dfe2e8] p-3 text-[#15213f] outline-none focus:border-[#101c40]"
          value={coverLetter}
          onChange={(event) => setCoverLetter(event.target.value)}
          placeholder="Saya tertarik melamar posisi ini karena..."
          required
        />
        <div className="mt-5 flex justify-end gap-3">
          <Button.Root variant="ghost" onClick={onClose}>
            Batal
          </Button.Root>
          <Button.Root type="submit" variant="primary">
            {loading ? 'Mengirim...' : 'Kirim lamaran'}
          </Button.Root>
        </div>
      </form>
    </div>
  )
}
