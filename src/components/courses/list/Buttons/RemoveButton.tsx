import icon from '../../../../assets/Icon-Trash.svg'
import './index.css'

type RemoveButtonProps = {
  onRemove: () => void
}

const RemoveButton = ({ onRemove }: RemoveButtonProps) => {
  return (
    <button
      type="button"
      className="remove-button"
      aria-label="Удалить курс"
      onClick={onRemove}
    >
      <img src={icon} alt="" />
    </button>
  )
}

export default RemoveButton