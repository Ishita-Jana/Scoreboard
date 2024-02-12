import React from 'react'
import './TitleBar.css'

const TitleBar = (props) => {


  const handleLogOut =()=>{
    localStorage.removeItem('auth');
    window.location.href = '/login';
  }

  return (
    <div className='title-bar-container'>
      <img src="/img/mcclogo.jpg" alt=""  className='title-bar-img' />
      <div className='title-bar-text'>{props.title}</div>
      <button onClick={handleLogOut} className='logout-button-t'>Logout</button>

    </div>
  )
}

export default TitleBar
