import type { MouseEventHandler, PropsWithChildren } from 'react'

type ButtonRootProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}>

function Root({
  children,
  className = '',
  variant = 'primary',
  onClick,
}: ButtonRootProps) {
  return (
    <button
      className={`button button--${variant} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Icon({ children }: PropsWithChildren) {
  return <span className="button__icon" aria-hidden="true">{children}</span>
}

export const Button = {
  Root,
  Icon,
}
