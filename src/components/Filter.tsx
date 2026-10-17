import type {
  PropsWithChildren,
} from 'react'

type FilterRootProps = PropsWithChildren<{
  className?: string
}>

type FilterSelectProps = PropsWithChildren<{
  value?: string
  onChange?: (value: string) => void
}>

function Root({ children, className = '' }: FilterRootProps) {
  return <div className={`filter ${className}`.trim()}>{children}</div>
}

function Trigger({ children = 'Filter' }: PropsWithChildren) {
  return (
    <button type="button" className="filter__trigger">
      {children}
    </button>
  )
}

function Content({ children }: PropsWithChildren) {
  return <div className="filter__content">{children}</div>
}

function Select({ children, value = '', onChange }: FilterSelectProps) {
  return (
    <select
      className="filter__select"
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    >
      {children}
    </select>
  )
}

export const Filter = {
  Root,
  Trigger,
  Content,
  Select,
}
