import CoursesList from './CoursesList'
import './index.css'

type Course = {
  id: string
  title: string
  description: string
  duration: number
  authors: { id: string; name: string }[]
  creationDate: string
}

type CoursesListIndexProps = {
  courses: Course[]
  onRemoveCourse: (courseId: string) => void
}

const Index = ({ courses, onRemoveCourse }: CoursesListIndexProps) => {
  return (
    <section className="courses-list" aria-label="Список курсов">
      <CoursesList courses={courses} onRemoveCourse={onRemoveCourse} />
    </section>
  )
}

export default Index