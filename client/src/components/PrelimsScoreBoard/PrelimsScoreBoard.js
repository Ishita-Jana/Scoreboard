import React, { useEffect, useState } from 'react'
import './PrelimsScore.css';
  

export const PrelimsScoreBoard = React.forwardRef((props, ref) => {
    const {scores} = props;
    const categories = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
    const rounds = [
        'Preliminary Round',
        'Quater Finals',
        'Semi Final',
        'Final'
    ]
    const [data, setData] = useState();
    const [round, setRound] = useState();


    useEffect(()=>{
        console.log(scores);
        if(scores){
            console.log("seting data");
            setData(scores);
            if(scores[0]){
                console.log(scores[0].round);
                setRound(rounds[scores[0].round]);
            }
           
            
        }
       
     
    },[scores])
    
    return (
        <div ref={ref} className='prelims-score-table'>
            {scores  ? <table  border={1}>
            <thead>
              <tr key={0}>
                <th className='table-head-text' colSpan={24}>{round}</th>
              </tr>
              <tr key={1}>
                <th>Teams</th>
                <th>Speakers</th>
                <th>Judges</th>
                <th colSpan={10}>Categories</th>
                <th className='total-edit'>Total</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <React.Fragment>
                    {categories.map((category,index) =>{
                        return (
                        <React.Fragment key={index}>
                            <th key={index}>{category}</th>
                        </React.Fragment>
                        );
                    })}
                </React.Fragment>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {data ? data.map((team,index)=>{
                return (
                <React.Fragment key={index}>
                    <tr>
                    <td className='text-edit' rowSpan={4}>{team.teamCode}</td>
                        <td rowSpan={2}>Speaker1</td>
                        <td>{team.judgeScore[0].judgeName}</td>
                        {<React.Fragment>
                                {categories.map((category,index)=>{
                                    return(
                                        <React.Fragment key={index}>
                                            <td >{team.judgeScore[0].scores[category].Speaker1}</td>
                                        </React.Fragment>
                                    )
                                })}
                            </React.Fragment>}
                        <td className='totalS1-edit' rowSpan={2}>{team.speakerTotal.Speaker1}</td>
                    </tr>
                    <tr>   
                        <td>{team.judgeScore[1].judgeName}</td>
                        <React.Fragment>
                            {categories.map((category,index)=>{
                                return(
                                    <React.Fragment key={index}>
                                        <td>{team.judgeScore[1].scores[category].Speaker1}</td>
                                    </React.Fragment>
                                )
                            })}
                        </React.Fragment>
                    </tr>
                    <tr>
                        <td rowSpan={2}>Speaker2</td>
                        <td>{team.judgeScore[0].judgeName}</td>
                        <React.Fragment>
                            {categories.map((category,index)=>{
                                return(
                                    <React.Fragment key={index}>
                                        <td>{team.judgeScore[0].scores[category].Speaker2}</td>
                                    </React.Fragment>
                                )
                            })}
                            </React.Fragment>
                            <td className='totalS2-edit' rowSpan={2}>{team.speakerTotal.Speaker2}</td>
                    </tr>
                    <tr>
                        <td>{team.judgeScore[1].judgeName}</td>
                        <React.Fragment>
                            {categories.map((category,index)=>{
                                return(
                                    <React.Fragment key={index}>
                                        <td>{team.judgeScore[1].scores[category].Speaker2}</td>
                                    </React.Fragment>
                                )
                            })}
                            </React.Fragment>
                            </tr>
                </React.Fragment>
                );
            }):""}
        </tbody>
          </table>:""}
          
        </div>
      );
})


