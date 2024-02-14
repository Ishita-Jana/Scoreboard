import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';


import Home from './Home'
import Admin from './Admin/Admin'
import Judge from './Judge/Judge'

import useData from '../hooks/useData'
import usePairMatchesData from '../hooks/usePairMatchesData'
import usePrelimsData from '../hooks/usePrelimData'


import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import LoginPage from './LoginPage/LoginPage';
import TopScorer from './TopScorer/TopScorer';

const ROLES ={
  admin: 'admin',
  judge: 'judge'

}


const AppLayout = () => {

const {currentRound,judgeNumber,adminLogin,judgeLogin,judgeRegister,getCurrentAdminSettings,setCurrentAdminSettings, getAllData,allData,loginUser} = useData();
const {currRoundPairs,pairMatchesData,getPairMatchesData,submitPairMatchesData,getCurrPairMatchesData} = usePairMatchesData();
const {prelimData,getPrelimdata,getPrelimAverage,submitPrelimData,getAllPrelimdata} = usePrelimsData();


  return (
    <Routes>

        {/*-------------- public routes------------------------*/}
        <Route path="/" element={<Home currentRound={currentRound} judgeNumber={judgeNumber} prelimData={prelimData} currRoundPairs={currRoundPairs} pairMatchesData={pairMatchesData} getPairMatchesData={getPairMatchesData} getCurrPairMatchesData={getCurrPairMatchesData} getPrelimdata={getPrelimdata} getPrelimAverage={getPrelimAverage}  />} />
        
        <Route path="/login" element={<LoginPage  loginUser={loginUser} />} />
        <Route path="/top" element={<TopScorer getPrelimdata={getPrelimdata} />} />


        {/*---------- private routes------------------*/}
        <Route path='/admin'  element={<PrivateRoute allowedRole={ROLES.admin} />}  >
              <Route path="dashboard" element={<Admin currentRound={currentRound} judgeNumber={judgeNumber} allData={allData} getAllData={getAllData} getCurrentAdminSettings={getCurrentAdminSettings} setCurrentAdminSettings={setCurrentAdminSettings} prelimData={prelimData} pairMatchesData={pairMatchesData} getPrelimdata={getPrelimdata} getAllPrelimdata={getAllPrelimdata} getPairMatchesData={getPairMatchesData} getCurrPairMatchesData={getCurrPairMatchesData} />} />
              {/* <Route path="top8" element={<Top8 getPrelimdata={getPrelimdata} />} /> */}
        </Route>

        <Route  path='/judge' element={<PrivateRoute allowedRole={ROLES.judge} />} >
          <Route path='dashboard' element={<Judge currentRound={currentRound} judgeNumber={judgeNumber} submitPairMatchesData={submitPairMatchesData} submitPrelimData={submitPrelimData}  />}/>
        </Route>
        

    </Routes>
    
  )
}

export default AppLayout
