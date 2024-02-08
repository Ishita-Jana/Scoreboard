import React, { useState } from 'react'
import Modal from 'react-modal';
// Modal.setAppElement('#root');
const PopUp = (props) => {
  const {message,isOpen,timer} = props.modalInfo;
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [modalMessage, setModalMessage] = useState(message);
  const [hideButton,setHideButton] = useState(false);


  if(timer > 0){
    setModal(timer);
  }

  const setModal = ()=>{
    //get submit
    setModalMessage('Data successfully uploaded.');
    setModalIsOpen(true);
    setHideButton(true);
  
    // Close the modal after 2 seconds
    setTimeout(() => {
      setModalIsOpen(false);
      setHideButton(false);
    }, timer);
    
    // Refresh the page after a delay or redirect to another page
    setTimeout(() => {
      console.log('Reloading the page...');
      // window.location.reload(); // Uncomment this line if you want to refresh the page
      // navigate('/some-other-route'); // Uncomment this line if you want to redirect to another route
    }, timer+500);
  }

  const openModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }


  return (
    
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <p>{modalMessage}</p>
          <button className={`${hideButton ? "hide-close-button" : ""}`} onClick={closeModal}>Close</button>
        </div>
      </Modal>
  )
}

export default PopUp
