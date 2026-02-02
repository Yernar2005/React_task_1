type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar = ({ value, onChange, placeholder = 'Поиск по курсам...' }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Поиск по курсам"
      />
    </div>
  )
}

export default SearchBar