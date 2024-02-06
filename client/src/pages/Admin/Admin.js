import React, { useEffect, useState } from 'react'

import Header from '../../components/Header/Header'
import TitleBar from '../../components/TitleBar/TitleBar.js'

const Admin = (props) => {

  const {currentRound, judgeNumber,getAllData, getCurrentAdminSettings,setCurrentAdminSettings, prelimData, pairMatchesData, getPrelimdata, getPairMatchesData} = props;
  const [data, setData] = useState({
    role: 'admin',
    round: '',
    judgeNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]:value,
    }); 

    console.log(data);
  }

  const handleSubmit = () => {
    if(data.judgeNumber === '' || data.round === ''){
      alert('Please fill in all fields');
      return;
    }
    setCurrentAdminSettings(data);

  }

  useEffect(()=>{
    getAllData();
    getCurrentAdminSettings();
  },[prelimData, pairMatchesData, getPrelimdata, getPairMatchesData])
  

  return (
    <div className='admin-page-container-style'>
      <TitleBar title="Admin"/>
      <div className='admin-input'>
          <div className='round-input'>
            <select name='round'>
                <option value="0">Prelimis</option>
                <option value="1">Elimination</option>
                <option value="2">Semi-Final</option>
                <option value="3">Final</option>
            </select>
          </div>
          <div className='judge-input'>
            <label>Enter Judge Number</label>
            <input  type="number" value={data.judgeNumber} onChange={handleChange}  />
          </div>
          <div><button onClick={handleSubmit}>Submit</button></div>
      </div>
      

      
      
      
      
      
    </div>
  )
}

export default Admin
