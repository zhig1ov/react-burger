import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import modalStyles from './modal.module.css'

const Modal = ({ children, handleClose}) => {

  const modalRoot = document.getElementById('modal-root')

  // const closeEsc = useCallback((e) => {
  //   if(e.keyCode === 27) {
  //     handleClose(e)
  //   }
  // }, [handleClose]) 


  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const closeEsc = (e) => {
      if(e.keyCode === 27) {
        handleClose(e)
      }
    }
    document.addEventListener('keydown', closeEsc)

    return () => (
      document.removeEventListener('keydown', closeEsc)
    )
  }, [handleClose])

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