import React, { useEffect, useState } from 'react'
import './Leaderboard.css'
import IndividualScore from '../IndividualScore/IndividualScore.js'


const Leaderboard = (props) => {

  const {scores,judgeNumber} = props;
  const [sortedData,setSortedData] = useState();



useEffect(()=>{
  console.log(scores);
  if(scores){
    const hasTotal = scores.some(team => 'Total' in team);
    if(hasTotal){
      const sortedScoreData = scores.slice().sort((a, b) => (b.Total - a.Total));
      setSortedData(sortedScoreData);
    }

   
   
    // console.log(sortedScoreData);
  }
  

},[scores,judgeNumber]);
    

  return (
    <div className='leaderboardContainer'>
      <div className='leaderboardHead'>Scoreboard</div>
      
      <div className='teams-score score-holder'>
      {
        sortedData ? <><div className='first14' >   
         {sortedData.slice(0,14).map((data,index)=>{
            return(
              data.Total ? 
                <div key={index} >
               
                    <IndividualScore  rank={index+1} teamName={data.teamCode}  score={(data.Total)}/>
                </div> : ""
            )
        })}

        </div>


         <div className='remaining' >   
         {sortedData.slice(14).map((data,index)=>{
            return(
              data.Total ? 
                <div key={index} >
                  
                    <IndividualScore  rank={index+15} teamName={data.teamCode}  score={(data.Total/(2*judgeNumber)).toFixed(2)}/>
                </div> : ""
            )
        })}
         </div></>
         
          :""
    
      }
      </div>
      
    </div>
  )
}

export default Leaderboard
