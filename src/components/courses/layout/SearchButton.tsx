type SearchButtonProps = {
  onClick: () => void
}

const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <button type="button" className="search-button" onClick={onClick}>
      Search
    </button>
  )
}

export default SearchButton