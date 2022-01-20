import React, { useEffect, FC,  } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import modalStyles from './modal.module.css'

interface IModal {
  handleClose: Function
}

interface KeyboardEvent {
  key: string;
}

const Modal: FC<IModal> = ({ children, handleClose}) => {
  
  const modalRoot = document.getElementById('modal-root')

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        handleClose() 
      }
    }
    document.addEventListener('keydown', closeEsc)

    return () => (
      document.removeEventListener('keydown', closeEsc)
    )
  }, [handleClose])

  const closeModal = () => {
    handleClose()
  }

  return ReactDOM.createPortal(
    (
      <ModalOverlay handleClose={handleClose}>
        <div className={modalStyles.container} onClick={stopPropagation}>
          <button type='button' className={modalStyles.closeButton} onClick={closeModal}>
            <CloseIcon type='primary' />
          </button>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot!,
  )
}

export default Modal