/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react'

export type ToastType = 'success' | 'error'

type ToastProps = {
  type: ToastType
  message: string
  onClose: () => void
}

export type ToastEventDetail = {
  type: ToastType
  message: string
}

export const TOAST_EVENT = 'app-toast'

export function showToast(type: ToastType, message: string) {
  window.dispatchEvent(
    new CustomEvent<ToastEventDetail>(TOAST_EVENT, {
      detail: { type, message },
    }),
  )
}

export default function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 4000)

    return () => window.clearTimeout(timer)
  }, [onClose])

  const isSuccess = type === 'success'

  return (
    <div
      className={`fixed right-5 top-5 z-[60] flex w-[min(380px,calc(100vw-2.5rem))] items-start gap-3 rounded-xl border p-4 shadow-lg ${
        isSuccess
          ? 'border-green-200 bg-green-50 text-green-800'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
      role="alert"
    >
      <span className="text-lg font-bold">{isSuccess ? '✓' : '!'}</span>
      <p className="m-0 flex-1 text-sm font-semibold">{message}</p>
      <button
        type="button"
        className="text-lg leading-none opacity-70 hover:opacity-100"
        aria-label="Tutup notifikasi"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  )
}
