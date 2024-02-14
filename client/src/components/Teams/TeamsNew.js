import React, { useEffect, useRef, useState } from 'react'
import Confetti from 'js-confetti'
import './Teams.css'
import { getAverageScore } from '../../utilities';
const TeamsNew = (props) => {

  const {courtRoom,teams} = props;

  const [calculatedData, setCalculatedData] = useState();
  const [winnerTeam, setWinnerTeam] = useState("");
  // const [number, setNumber] = useState("");
  const winnerRef = useRef();
  let number;
  if(courtRoom){
    number = courtRoom.split("-")[1];
  }


  // console.log("winner", winnerTeam);
  // console.log(teams,"teams in TeamsNew")
 
  useEffect(() => {
    const getWinner = () => {
      if (teams && teams[1] && teams[0].Total > 0 && teams[1].Total > 0) {
      // console.log(teams,teams[0].Total,teams[1].Total,"teams in getWinner");

        if (teams[0].Total > teams[1].Total) {
          setWinnerTeam("team1");
        } else if(teams[0].Total < teams[1].Total) {
          setWinnerTeam("team2");
        }
        else{
          setWinnerTeam("draw");
        }
      }
    };

    const timer = setTimeout(() => {
      getWinner();
    }, 3000); // Delay setting winner class by 2 seconds

    return () => clearTimeout(timer); // Clean up the timer when component unmounts or when teams change

  }, [teams]);


  useEffect(() => {
    // Trigger confetti effect when winner is determined
    if (winnerTeam === 'team1' || winnerTeam === 'team2') {
      const confetti = new Confetti();
      confetti.addConfetti({
        elementId: winnerRef.current.getElementsByClassName('teams-container')[0],
        width: 200,
        height: 200,
        confettiNumber: 100,
        confettiColors: ['#ff0000', '#00ff00', '#0000ff'], // Customize confetti colors
        confettiSize: 0.5, 
        // emojis: ['🎉', '🎊', '🏅','🏆' ], 
        emojiSize: 20,

      });
    }
  }, [winnerTeam]);

  

  return (
    <>
    {teams && teams[1] ? 
      <div className='pair'>
          <div className='court-room-number'>Court Room :{number}</div>
          <div className='teams-container'>
              <div className={`teams-details team-red team1 ${ winnerTeam == "team1" ? "winner" :""} ${winnerTeam == "team2" ? "not-winner":"" } ${winnerTeam == "draw" ? "draw":"" } `}  ref={winnerRef}>
                <div className='inside-div'>
                    <div className=' new-card' >
                        {/* <img src='img/group.png' className='team-avatar common-style-team'/> */}
                        <div className='team-name-elim common-style-team'>
                          {teams[0].teamCode}
                        </div>
                        <div className='common-style-team'>
                          {teams[0].Total}
                        </div>
                    </div>
                    <div className={`${winnerTeam == "team1" ? " " : "not-winner-overlay"}`}></div>
                </div>
                        
              </div>
              <span className='v'>VS</span>
              
              <div className={`teams-details team-blue team2 ${ winnerTeam == "team2" ? "winner" :""} ${winnerTeam == "team1" ? "not-winner":"" }  ${winnerTeam == "draw" ? "draw":"" }` } ref={winnerRef}>
               
                <div className=' new-card' >
                    {/* <img src='img/group.png' className='team-avatar common-style-team'/> */}
                    <div className='team-name-elim common-style-team'> 
                      {teams[1].teamCode}
                    </div>
                    <div  className='common-style-team'>
                    {teams[1].Total}
                    </div>
                </div>
                <div className={`${winnerTeam == "team2" ? " " : "not-winner-overlay"}`}></div>
                      
              </div> 
          </div>
      </div>:""
    }
    </>
  )
}

export default TeamsNew
