import React, { FC } from 'react'
import modalOverlayStyle from './modal-overlay.module.css'

interface IModalOverlay {
  handleClose: Function
}

const ModalOverlay: FC<IModalOverlay> = ({ children, handleClose }) => {
  return (
    <div className={modalOverlayStyle.overlay} onClick={() => handleClose}>
      {children}
    </div>
  )
}

export default ModalOverlay