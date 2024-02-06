import { useEffect, useState } from "react"
import CurrentRoundHeader from "../components/CurrentRound/CurrentRoundHeader.js"
import Header from "../components/Header/Header.js"
import Leaderboard from "../components/Leaderboard/Leaderboard.js"
import ORSB from "../components/OtherRoundScoreBoard/ORSB.js"
import './style.css'
const Home = (props)=>{
    
    const {currentRound,judgeNumber,prelimData,currRoundPairs,pairMatchesData,getPairMatchesData,getCurrPairMatchesData} = props;
    const [scores,setScores] = useState();
    const [hasTotal,setHasTotal] = useState(false);
    console.log(judgeNumber);
    
    useEffect(()=>{

        
        
        console.log(judgeNumber)
        if (currentRound === 0 && prelimData && judgeNumber!=null && judgeNumber !== 0) {
            setScores(prelimData);
          }
      
          if (currentRound!= null && currentRound !== 0 && judgeNumber!=null && judgeNumber !== 0) {
            console.log(currentRound,judgeNumber);   
            const data = getCurrPairMatchesData(currentRound,judgeNumber);
          }
    
    },[currentRound,prelimData,judgeNumber,pairMatchesData])

    

   

    useEffect(()=>{
        setScores(currRoundPairs);
    },[currRoundPairs])

    
    useEffect(()=>{
        console.log("scores",scores);
        if(currentRound == 0 && scores){
            const hasdata = scores.length;
            console.log(scores.length);
        }
        
        // const hasTotal = Array.isArray(scores) && scores.length > 0 && scores.some(team => 'Total' in team);
        // if(hasTotal){
        //     setHasTotal(true);
        // }
    },[scores])
    

   

    return (
        <div>
            <Header />
            <video src="video/bg.mp4" autoPlay muted loop />
            <div className="overlay"></div>
            <div className="home-container">
                
                    <CurrentRoundHeader round={currentRound}/>
                    {
                    ((currentRound != null)  && (currentRound === 0) && scores && (scores.length > 0) && (judgeNumber!=null) && (judgeNumber!=0)) ? 
                        <div>
                            <Leaderboard scores={scores} judgeNumber={judgeNumber}/>
                        </div> 
                        
                        : 
                        
                        <div>
                        {
                            ((currentRound != null) && currentRound != 0 && scores && judgeNumber) ?

                            <div> 
                            
                            <ORSB scores={scores} judgeNumber={judgeNumber} currentRound={currentRound} />
                            </div> : "Loading..."
                        }
                        </div>
                    }
                    
                    </div>
                
                

        </div>
    )
}

export default Home 