import type { MouseEventHandler, PropsWithChildren } from 'react'

type ButtonRootProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit'
}>

function Root({
  children,
  className = '',
  variant = 'primary',
  onClick,
  type = 'button',
}: ButtonRootProps) {
  return (
    <button
      className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[10px] px-4 font-semibold ${
        variant === 'primary'
          ? 'bg-[#101c40] text-white'
          : variant === 'secondary'
            ? 'border border-[#dfe2e8] bg-white text-[#15213f]'
            : 'bg-transparent text-[#45516c]'
      } ${className}`.trim()}
      type={type}
      onClick={onClick}
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
