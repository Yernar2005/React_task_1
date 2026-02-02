import { useState, useId, useEffect } from 'react'
import './index.css'

export type Author = { id: string; name: string }

export type CourseFormData = {
  title: string
  description: string
  duration: number
  authors: Author[]
}

type CourseEditCreateModalProps = {
  onClose: () => void
  onCreateCourse: (data: CourseFormData) => void
}

const formatDurationHours = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} hours`
}

const CourseEditCreateModal = ({ onClose, onCreateCourse }: CourseEditCreateModalProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState<number | ''>('')
  const [authorName, setAuthorName] = useState('')
  const [allAuthors, setAllAuthors] = useState<Author[]>([])
  const [courseAuthors, setCourseAuthors] = useState<Author[]>([])
  const [touched, setTouched] = useState({ title: false, description: false, duration: false })
  const id = useId()

  const titleError = touched.title && !title.trim()
  const descriptionError = touched.description && !description.trim()
  const durationError = touched.duration && (duration === '' || Number(duration) < 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ title: true, description: true, duration: true })
    if (!title.trim() || !description.trim() || duration === '' || Number(duration) < 0) return
    onCreateCourse({
      title: title.trim(),
      description: description.trim(),
      duration: Number(duration),
      authors: [...courseAuthors],
    })
    onClose()
  }

  const createAuthor = () => {
    const name = authorName.trim()
    if (!name) return
    const newAuthor: Author = { id: `author-${Date.now()}`, name }
    setAllAuthors((prev) => [...prev, newAuthor])
    setCourseAuthors((prev) => (prev.some((a) => a.id === newAuthor.id) ? prev : [...prev, newAuthor]))
    setAuthorName('')
  }

  const addAuthorToCourse = (author: Author) => {
    if (courseAuthors.some((a) => a.id === author.id)) return
    setCourseAuthors((prev) => [...prev, author])
  }

  const removeAuthorFromList = (authorId: string) => {
    setAllAuthors((prev) => prev.filter((a) => a.id !== authorId))
    setCourseAuthors((prev) => prev.filter((a) => a.id !== authorId))
  }

  const removeAuthorFromCourse = (authorId: string) => {
    setCourseAuthors((prev) => prev.filter((a) => a.id !== authorId))
  }

  const durationNum = duration === '' ? 0 : Number(duration)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="course-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
      <div className="course-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id={`${id}-title`} className="course-modal-title">Course Edit/Create</h2>

        <form onSubmit={handleSubmit} className="course-modal-form">
          <div className="course-modal-field">
            <label htmlFor={`${id}-title-input`}>Title</label>
            <input
              id={`${id}-title-input`}
              type="text"
              className={`course-modal-input ${titleError ? 'course-modal-input-error' : ''}`}
              placeholder="Input text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, title: true }))}
            />
            {titleError && <span className="course-modal-error">Title is required.</span>}
          </div>

          <div className="course-modal-field">
            <label htmlFor={`${id}-description`}>Description</label>
            <textarea
              id={`${id}-description`}
              className={`course-modal-input course-modal-textarea ${descriptionError ? 'course-modal-input-error' : ''}`}
              placeholder="Input text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, description: true }))}
            />
            {descriptionError && <span className="course-modal-error">Description is required.</span>}
          </div>

          <div className="course-modal-field course-modal-duration-row">
            <div>
              <label htmlFor={`${id}-duration`}>Duration</label>
              <input
                id={`${id}-duration`}
                type="number"
                min={0}
                className={`course-modal-input course-modal-duration-input ${durationError ? 'course-modal-input-error' : ''}`}
                placeholder="Input text"
                value={duration === '' ? '' : duration}
                onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
                onBlur={() => setTouched((p) => ({ ...p, duration: true }))}
              />
              {durationError && <span className="course-modal-error">Duration is required.</span>}
            </div>
            <span className="course-modal-duration-hint">{formatDurationHours(durationNum)}</span>
          </div>

          <div className="course-modal-authors">
            <div className="course-modal-authors-column">
              <div className="course-modal-authors-section-title">Authors</div>
              <div className="course-modal-field course-modal-author-row">
                <label htmlFor={`${id}-author-name`}>Author Name</label>
                <div className="course-modal-author-input-row">
                  <input
                    id={`${id}-author-name`}
                    type="text"
                    className="course-modal-input"
                    placeholder="Input text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), createAuthor())}
                  />
                  <button type="button" className="course-modal-btn course-modal-btn-primary" onClick={createAuthor}>
                    CREATE AUTHOR
                  </button>
                </div>
              </div>
              <div className="course-modal-authors-list-block">
                <div className="course-modal-authors-list-title">Authors List</div>
                <ul className="course-modal-authors-list">
                  {allAuthors.length === 0 ? (
                    <li className="course-modal-authors-empty">No authors yet</li>
                  ) : (
                    allAuthors.map((author) => (
                      <li key={author.id} className="course-modal-author-item">
                        <span>{author.name}</span>
                        <span className="course-modal-author-actions">
                          <button
                            type="button"
                            className="course-modal-icon-btn"
                            onClick={() => addAuthorToCourse(author)}
                            aria-label={`Add ${author.name} to course`}
                            title="Add to course"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="course-modal-icon-btn"
                            onClick={() => removeAuthorFromList(author.id)}
                            aria-label={`Remove ${author.name}`}
                            title="Remove author"
                          >
                            🗑️
                          </button>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
           
          </div>

          <div className="course-modal-actions">
            <button type="button" className="course-modal-btn course-modal-btn-secondary" onClick={onClose}>
              CANCEL
            </button>
            <button type="submit" className="course-modal-btn course-modal-btn-primary">
              CREATE COURSE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CourseEditCreateModal
