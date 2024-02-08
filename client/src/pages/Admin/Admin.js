import React, { useEffect, useState ,useRef} from 'react'
import { useReactToPrint } from 'react-to-print';

import TitleBar from '../../components/TitleBar/TitleBar.js'
import Modal from 'react-modal';
import useModal from '../../components/Modal/useModal.js';
import {JudgeScoreTable} from '../../components/JudgeScoreTable/JudgeScoreTable.js';
import PrelimsScoreTable from '../../components/PrelimsScoreTable/PrelimsScoreTable.js';
import { filterPrelimData } from '../../utilities.js';


const Admin = (props) => {

  const {currentRound, judgeNumber,getAllData, getCurrentAdminSettings,setCurrentAdminSettings, prelimData, pairMatchesData, getPrelimdata, getPairMatchesData,getAllPrelimdata} = props;
  const { modalIsOpen, openModal, closeModal, modalMessage, hideButton, setModal } = useModal();
  const [prelimshow, setPrelimshow] = useState(false);
  const [judgeshow, setJudgeshow] = useState(false);
  const [scores, setScores] = useState();
  const [data, setData] = useState({
    role: 'admin',
    round: '0',
    judgeNumber: '2',
  });
  const judgeRef = useRef();
  const prelimRef = useRef();


  const handleAllData = () => {
    setPrelimshow(!prelimshow);
    setJudgeshow(false);
  }

  const handleJudgeData = () => {
    setJudgeshow(!judgeshow);
    setPrelimshow(false);
  }

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

  const handleJudgePrint = useReactToPrint({content: () => judgeRef.current,});
  const handlePrelimPrint = useReactToPrint({content: () => prelimRef.current,});
  

  useEffect(()=>{
    console.log(prelimData, pairMatchesData);
    getAllData();
    getCurrentAdminSettings();

  },[prelimData, pairMatchesData, getPrelimdata, getPairMatchesData])
  


  useEffect(()=>{
    const fetchData = async ()=>{
      const data = await getAllPrelimdata();
      console.log(data);
      const filtered = filterPrelimData(data.prelimData);
      setScores(filtered);
    }

  fetchData();
  },[])

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
      
      <div>
        <button onClick={handleAllData}>{`${prelimshow ? "Hide":"Show Prelim Score"}`}</button>
        <button onClick={handleJudgeData}>{`${judgeshow ? "Hide":"Show Judge Score"}`}</button>
      </div>
      
      <div>
        <div className={`${prelimshow ? "":"dont-show"} prelim-score` }  >
        <div ><button onClick={handlePrelimPrint}>Print</button></div>
          <JudgeScoreTable scores={scores} ref={prelimRef}/>
        </div>
        <div className={`${judgeshow ? "":"dont-show"}  judge-score`} >
        <div ><button onClick={handleJudgePrint}>hello</button></div>
          hello{judgeshow}
        </div>
      </div>

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
