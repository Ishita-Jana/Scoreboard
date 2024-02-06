import React, { useState } from 'react'
import Login from '../../components/Login/Login'

const OperatorLogin = (props) => {

    const {JudgeLogin} = props;
    const [loginData, setLoginData] = useState({
        role: 'Judge',
        username: '',
        password: '',
      });

    const handleInputChange = (name, value) => {

    console.log(loginData.username, loginData.password);
    setLoginData((prev) => ({
        ...prev,
        [name]: value,
    }));
    };

    const onSubmit=()=>{
      if(loginData.username==='' || loginData.password===''){
        alert('Please fill in all fields');
        return;
      }

     JudgeLogin(loginData.username,loginData.password);       
    }

  return (
    <div className='login-page'>
    <form action="">
      <Login 
      role={loginData.role} 
      onInputChange={handleInputChange}
      onSubmit={onSubmit}
      username={loginData.username}
      password={loginData.password} />
     
    </form>
    
  </div>
  )
}

export default OperatorLogin
