import React, { useEffect, useState ,useRef} from 'react'
import JudgeIndividual from '../JudgeIndividual/JudgeIndividual';
import { useReactToPrint } from 'react-to-print';
import './JudgeScore.css';

export const JudgeScoreTable = React.forwardRef((props, ref) => {
    const {scores} = props;
    
    const [data, setData] = useState();
    const [judgeData, setJudgeData] = useState();
    // const individualRef = useRef(); 
    




    useEffect(()=>{
        // console.log(scores);
        setData(scores);
        const d = seeScore();
        setJudgeData(d);
        
    },[scores])


    const seeScore = () => {
        if(scores){
            const requiredata = [];
            Object.keys(scores).map((judge) => {
                const jscore = scores[judge];
                jscore.map((team)=>{
                    requiredata.push(team);
                })   
            });
            // console.log(requiredata);
            return requiredata;
        }
       
     
    }
   

    return(
        <div className='judge-score-table' ref={ref}>
            {judgeData ? 
            <>
                {judgeData.map((team,index)=>{
                    return(
                        <div key={index} >
                         
                         <JudgeIndividual  key={index} round={team.round}  teamCode={team.teamCode} courtRoom={team.courtRoom} scores={team.scores} judgeName={team.judgeName} total={team.total}  />

                        </div>
                    )
                })}
            </>:""  }
           
        </div>
    )
})
