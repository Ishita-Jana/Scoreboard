import React from 'react'
import './Login.css'

const Login = (props) => {

    const {onInputChange,onSubmit, username,password} = props;
    const handleChange = (e) => {
        // Call the onInputChange function provided as a prop
        onInputChange(e.target.name, e.target.value);
      };

    
    const handleSubmit=(e)=>{
      e.preventDefault();
        onSubmit();
    }

    document.body.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          onSubmit();
        }
      });


  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <div className='login-head'>
           <span className='role-head'>Login</span>
           <p className='dash'></p>
        </div>
        
            <div className='user-box'>
                <input type="text" name='username' onChange={handleChange} value={username} autoComplete='off' required />
                <label htmlFor="">Username</label>
            </div>
            <div className='user-box'>
                <input type="password" name='password' onChange={handleChange} value={password} autoComplete='off' required />
                <label htmlFor="">Password</label>
            </div>
            <span onClick={handleSubmit} >
                {/* <input type="checkbox" id='chk' /> */}
                <button type='submit'>Login</button>
            </span>

       
            </form>
    </div>
  )
}

export default Login
