import { useEffect, useState } from "react"
import CurrentRoundHeader from "../components/CurrentRound/CurrentRoundHeader.js"
import Header from "../components/Header/Header.js"
import Leaderboard from "../components/Leaderboard/Leaderboard.js"
import ORSB from "../components/OtherRoundScoreBoard/ORSB.js"
import LoadingScreen from "../components/LoadingScreen/LoadingScreen.js"
import './style.css'
import { httpGetAdminSettings } from "../hooks/requests.js"
import { httpGetPrelimData } from "../hooks/requests.js"
import { getAverageScore,groupPairData } from "../utilities.js"


const Home = (props)=>{
    
    const {currentRound,judgeNumber,prelimData,currRoundPairs,pairMatchesData,getPairMatchesData,getCurrPairMatchesData,getPrelimdata, getPrelimAverage} = props;
    const [data, setData] = useState();
    const [round, setRound] = useState();
    const [judge, setJudge] = useState();



    const fetchPrelim = async (judge)=>{
        const prelimData = await httpGetPrelimData();
        // console.log(prelimData.prelimData,"prelimData");
        if(judge){
            const filtered = getAverageScore(prelimData.prelimData,judge);
            // console.log(filtered,"filtered");
            setData(filtered);
        }
        
    }

    const fetchPairMatches = async (judge,round)=>{
        const currRoundPairs = await getCurrPairMatchesData();
        if(judge){
            // console.log(judge)
            const filter = getAverageScore(currRoundPairs.currRoundPairs,judge);
            const pairs =  groupPairData(filter);
            // console.log(filter,"filter");   
            setData(pairs);
            // console.log(currRoundPairs.currRoundPairs,"currRoundPairs");
            // console.log(pairs,"pairs")
            
        }
       
    }


    useEffect(()=>{
        // console.log(data,"data");   
    },[data])   
    
    
    // useEffect(()=>{
        
    //     // console.log(currentRound,judgeNumber,getPrelimdata,prelimData,getPrelimAverage);
    // },[currentRound,judgeNumber,getPrelimdata,prelimData,getPrelimAverage])
    
    useEffect(()=>{

        const fetchData = async ()=>{
          const roundNo =  await httpGetAdminSettings();
          setRound(roundNo.round);
          setJudge(roundNo.judgeNumber);
        //   console.log(roundNo,"roundNo");
          
          if(roundNo.round == 0 && roundNo.judgeNumber){
           await fetchPrelim(roundNo.judgeNumber);
          }
          else if(roundNo.round != 0 && roundNo.judgeNumber) {
            await fetchPairMatches(roundNo.judgeNumber,roundNo.round);
          }

          
        }

        fetchData();
        const intervalId = setInterval(fetchData, 100000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
    },[])
    
  

    return (
        <div className="home">
            <Header />
            <video className="video" src="video/bg.mp4" autoPlay muted loop />
            <div className="overlay"></div>
            <div className="home-container">
              
                    <CurrentRoundHeader round={round}/>
                    

                        {round && data ? 
                        
                        <>
                        {
                        (round == 0 ) ?<>
                            <Leaderboard scores={data} judgeNumber={judge}/>
                        
                        </> 
                        :
                        <ORSB scores={data} judgeNumber={judge} currentRound={round} />
                        }

                        </> : <LoadingScreen/>}
                                    
                    
                    </div>
                
                
              

        </div>
    )
}

export default Home 