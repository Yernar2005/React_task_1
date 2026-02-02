import React from 'react'
import SearchBar from './SearchBar'
import AddNewCourse from './AddNewCourse'
import SearchButton from './SearchButton'
import './index.css'

const Layout = () => {
  return (
    <div className="layout">
      <div className="search-container">
      <SearchBar />
      <SearchButton />
      </div>
      <AddNewCourse />
    </div>
  )
}

export default Layout