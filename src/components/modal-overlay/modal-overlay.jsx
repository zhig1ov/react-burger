import React from 'react'
import PropTypes from 'prop-types'

import modalOverlayStyle from './modal-overlay.module.css'

const ModalOverlay = ({ children, handleClose }) => {
  return (
    <div className={modalOverlayStyle.overlay} onClick={handleClose}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ModalOverlay