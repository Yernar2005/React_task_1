import CoursesList from './CoursesList'
import mockCoursesList from '../../../mockCoursesList'
import './index.css'

const Index = () => {
  return (
    <section className="courses-list" aria-label="Список курсов">
      <CoursesList courses={mockCoursesList} />
    </section>
  )
}

export default Index