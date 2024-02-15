import React from 'react'
import '../JudgeScoreTable/JudgeScore.css';
import './JudgeIndividual.css';

const rounds = [
    'Preliminary Round',
    'Quater Finals',
    'Semi Final',
    'Final'
]
const JudgeIndividual = (props) => {

    const {judgeName,teamCode,scores,round,courtRoom,total} = props;
    let fj = judgeName.charAt(0).toUpperCase() + judgeName.slice(1);

  return (
        <>
        {scores ?
        <div className='j-table-con'>
<table border={1} className='judge-table'>
           <thead>
               <tr>
                <th colSpan={3}>{fj}</th>
               </tr>
               <tr>
                <th colSpan={3}>{rounds[round]}</th>
               </tr>
               <tr>
                <th colSpan={3}>Court Room : {courtRoom}</th>
               </tr>
               <tr>
                <th colSpan={3}>Team Code: {teamCode}</th>
               </tr>
               <tr>
                <th></th>
                <th colSpan={2}>Marks</th> 
               </tr>
               <tr>
               <th>Categories</th>
                <th>Speaker1</th>
                <th>Speaker2</th>
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
               <tr className='t-judge'>
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
