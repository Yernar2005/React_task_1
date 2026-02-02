import SearchBar from './SearchBar'
import AddNewCourse from './AddNewCourse'
import SearchButton from './SearchButton'
import './index.css'

type LayoutProps = {
  searchInput: string
  onSearchInputChange: (value: string) => void
  onSearch: () => void
  onAddCourse: () => void
}

const Layout = ({ searchInput, onSearchInputChange, onSearch, onAddCourse }: LayoutProps) => {
  return (
    <div className="layout">
      <div className="search-container">
        <SearchBar value={searchInput} onChange={onSearchInputChange} />
        <SearchButton onClick={onSearch} />
      </div>
      <AddNewCourse onClick={onAddCourse} />
    </div>
  )
}

export default Layout