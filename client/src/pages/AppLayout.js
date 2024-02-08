import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';


import Home from './Home'
import AdminLogin from './Admin/AdminLogin'
import Admin from './Admin/Admin'
import JudgeLogin from './Judge/JudgeLogin'
import Judge from './Judge/Judge'

import useData from '../hooks/useData'
import usePairMatchesData from '../hooks/usePairMatchesData'
import usePrelimsData from '../hooks/usePrelimData'
import JudgeRegister from './Judge/JudgeRegister';



const AppLayout = () => {

const {currentRound,judgeNumber,adminLogin,judgeLogin,judgeRegister,getCurrentAdminSettings,setCurrentAdminSettings, getAllData,allData,} = useData();
const {currRoundPairs,pairMatchesData,getPairMatchesData,submitPairMatchesData,getCurrPairMatchesData} = usePairMatchesData();
const {prelimData,getPrelimdata,getPrelimAverage,submitPrelimData} = usePrelimsData();


  return (
    <Routes>
        <Route path="/" element={<Home currentRound={currentRound} judgeNumber={judgeNumber} prelimData={prelimData} currRoundPairs={currRoundPairs} pairMatchesData={pairMatchesData} getPairMatchesData={getPairMatchesData} getCurrPairMatchesData={getCurrPairMatchesData} getPrelimdata={getPrelimdata} getPrelimAverage={getPrelimAverage}  />} />
        <Route path="/login/admin" element={<AdminLogin AdminLogin={adminLogin} />} />
        <Route path="/login/judge" element={<JudgeLogin JudgeLogin={judgeLogin}  />} />
        <Route path="/register/judge" element={<JudgeRegister JudgeRegister={judgeRegister} />} />
        <Route path="/admin/home" element={<Admin 
        currentRound={currentRound} 
        judgeNumber={judgeNumber}
        allData={allData}
        getAllData={getAllData}
        getCurrentAdminSettings={getCurrentAdminSettings}
        setCurrentAdminSettings={setCurrentAdminSettings} 
        prelimData={prelimData}
        pairMatchesData={pairMatchesData} 
        getPrelimdata={getPrelimdata} 
        getPairMatchesData={getPairMatchesData} />} />
        <Route path="/judge/home" element={<Judge currentRound={currentRound} judgeNumber={judgeNumber} submitPairMatchesData={submitPairMatchesData} submitPrelimData={submitPrelimData}  />} />
      </Routes>
    
  )
}

export default AppLayout
