import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
const useModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [hideButton, setHideButton] = useState(false);
  
    const openModal = (message) => {
      setModalMessage(message);
      setModalIsOpen(true);
    }
  
    const closeModal = () => {
      setModalIsOpen(false);
    }

    const hideModalButton = (par)=>{
      setHideButton(par);
    }
  
    const setModal = () => {
      // Set submit message
      setModalMessage('Data successfully uploaded.');
      setModalIsOpen(true);
      setHideButton(true);
  
      // Close the modal after 2 seconds
      setTimeout(() => {
        setModalIsOpen(false);
        setHideButton(false);
      }, 2000);
  
      // Refresh the page after a delay or redirect to another page
      setTimeout(() => {
        console.log('Reloading the page...');
        window.location.reload(); // Uncomment this line if you want to refresh the page
        // navigate('/some-other-route'); // Uncomment this line if you want to redirect to another route
      }, 2500);
    }
  
    return {
      modalIsOpen,
      openModal,
      closeModal,
      modalMessage,
      hideButton,
      setModal,
      hideModalButton
    };
}

export default useModal
