import React, { useEffect, useState ,useRef} from 'react'
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

import TitleBar from '../../components/TitleBar/TitleBar.js'
import Modal from 'react-modal';
import useModal from '../../components/Modal/useModal.js';
import {PrelimsScoreBoard} from '../../components/PrelimsScoreBoard/PrelimsScoreBoard.js';
import { filterPrelimData, getSpeakerTotal, getTotalScore, groupjudgeData } from '../../utilities.js';
import './Admin.css';
import { JudgeScoreTable } from '../../components/JudgeScoreTable/JudgeScoreTable.js';

const categories = [
  "Appreciation and application of facts",
  "Application of legal principles",
  "Use of authorities and precedents",
  "Presentation skills",
  "Clarity of thoughts and structure of arguments",
  "Poise and demeanour",
  "Court Mannerism",
  "Strategy & Time Management",
  "Knowledge of laws",
  "Response to Forum questions",
];

const Admin = (props) => {

  const {currentRound, judgeNumber,getAllData, getCurrentAdminSettings,setCurrentAdminSettings, prelimData, pairMatchesData, getPrelimdata, getPairMatchesData,getAllPrelimdata,getCurrPairMatchesData} = props;
  const { modalIsOpen, openModal, closeModal, modalMessage, hideButton, setModal } = useModal();
  const [prelimshow, setPrelimshow] = useState(false);
  const [judgeshow, setJudgeshow] = useState(false);
  const [quarterAllshow, setQuarterAllshow] = useState(false);
  const [quarterJudgeshow, setQuarterJudgeshow] = useState(false);
  const [scores, setScores] = useState();
  const [judgeScore, setJudgeScore] = useState();
  const [quarterScores, setQuarterScores] = useState();
  const [quarterJudgeScore, setQuarterJudgeScores] = useState();
  const [data, setData] = useState({
    role: 'admin',
    round: '0',
    judgeNumber: '2',
  });
  const judgeRef = useRef();
  const prelimRef = useRef();
  const quarterRef = useRef();
  const quarterJRef = useRef();
  const navigate = useNavigate();

  const handleAllData = () => {
    setPrelimshow(!prelimshow);
    setJudgeshow(false);
    setQuarterAllshow(false);
    setQuarterJudgeshow(false);
  }

  const handleJudgeData = () => {
    setJudgeshow(!judgeshow);
    setPrelimshow(false);
    setQuarterAllshow(false);
    setQuarterJudgeshow(false);
  }

  const handleQuarterScore=()=>{
    setJudgeshow(false);
    setPrelimshow(false);
    setQuarterAllshow(!quarterAllshow);
    setQuarterJudgeshow(false);
  }
  
  const handleQuarterJudge=()=>{
    setJudgeshow(false);
    setPrelimshow(false);
    setQuarterAllshow(false);
    setQuarterJudgeshow(!quarterJudgeshow);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]:value, 
    }); 
  }



  const handleSubmit = () => {

    if(data.judgeNumber === '' || data.round === '' || data.judgeNumber==0){
      openModal('Fields cannot be blank');
      return;
    }

    // console.log(data);
    setCurrentAdminSettings(data);
    setModal();

  }

  const handleNavigate=()=>{
    navigate('/admin/top');
  }


  
  const handleJudgePrint = useReactToPrint({content: () => judgeRef.current,});
  const handlePrelimPrint = useReactToPrint({content: () => prelimRef.current,});
  const handleQuarterPrint = useReactToPrint({content: () => quarterRef.current,});
  const handleQuarterJudgePrint = useReactToPrint({content: () => quarterJRef.current,});

  

  // useEffect(()=>{
  //   // console.log(prelimData, pairMatchesData);
  //   getAllData();
  //   getCurrentAdminSettings();
  //   getPairMatchesData();
  //   console.log(prelimData, pairMatchesData,"prelimData and pairMatchesData in admin");


  // },[prelimData, pairMatchesData, getPrelimdata, getPairMatchesData])
  


  useEffect(()=>{
    const fetchData = async ()=>{
      const data = await getAllPrelimdata();
      // console.log(data,"data in admin");
      const filtered = filterPrelimData(data.prelimData);
      // console.log(filtered,"filtered in admin")
      const pair = await getCurrPairMatchesData();
      // console.log(pair,"pair in admin");
      const filtered2 = filterPrelimData(pair.currRoundPairs);
      setQuarterScores(filtered2);
      // console.log(filtered2,"filtered in admin");
      setScores(filtered);
      const judge = groupjudgeData(data.prelimData);
      const judge2 = groupjudgeData(pair.currRoundPairs);
      setJudgeScore(judge);
      setQuarterJudgeScores(judge2);


    }

  fetchData();
  },[])

  return (
    <div className='admin-page-container-style'>
      <TitleBar title="Admin" />
      <div className='admin-input'>
        <div className='inputs-admin'>
          <div className='round-input'>
              <select name='round' onChange={handleChange} value={data.round}>
                  <option value="0">Prelimis</option>
                  <option value="1">Quarters</option>
                  <option value="2">Semi-Final</option>
                  <option value="3">Final</option>
              </select>
            </div>
            <div className='judge-input'>
              <label>Enter Judge Number</label>
              <input  type="number" name='judgeNumber' value={data.judgeNumber} onChange={handleChange}  />
            </div>
            <div><button onClick={handleSubmit} className='admin-submit'>Submit</button></div>
        </div>
              {currentRound && currentRound ==0 && <div className='top8-button'><button onClick={handleNavigate}>Show top 8 teams</button></div>}     
          
      </div>
      
      <div className='show-categories'>
        <div className='cat-head'>Categories</div>
        <div className='categories-board'>
           <div>
           
              { categories.slice(0,5).map((cat,index)=>{
              return <p className='cat' key={index}>{`C${index+1}:  `}{cat}</p>
            }) } 
           </div>
           
              <div className='cat-details'>
              { categories.slice(5,10).map((cat,index)=>{
              return <p className='cat' key={index}>{`C${index+1}:  `}{cat}</p>
            }) } 
            </div>
        </div>
        
        <div className='categories-board'>
            
            
          
          
        </div>
      </div>
      <div className='admin-btns'>
        <button onClick={handleAllData}>{`${prelimshow ? "Hide":"Show Prelim Score"}`}</button>
        <button onClick={handleJudgeData}>{`${judgeshow ? "Hide":"Show Judge Score"}`}</button>
        {currentRound && currentRound !=0 && <button onClick={handleQuarterScore}>{`${quarterAllshow ? "Hide":"Show Quater Score"}`}</button>}
        {currentRound && currentRound !=0 && <button onClick={handleQuarterJudge}>{`${quarterJudgeshow ? "Hide":"Show Quarter Judge Score"}`}</button>}
      </div>
      
      <div>
        <div className={`${prelimshow ? "":"dont-show"} prelim-score` }  >
        <div className='print'><button  onClick={handlePrelimPrint}>Print</button></div>
          <PrelimsScoreBoard scores={scores} ref={prelimRef} />
        </div>
        <div className={`${judgeshow ? "":"dont-show"}  judge-score`} >
        <div className='print'><button  onClick={handleJudgePrint}>Print</button></div>
          <JudgeScoreTable ref={judgeRef} scores={judgeScore} />
        </div>
        {
          currentRound && currentRound !=0 && 
          <div className={`${quarterAllshow ? "":"dont-show"} quarter-score` }  >
          <div className='print' ><button  onClick={handleQuarterPrint}>Print</button></div>
            <PrelimsScoreBoard scores={quarterScores} ref={quarterRef} />
          </div>
        }
        {
          currentRound && currentRound !=0 && 
          <div className={`${quarterJudgeshow ? "":"dont-show"} quarter-judge-score`} >
          <div  className='print'><button  onClick={handleQuarterJudgePrint}>Print</button></div>
            <JudgeScoreTable ref={quarterJRef} scores={quarterJudgeScore} />
          </div>
        }
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
