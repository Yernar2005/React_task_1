type AddNewCourseProps = {
  onClick: () => void
}

const AddNewCourse = ({ onClick }: AddNewCourseProps) => {
  return (
    <button type="button" className="add-new-course-button" onClick={onClick}>
      Add new course
    </button>
  )
}

export default AddNewCourse