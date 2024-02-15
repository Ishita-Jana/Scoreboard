import React, { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import TitleBar from '../../components/TitleBar/TitleBar.js';
import ScoreTable from '../../components/ScoreTable/ScoreTable.js';
import ScoreInput from '../../components/ScoreInput/ScoreInput.js';

import Modal from 'react-modal'
import "./Judge.css"
import useModal from '../../components/Modal/useModal.js';
import { JudgeEmailTable, getSpeakerTotal } from '../../utilities.js';
import { httpSendEmail } from '../../hooks/requests.js';


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
  const [judgeEmail, setJudgeEmail] = useState('');
  const [teamDetails, setTeamDetails] = useState(null);
  const { modalIsOpen, openModal, closeModal, modalMessage, hideButton,hideModalButton, setModal } = useModal();

  
  


  //-------handle enter score button click----------
  const handleEnterScore = () => {
    if (!/^\d{3}$/.test(teamCode)) {
      openModal('Please enter a valid 3-digit number for Team Code.');
      return;
    }

    if(teamCode < 200 || teamCode > 230){
      openModal('Please enter number between 200 and 230 for Team Code.');
      return;
    }

    const courtRoomNumber = parseInt(courtRoom, 10);
    if (isNaN(courtRoomNumber) || courtRoomNumber < 1 || courtRoomNumber > 250) {
      openModal('Please enter a courtRoom number between 1 and 250 for Court Room.');
      return;
    }

    const judgeNameRegex = /^[a-zA-Z\s]+$/;
    if (!judgeNameRegex.test(judgeName)) {
      openModal('Please enter a valid name for Judge Name.');
      return;
    }

    const formattedTeamCode = `TC-${teamCode}`;
    const formattedCourtRoom = `CR-${courtRoomNumber}`;
    const formattedJudgeName = judgeName.trim().toLowerCase();

    setTeamDetails({
      courtRoom: formattedCourtRoom,
      round: currentRound,
      teamCode: formattedTeamCode,
      judgeName: formattedJudgeName
      
    });
  }



  //-------handle submit of data----------
  const handleSubmit = async(teamScore)=>{

    hideModalButton(true);
    openModal('Updating scores......');
    console.log(teamScore);
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
      
      // console.log(data);
      // console.log(currentRound);

      if(currentRound == 0){
        // console.log("submitting prelim data");
        const response = submitPrelimData(data);
        // console.log(response);
      }
      if(currentRound !== 0){
        console.log("submitting pairdata data");
        console.log(data);
        submitPairMatchesData(data);
        // console.log(response);
      }


     const total = getSpeakerTotal(teamScore);
     const response = JudgeEmailTable(judgeName,currentRound,courtRoom,teamCode,teamScore,total);
     const je =judgeEmail.trim();
    //  console.log(response);
    //  console.log(je);
     const r = {
        to: je,
        subject:`MCC Score For Team ${formattedTeamCode} `,
        text: "Copy of the marks",
        html: response
     }
     const resp = await httpSendEmail(r)
    //  console.log(resp);
    if(resp.ok){
      hideModalButton(false);
      openModal('Email sent successfully');
      // window.location.reload();
      
    }
    if(!resp.ok){
      openModal('Error in sending email.');
      // window.location.reload();
    }
      
  
      
  }






 






  //render when currntRound changes
  useEffect(()=>{
    setRoundName(rounds[currentRound]);
  },[currentRound])






  return (
    <div className='judge'>
      <div className='title-judge'><TitleBar title="National Moot Court Competition 2024" /></div>
      

      <div className='judge-current-round'>{roundName}</div>

      <div className='content-judge'>
        <div className='con-i'>
            <div className='input-j'>
              <label>Enter Team Code:</label>
              <input name='teamCode' type='number' value={teamCode} onChange={(e) => setTeamCode(e.target.value)} required/>
            </div>
            <div className='input-j'>
              <label>Enter Court Room:</label>
              <input name='courtRoom' type='number' value={courtRoom} onChange={(e) => setCourtRoom(e.target.value)} required />
            </div>
            <div className='input-j'>
              <label>Enter Your Name:</label>
              <input name='jname' type='text' value={judgeName} onChange={(e) => setJudgeName(e.target.value)} autoComplete='on' required />
            </div>
            <div className='input-j'>
              <label>Enter Your Email:</label>
              <input name='email' type='email' value={judgeEmail} onChange={(e) => setJudgeEmail(e.target.value)} autoComplete='on' className='email-id'  required />
            </div>
            <div>
            <button onClick={handleEnterScore} className='sub-score-btn'>Enter Score</button>
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
          {/* {console.log(modalMessage)} */}
          <p>{modalMessage}</p>
          <button className={`${hideButton ? "hide-close-button" : ""}`} onClick={closeModal}>Close</button>
        </div>
      </Modal>
        
      <div className= {`${teamDetails?"act-input-con":""}`}>
      {teamDetails &&(
        <ScoreInput  teamDetails={teamDetails} handleSubmit={handleSubmit}  />
      )}
      </div>
      
      
    </div>
  );
}

export default Judge;
