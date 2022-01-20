import React, { FC } from 'react'
import modalOverlayStyle from './modal-overlay.module.css'

interface IModalOverlay {
  handleClose: Function
}

const ModalOverlay: FC<IModalOverlay> = ({ children, handleClose }) => {
  const closeModalOverlay = () => {
    handleClose()
  }
  return (
    <div className={modalOverlayStyle.overlay} onClick={closeModalOverlay}>
      {children}
    </div>
  )
}

export default ModalOverlay