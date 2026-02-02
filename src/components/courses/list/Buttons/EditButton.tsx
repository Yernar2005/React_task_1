import React from 'react'
import icon from "../../../../assets/Icon-Edit.svg";
import "./index.css";

const EditButton = () => {
  return (
    <button type="button" className="edit-button" aria-label="Редактировать курс">
      <img src={icon} alt="" />
    </button>
  )
}

export default EditButton