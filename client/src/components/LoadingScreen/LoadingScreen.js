import React from 'react'
import './LoadingScreen.css'
const LoadingScreen = () => {
  return (
    <div className='gif'>
        <div className='gif-container'>
          <img src="video/gavel.gif" alt="" />
          <div className='loading'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
    </div>
  )
}

export default LoadingScreen
