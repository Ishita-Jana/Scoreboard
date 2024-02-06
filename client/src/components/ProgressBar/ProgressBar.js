import React from 'react'
import './ProgressBar.css'
import styled, {keyframes} from 'styled-components'
 
const ProgressBar = ({bgcolor,progress,height,className}) => {
    

    const Parentdiv = {
        height: "15px",
        width: "auto",
        backgroundColor: "#a1bed6",
        borderRadius: 40,
        transition: 'width 1s ease-in-out',
        // animation: `${generateProgressBarKeyframes()} 10s ease-in-out` 
        
        // border: "2px solid black",
       
      }


     
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        // width: 'var(${progress})',
        backgroundColor: bgcolor,
       borderRadius:40,
        textAlign: 'right',
        transition: 'width 2s ease-in-out',
        // animation: `${generateProgressBarScoreKeyframes} 5s ease-in-out` 
        // border: "2px solid red"
      }
     
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }

      
       
    return (
    <div style={Parentdiv} className='ProgressBar-enter' >
      <div style={Childdiv} className='ProgressBar-score' >
        
      </div>
    </div>
    )
}
 
export default ProgressBar;