import React, { useEffect, useState } from 'react'

import Header from '../../components/Header/Header'
import TitleBar from '../../components/TitleBar/TitleBar.js'
import Modal from 'react-modal';
import useModal from '../../components/Modal/useModal.js';
import JudgeScoreTable from '../../components/JudgeScoreTable/JudgeScoreTable.js';


const Admin = (props) => {

  const {currentRound, judgeNumber,getAllData, getCurrentAdminSettings,setCurrentAdminSettings, prelimData, pairMatchesData, getPrelimdata, getPairMatchesData} = props;
  const { modalIsOpen, openModal, closeModal, modalMessage, hideButton, setModal } = useModal();
  const [data, setData] = useState({
    role: 'admin',
    round: '0',
    judgeNumber: '2',
  });

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);
    setData({
      ...data,
      [name]:value, 
    }); 

    console.log(data);
  }

  const handleSubmit = () => {

    if(data.judgeNumber === '' || data.round === '' || data.judgeNumber==0){
      openModal('Fields cannot be blank');
      return;
    }

    setCurrentAdminSettings(data);
    setModal();

  }

  

  useEffect(()=>{
    console.log(prelimData, pairMatchesData);
    getAllData();
    getCurrentAdminSettings();
  },[prelimData, pairMatchesData, getPrelimdata, getPairMatchesData])
  

  return (
    <div className='admin-page-container-style'>
      <TitleBar title="Admin"/>
      <div className='admin-input'>
          <div className='round-input'>
            <select name='round' onChange={handleChange} value={data.round}>
                <option value="0">Prelimis</option>
                <option value="1">Elimination</option>
                <option value="2">Semi-Final</option>
                <option value="3">Final</option>
            </select>
          </div>
          <div className='judge-input'>
            <label>Enter Judge Number</label>
            <input  type="number" name='judgeNumber' value={data.judgeNumber} onChange={handleChange}  />
          </div>
          <div><button onClick={handleSubmit}>Submit</button></div>
      </div>
      <JudgeScoreTable/>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-judge"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <p>{modalMessage}</p>
          <button className={`${hideButton ? "hide-close-button" : ""}`} onClick={closeModal}>Close</button>
        </div>
      </Modal>
      

      
      
      
      
      
    </div>
  )
}

export default Admin
