import ShowButton from './Buttons/ShowButton'
import EditButton from './Buttons/EditButton'
import RemoveButton from './Buttons/RemoveButton'

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-')
  return `${day}.${month}.${year}`
}

type Course = {
  id: string
  title: string
  description: string
  duration: number
  authors: { id: string; name: string }[]
  creationDate: string
}

type CoursesListProps = {
  courses: Course[]
}

const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <ul className="courses-list-items">
      {courses.map((course) => (
        <li key={course.id}>
          <article className="courses-list-item">
            <header className="courses-list-item-content">
              <h3 className="courses-list-item-title">{course.title}</h3>
              <p className="courses-list-item-description">{course.description}</p>
            </header>

            <footer className="courses-list-item-info">
              <div className="courses-list-item-info-item">
                <span className="courses-list-item-info-item-text">
                  Author: {course.authors.map((a) => a.name).join(', ')}
                </span>
                <span className="courses-list-item-info-item-text">
                  Duration: {course.duration} min
                </span>
                <span className="courses-list-item-info-item-text">
                  Creation Date: {formatDate(course.creationDate)}
                </span>
              </div>

              <div className="courses-list-item-actions" role="group" aria-label="Действия с курсом">
                <ShowButton />
                <RemoveButton />
                <EditButton />
              </div>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default CoursesList