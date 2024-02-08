import React, { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import TitleBar from '../../components/TitleBar/TitleBar.js';
import ScoreTable from '../../components/ScoreTable/ScoreTable.js';
import ScoreInput from '../../components/ScoreInput/ScoreInput.js';

import Modal from 'react-modal' // Import the Modal component
import "./Judge.css"
import useModal from '../../components/Modal/useModal.js';

const rounds = [
  'Preliminary Round',
  'Quater Finals',
  'Semi Final',
  'Final'
];

const Judge = (props) => {
  
  const {currentRound,judgeNumber, submitPrelimData, submitPairMatchesData} = props;
  const [roundName, setRoundName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [courtRoom, setCourtRoom] = useState('');
  const [judgeName, setJudgeName] = useState('');
  const [teamDetails, setTeamDetails] = useState(null);
  const { modalIsOpen, openModal, closeModal, modalMessage, hideButton, setModal } = useModal();

  
  


  //-------handle enter score button click----------
  const handleEnterScore = () => {
    if (!/^\d{3}$/.test(teamCode)) {
      openModal('Please enter a valid 3-digit number for Team Code.');
      return;
    }

    // console.log(courtRoom);
    // console.log(teamCode);
    // console.log(judgeName);

    const courtRoomNumber = parseInt(courtRoom, 10);
    if (isNaN(courtRoomNumber) || courtRoomNumber < 1 || courtRoomNumber > 14) {
      openModal('Please enter a valid number between 1 and 14 for Court Room.');
      return;
    }

    const judgeNameRegex = /^[a-zA-Z\s]+$/;
    if (!judgeNameRegex.test(judgeName)) {
      openModal('Please enter a valid name for Judge Name.');
      return;
    }

    const formattedTeamCode = `TC-${teamCode}`;
    const formattedCourtRoom = `CR-${courtRoomNumber}`;

    setTeamDetails({
      courtRoom: formattedCourtRoom,
      round: currentRound,
      teamCode: formattedTeamCode,
      judgeName: judgeName
      
    });
  }



  //-------handle submit of data----------
  const handleSubmit = (teamScore)=>{
    const formattedTeamCode = `TC-${teamCode}`;
    const formattedCourtRoom = `CR-${courtRoom}`;
      const data = {
        round: currentRound,
        teamCode: formattedTeamCode,
        courtRoom: formattedCourtRoom,
        judgeNumber: judgeNumber,
        jScore: {
          judgeName: judgeName,
          date : new Date(),
          scores: teamScore,
        },
      }
      
      console.log(data);
      console.log(currentRound);

      if(currentRound == 0){
        // console.log("submitting prelim data",data);
        const response = submitPrelimData(data);
        console.log(response);
      }
      if(currentRound !== 0){
        submitPairMatchesData(data);
      }

      
      setModal();
      
  }




  //-----handle modal message--------

 






  //render when currntRound changes
  useEffect(()=>{
    setRoundName(rounds[currentRound]);
  },[currentRound])






  return (
    <div className='judge'>
      <div className='title-judge'><TitleBar title="National Moot Court Comptition 2024" /></div>
      

      <div className='judge-current-round'>{roundName}</div>

      <div className='content'>
        <div>
          <div>
            <label>TeamCode:</label>
            <input value={teamCode} onChange={(e) => setTeamCode(e.target.value)} required/>
          </div>
          <div>
            <label>Court Room:</label>
            <input value={courtRoom} onChange={(e) => setCourtRoom(e.target.value)} required />
          </div>
          <div>
            <label>Enter Your Name:</label>
            <input value={judgeName} onChange={(e) => setJudgeName(e.target.value)} autoComplete='on' required />
          </div>
          <div>
            <button onClick={handleEnterScore}>Enter Score</button>
          </div>
        </div>
      </div>


     
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-judge"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          {console.log(modalMessage)}
          <p>{modalMessage}</p>
          <button className={`${hideButton ? "hide-close-button" : ""}`} onClick={closeModal}>Close</button>
        </div>
      </Modal>
        
   
      {teamDetails &&(
        <ScoreInput teamDetails={teamDetails} handleSubmit={handleSubmit}  />
      )}
      
    </div>
  );
}

export default Judge;
