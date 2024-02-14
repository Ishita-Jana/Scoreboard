import React, { useEffect, useState } from 'react'
import TeamsNew from '../Teams/TeamsNew';
import './ORSB.css'

const ORSB = (props) => {

    const {scores,judgeNumber,currentRound} = props;
    // console.log(scores);
    useEffect(()=>{
        // console.log(scores);
    },[scores]);

  

    return (
      <div className='pair-mat'>
        {scores && scores.map(roomData => {
          const courtRoom = Object.keys(roomData)[0];
          const teams = roomData[courtRoom];
          return(
            <div className='pair-row' key={courtRoom}>
            <div className="" ><TeamsNew courtRoom={courtRoom} teams={teams} /></div>
            
            </div>
          )
        })}
      </div>
    );
  }

export default ORSB
