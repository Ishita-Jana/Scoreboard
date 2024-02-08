import React, { useEffect, useState } from 'react'

  

export const JudgeScoreTable = React.forwardRef((props, ref) => {
    const {scores} = props;
    const categories = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
    const [data, setData] = useState();


    useEffect(()=>{
        console.log(scores);
        setData(scores);
    },[scores])
    
    return (
        <div ref={ref}>
            
          <table border={1}>
            <thead>
              <tr>
                <th colSpan={23}>Preliminary Round</th>
              </tr>
              <tr>
                <th>Teams</th>
                <th>Speakers</th>
                <th>Judges</th>
                <th colSpan={20}>Categories</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <React.Fragment>
                    {categories.map((category, index) => {
                        return (
                        <React.Fragment key={index}>
                            <th>{category}</th>
                        </React.Fragment>
                        );
                    })}
                </React.Fragment>
              </tr>
            </thead>
            <tbody>
            {data ? data.map((team)=>{

                return (
                <>
                    <tr >
                        <td rowSpan={4}>{team.teamCode}</td>
                        <td rowSpan={2}>Speaker1</td>
                        <td>{team.judgeScore[0].judgeName}</td>
                        {
                            <React.Fragment>
                                {categories.map((category, index) => {
                                    return(
                                        <React.Fragment key={index}>
                                            <td>{team.judgeScore[0].scores[category].Speaker1}</td>
                                        </React.Fragment>
                                    )
                                })}
                            </React.Fragment>
                        }
                    </tr>
                    <tr >
                        
                        <td>{team.judgeScore[1].judgeName}</td>
                        <React.Fragment>
                            {categories.map((category, index) => {
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
                            {categories.map((category, index) => {
                                return(
                                    <React.Fragment key={index}>
                                        <td>{team.judgeScore[0].scores[category].Speaker2}</td>
                                    </React.Fragment>
                                )
                            })}
                            </React.Fragment>
                    </tr>
                    <tr >
                        
                        <td>{team.judgeScore[1].judgeName}</td>
                        <React.Fragment>
                            {categories.map((category, index) => {
                                return(
                                    <React.Fragment key={index}>
                                        <td>{team.judgeScore[1].scores[category].Speaker2}</td>
                                    </React.Fragment>
                                )
                            })}
                            </React.Fragment>

                    </tr>
                </>
                )
                
            }):""}
        </tbody>
          </table>
        </div>
      );
})


