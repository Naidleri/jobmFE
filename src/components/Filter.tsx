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
  return <div className={`flex flex-col gap-3 ${className}`.trim()}>{children}</div>
}

function Trigger({ children = 'Filter' }: PropsWithChildren) {
  return (
    <button type="button" className="min-h-[42px] rounded-[10px] border border-[#dfe2e8] bg-white px-4 font-semibold text-[#15213f]">
      {children}
    </button>
  )
}

function Content({ children }: PropsWithChildren) {
  return <div className="flex flex-wrap gap-3">{children}</div>
}

function Select({ children, value = '', onChange }: FilterSelectProps) {
  return (
    <select
      className="min-h-[42px] rounded-[10px] border border-[#dfe2e8] bg-white px-3 font-inherit text-[#15213f]"
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
