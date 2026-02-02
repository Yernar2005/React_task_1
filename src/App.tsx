import { useState, useMemo } from 'react'
import './App.css'
import Layout from './components/courses/layout/index.tsx'
import CoursesList from './components/courses/list/index.tsx'
import mockCoursesList from './mockCoursesList'

function App() {
  const [courses, setCourses] = useState(() => [...mockCoursesList])
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const applySearch = () => setSearchQuery(searchInput)

  const removeCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId))
  }

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return courses
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.authors.some((a) => a.name.toLowerCase().includes(query))
    )
  }, [courses, searchQuery])

  return (
    <>
      <Layout
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearch={applySearch}
      />
      <CoursesList courses={filteredCourses} onRemoveCourse={removeCourse} />
    </>
  )
}

export default App
