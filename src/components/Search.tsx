import type {
  PropsWithChildren,
} from 'react'

type SearchRootProps = PropsWithChildren<{
  className?: string
}>

type SearchInputProps = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

function Root({ children, className = '' }: SearchRootProps) {
  return <div className={`flex items-center gap-2 ${className}`.trim()}>{children}</div>
}

function Input({
  placeholder = 'Search...',
  value = '',
  onChange,
}: SearchInputProps) {
  return (
    <label className="flex w-full items-center gap-2 rounded-[10px] border border-[#dfe2e8] bg-white px-3.5 text-[#6b7488]">
      <span aria-hidden="true">⌕</span>
      <input
        className="min-h-[42px] w-full border-0 bg-transparent font-inherit text-[#15213f] outline-0"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  )
}

function Clear({ children = 'Clear' }: PropsWithChildren) {
  return (
    <button type="button" className="min-h-[42px] rounded-[10px] bg-transparent px-4 font-semibold text-[#45516c]">
      {children}
    </button>
  )
}

export const Search = {
  Root,
  Input,
  Clear,
}
