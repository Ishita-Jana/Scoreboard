import React from 'react'
import '../JudgeScoreTable/JudgeScore.css';

const rounds = [
    'Preliminary Round',
    'Quater Finals',
    'Semi Final',
    'Final'
]
const JudgeIndividual = (props) => {

    const {judgeName,teamCode,scores,round,courtRoom,total} = props;

  return (
        <>
        {scores ?
        <div >
<table border={1} className='judge-table'>
           <thead>
               <tr>
                <th></th>
                <th colSpan={2}>{judgeName}</th>
               </tr>
               <tr>
                <th></th>
                <th colSpan={2}>{rounds[round]}</th>
               </tr>
               <tr>
                <th></th>
                <th colSpan={2}>{courtRoom}</th>
               </tr>
               <tr>
                <th></th>
                <th colSpan={2}>{teamCode}</th>
               </tr>
               <tr>
                <th></th>
                <th>Speaker1</th>
                <th>Speaker2</th>
               </tr>
               <tr>
                <th>Categories</th>
                <th colSpan={2}>Marks</th> 
               </tr>
           </thead>
           <tbody>
               <React.Fragment>
               {Object.keys(scores).map((key,index)=>{
                   return (
                       <tr key={index}>
                        <td>{key}</td>
                        <td>{scores[key].Speaker1}</td>
                        <td>{scores[key].Speaker2}</td>
                </tr>)
               })}
               </React.Fragment>
               <tr className='total-score-table'>
                <td>Total</td>
                <td>{total.Speaker1}</td>
                <td>{total.Speaker2}</td>
               </tr>
           </tbody>
         </table>
         </div> : ""}
        </>
      );
}

export default JudgeIndividual
