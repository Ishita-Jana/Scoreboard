import React, { useEffect, useState } from 'react'
import './Teams.css'
import { getTotalScore } from '../../utilities';
const TeamsNew = (props) => {

  const {courtRoom,details,judgeNumber} = props;

  const [calculatedData, setCalculatedData] = useState();
  const [winnerTeam, setWinnerTeam] = useState();
 

  const destructuringData = (teamsScore) => {

    const teams = []
      teamsScore.map((key)=>{
        if(key.judgeScore && key.judgeScore.length == judgeNumber){
            const teamData = getTotalScore(key.judgeScore);
            // console.log(teamData);
            const Average = ((teamData.Speaker1 + teamData.Speaker2)/(2*judgeNumber)).toFixed(2);
            const details = {
              teamCode: key.teamCode,
              average : Average,
            }
            teams.push(details);

            
        }
      })

      // console.log(teams);
      if(teams.length == judgeNumber){
        setCalculatedData(teams);
        if(teams[0].average > teams[1].average){
          setWinnerTeam("team1");
        }else{
          setWinnerTeam("team2");
        }
      }
  }

  useEffect(()=>{
 
    if(details){
      destructuringData(details);
    }
  },[details]);

  

  return (
    <>
    {calculatedData ? 
      <div className='pair'>
          <div className='court-room-number'>Court Room :{courtRoom}</div>
          <div className='teams-container'>
              <div className={`teams-details team-red team1 ${winnerTeam == "team1" ? "winner" : "not-winner"}`}>
                <div className='inside-div'>
                    <div className=' new-card' >
                        <img src='img/group.png' className='team-avatar common-style-team'/>
                        <div className='team-name-elim common-style-team'>
                          {calculatedData[0].teamCode}
                        </div>
                        <div className='common-style-team'>
                          {calculatedData[0].average}
                        </div>
                    </div>
                    <div className={`${winnerTeam == "team1" ? " " : "not-winner-overlay"}`}></div>
                </div>
                <span className='v'>V</span>        
              </div>
              <div className={`teams-details team-blue team2 ${winnerTeam == "team2" ? "winner" : "not-winner"}`}>
                <span className='s'>S</span> 
                <div className=' new-card' >
                    <img src='img/group.png' className='team-avatar common-style-team'/>
                    <div className='team-name-elim common-style-team'> 
                      {calculatedData[1].teamCode}
                    </div>
                    <div  className='common-style-team'>
                    {calculatedData[1].average}
                    </div>
                </div>
                <div className={`${winnerTeam == "team2" ? " " : "not-winner-overlay"}`}></div>
                      
              </div> 
          </div>
      </div>:"Loading..."
    }
    </>
  )
}

export default TeamsNew
