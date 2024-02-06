import React, { useState } from 'react'
import Register from '../../components/Register/Register';

const JudgeRegister = () => {
 
    const [registerData, setRegisterData] = useState({
        role: 'Judge',
        username: '',
        password: '',
      });

    const handleInputChange = (name, value) => {

    console.log(registerData.username, registerData.password);
    setRegisterData((prev) => ({
        ...prev,
        [name]: value,
    }));
    };

    const onSubmit=()=>{
      if(registerData.username==='' || registerData.password===''){
        alert('Please fill in all fields');
        return;
      }
      JudgeRegister(registerData.username,registerData.password);       
    }

  return (
    <div className='login-page'>
    <form action="">
      <Register
      role={registerData.role} 
      onInputChange={handleInputChange}
      onSubmit={onSubmit}
      username={registerData.username}
      password={registerData.password} />
     
    </form>
    
  </div>
  )
}

export default JudgeRegister
