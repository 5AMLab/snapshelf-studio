import React, { createContext, useContext, useState, useCallback } from 'react'

const ModalContext = createContext({
  activeModal: null,
  modalProps: {},
  openModal: () => {},
  closeModal: () => {}
})

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null)
  const [modalProps, setModalProps] = useState({})

  const openModal = useCallback((modalType, props = {}) => {
    setActiveModal(modalType)
    setModalProps(props)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    setModalProps({})
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset'
  }, [])

  const value = {
    activeModal,
    modalProps,
    openModal,
    closeModal
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext