import React, { useState } from 'react'
import Login from '../../components/Login/Login'
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginPage.css'

const LoginPage = (props) => {


    const {auth,setAuth} = useAuth();
    const {loginUser} = props;
   
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
      });
      
      
      const handleInputChange = (name, value) => {
        setLoginData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const onSubmit= async()=>{

        try {
        if(loginData.username==='' || loginData.password===''){
            alert('Please fill in all fields');
            return;
          }
          console.log(loginData.username, loginData.password);
        //   console.log(auth);
          const response = await loginUser(loginData);
          // console.log(response);
          const {role,token,ok,message} = response;
          // console.log(role,token,ok,message);
          setAuth({ role:role, token:token})
          if (localStorage.getItem('auth')){
            localStorage.removeItem('auth');
          }

          localStorage.setItem('auth', JSON.stringify({ role:role, token:token}));
          setLoginData({username:'',password:''});
        //   console.log(auth);
        //   console.log(from);
          if(role ==='admin') {
            navigate('/admin/dashboard', { replace: true });
          }
          else if(role==='judge') {
            navigate('/judge/dashboard', { replace: true });
          }
          else {
            navigate('/login', { replace: true });
          }
            
        } catch (error) {
            console.log(error);
            console.log('Login Failed');
        }

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

export default LoginPage
