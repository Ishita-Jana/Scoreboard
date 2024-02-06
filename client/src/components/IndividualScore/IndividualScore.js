import React from 'react'
import Progressbar from "../ProgressBar/ProgressBar.js"
import './IndividualScore.css'

const IndividualScore = (props) => {

  return (
    <div  className='progress-container'>
        <div className='details-enter score-details'>
            <div  className='rankStyle'><div className='rank'>{props.rank}</div></div>
            <div  className='nameStyle'>{props.teamName}</div>
            <div className='progress-bar-div'><Progressbar
                bgcolor= "#3B837A"
                progress= {props.score}
                height={10}
                className='ProgressBar-enter'/></div>
            
            <div  className='score-style'>{props.score}</div>
         
        </div>  
    </div>
  )
}

export default IndividualScore
