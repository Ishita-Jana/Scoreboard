import React from 'react'

const Register = (props) => {
    const {onInputChange,onSubmit, username,password} = props;
    const handleChange = (e) => {
        // Call the onInputChange function provided as a prop
        onInputChange(e.target.name, e.target.value);
      };

    const handleSubmit=()=>{
        onSubmit();
    }



  return (
    <div className='login-container'>
        <div className='login-head'>
           <span className='role-head'>Register</span>
           <p className='dash'></p>
        </div>
        
            <div className='user-box'>
                <input type="text"name='username' onChange={handleChange} value={username} autoComplete='off' required />
                <label htmlFor="">Username</label>
            </div>
            <div className='user-box'>
                <input type="password"name='password' onChange={handleChange} value={password} autoComplete='off' required />
                <label htmlFor="">Password</label>
            </div>
            <span onClick={handleSubmit}>
                {/* <input type="checkbox" id='chk' /> */}
                <label>Register</label>
            </span>

       
      
    </div>
  )
}

export default Register
