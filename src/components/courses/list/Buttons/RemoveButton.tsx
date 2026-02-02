import React from 'react'
import icon from "../../../../assets/Icon-Trash.svg";
import "./index.css";

const RemoveButton = () => {
  return (
    <button type="button" className="remove-button" aria-label="Удалить курс">
      <img src={icon} alt="" />
    </button>
  )
}

export default RemoveButton