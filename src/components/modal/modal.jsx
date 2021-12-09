import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import modalStyles from './modal.module.css'

const Modal = ({ children, handleClose}) => {

  const closeEsc = (e) => {
    if(e.key === 'Escape') {
      handleClose()
    }
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  useEffect(() => {
    document.addEventListener('keyup', closeEsc)

    return (
      document.removeEventListener('keyup', closeEsc)
    )
  }, [])

  return ReactDOM.createPortal(
    (
      <ModalOverlay handleClose={handleClose}>
        <div className={modalStyles.container} onClick={stopPropagation}>
          <button type='button' className={modalStyles.closeButton} onClick={handleClose}>
            <CloseIcon type='primary' />
          </button>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot,
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default Modal