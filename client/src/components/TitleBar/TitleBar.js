import React from 'react'
import './TitleBar.css'

const TitleBar = (props) => {
  return (
    <div className='container'>
      {props.title}
    </div>
  )
}

export default TitleBar
