import { useEffect, useState } from "react"
import CurrentRoundHeader from "../components/CurrentRound/CurrentRoundHeader.js"
import Header from "../components/Header/Header.js"
import Leaderboard from "../components/Leaderboard/Leaderboard.js"
import ORSB from "../components/OtherRoundScoreBoard/ORSB.js"
import './style.css'
import { httpGetAdminSettings } from "../hooks/requests.js"
import { httpGetPrelimData } from "../hooks/requests.js"
import { getAverageScore } from "../utilities.js"


const Home = (props)=>{
    
    const {currentRound,judgeNumber,prelimData,currRoundPairs,pairMatchesData,getPairMatchesData,getCurrPairMatchesData,getPrelimdata, getPrelimAverage} = props;
    const [data, setData] = useState();
    const [round, setRound] = useState();
    const [judge, setJudge] = useState();
    // console.log(currentRound);
    // console.log(judgeNumber);
    // console.log(prelimData);
     
    
    useEffect(()=>{

        const fetchData = async ()=>{
          const roundNo =  await httpGetAdminSettings();
          console.log(roundNo);
          setRound(roundNo.round);
          setJudge(roundNo.judgeNumber);
          const prelimData = await httpGetPrelimData();
          console.log(prelimData.prelimData);
          const filtered = getAverageScore(prelimData.prelimData,roundNo.judgeNumber);
          console.log(filtered);
          setData(filtered);
        }

        fetchData();
    },[])
    
    return (
        <div>
            <Header />
            <video src="video/bg.mp4" autoPlay muted loop />
            <div className="overlay"></div>
            <div className="home-container">
              
                    <CurrentRoundHeader round={currentRound}/>
                    {
                        round==0 && data ? 
                        <div>
                            
                        <Leaderboard scores={data} judgeNumber={judge}/>
                        </div> : "Loading..."}




                        {/* {
                            (currentRound != 0  && pairMatchesData.length != 0) ?

                            <div> 
                            
                            <ORSB scores={pairMatchesData} judgeNumber={judgeNumber} currentRound={currentRound} />
                            </div> : "Score not available"
                        } */}
                       
                    
                    
                    </div>
                
                
              

        </div>
    )
}

export default Home 