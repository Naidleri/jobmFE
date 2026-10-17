import type { MouseEventHandler, PropsWithChildren } from 'react'

type ButtonRootProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit'
  disabled?: boolean
}>

function Root({
  children,
  className = '',
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonRootProps) {
  return (
    <button
      className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[10px] px-4 font-semibold ${
        disabled
          ? 'cursor-not-allowed bg-gray-300 text-gray-600'
          : variant === 'primary'
          ? 'bg-[#101c40] text-white'
          : variant === 'secondary'
            ? 'border border-[#dfe2e8] bg-white text-[#15213f]'
            : 'bg-transparent text-[#45516c]'
      } ${className}`.trim()}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Icon({ children }: PropsWithChildren) {
  return <span className="inline-flex" aria-hidden="true">{children}</span>
}

export const Button = {
  Root,
  Icon,
}
