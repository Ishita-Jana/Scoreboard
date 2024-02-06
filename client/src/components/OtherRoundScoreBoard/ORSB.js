import React, { useEffect, useState } from 'react'
import TeamsNew from '../Teams/TeamsNew';
import './ORSB.css'

const ORSB = (props) => {

    const {scores,judgeNumber,currentRound} = props;
    console.log(scores);
    useEffect(()=>{
        console.log(scores);
    },[scores]);

  return (
    <div className='teams-page-container'>
        
        {scores ? <div className={`${currentRound == 3 ? "list-final":"list"} `}>


          {Object.entries(scores).map(([courtRoom, items]) => {
            // {console.log(courtRoom,items.length,judgeNumber,items)}
            if(items.length == judgeNumber){
              return (
                <div key={courtRoom} className='TeamsNew'>
                  <TeamsNew key={courtRoom} courtRoom={courtRoom} judgeNumber={judgeNumber} details={items} />
                </div>     
              )
            }
          })
          }
           
            

        </div>:"Elimination Round havenot started yet"}
      </div>
      
  )
}

export default ORSB
