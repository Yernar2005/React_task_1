import { useState, useMemo } from 'react'
import './App.css'
import Layout from './components/courses/layout/index.tsx'
import CoursesList from './components/courses/list/index.tsx'
import CourseEditCreateModal from './components/courses/modal'
import type { CourseFormData } from './components/courses/modal'
import mockCoursesList from './mockCoursesList'

function App() {
  const [courses, setCourses] = useState(() => [...mockCoursesList])
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const applySearch = () => setSearchQuery(searchInput)

  const removeCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId))
  }

  const createCourse = (data: CourseFormData) => {
    const newCourse = {
      id: String(Date.now()),
      title: data.title,
      description: data.description,
      duration: data.duration,
      authors: data.authors.map((a) => ({ id: a.id, name: a.name })),
      creationDate: new Date().toISOString().slice(0, 10),
    }
    setCourses((prev) => [newCourse, ...prev])
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
        onAddCourse={() => setIsModalOpen(true)}
      />
      <CoursesList courses={filteredCourses} onRemoveCourse={removeCourse} />
      {isModalOpen && (
        <CourseEditCreateModal
          onClose={() => setIsModalOpen(false)}
          onCreateCourse={createCourse}
        />
      )}
    </>
  )
}

export default App
