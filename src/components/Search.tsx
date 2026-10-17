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
  return <div className={`search ${className}`.trim()}>{children}</div>
}

function Input({
  placeholder = 'Search...',
  value = '',
  onChange,
}: SearchInputProps) {
  return (
    <label className="search__input-wrapper">
      <span aria-hidden="true">⌕</span>
      <input
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
    <button type="button" className="search__clear">
      {children}
    </button>
  )
}

export const Search = {
  Root,
  Input,
  Clear,
}
