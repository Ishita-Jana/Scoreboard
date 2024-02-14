import React, { useState , useEffect } from 'react'

const ScoreTable = (props) => {

    console.log(props.data);
    const [data, setData] = useState();

    //  data data.map((item)=>{
    //   console.log(item);
    //   console.log(item.TeamId);
    //   console.log(item.Speaker1);
    //   console.log(item.Speaker2);
    //   console.log(item.Average);
    // })

  useEffect(() => {
      // Update local state when props.data changes
      setData(props.data);
    }, [props.data]);

  return (
    <div>
      <div className='container'>
        <div>
            {data ?
                <table>
                    <thead>
                        <tr>
                          <th>Sno.</th>
                          <th>TeamName</th>
                          <th>Speaker1</th>
                          <th>Speaker2</th>
                          <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                     {data!=null &&
                      data.map((item,index)=>{
                        return(
                          <tr>
                            <td>{index}</td>
                            <td>{item.TeamId}</td>
                            <td>{item.Speaker1}</td>
                            <td>{item.Speaker2}</td>
                            <td>{item.Average}</td>
                          </tr>)})}  
                    </tbody>
                </table> : ""}
              </div>
      </div>
    </div>
  )
}

export default ScoreTable
