import React, { useState } from 'react'
import Login from '../../components/Login/Login'
import useAuth from '../../hooks/useAuth';
import {useNavigate } from 'react-router-dom';
import useModal from '../../components/Modal/useModal.js';
import './LoginPage.css'
import Modal from 'react-modal';

const LoginPage = (props) => {


    const { modalIsOpen, openModal, closeModal, modalMessage, hideButton} = useModal();
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
            // alert('Please fill in all fields');
            openModal('Please fill in all fields');
            // console.log('Please fill in all fields');
            return;
          }
          // console.log(loginData.username, loginData.password);
        //   console.log(auth);
          const response = await loginUser(loginData);
          // console.log(response);
          if(!response){
            openModal('Username or password not correct');
          }
          
          if(response){
              const {role,token} = response;
              // console.log(role,token);
              setAuth({ role:role, token:token})
              if (localStorage.getItem('auth')){
                localStorage.removeItem('auth');
              }

            localStorage.setItem('auth', JSON.stringify({ role:role, token:token}));
            setLoginData({username:'',password:''});
              if(role ==='admin') {
                navigate('/admin/dashboard', { replace: true });
              }
              else if(role==='judge') {
                navigate('/judge/dashboard', { replace: true });
              }
          }
          
          
          else {
            navigate('/login', { replace: true });
          }
            
        } catch (error) {
            console.log(error);
            // console.log('Login Failed');
        }

      }
    
    
      return (
       
        <div className='login-page'>
          <div className='bg-image'>
            <div className='log-con'>
              
              <Login 
              
              onInputChange={handleInputChange}
              onSubmit={onSubmit}
              username={loginData.username}
              password={loginData.password} />
              
              
            </div>
          
          </div>
          <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-judge"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          {/* {console.log(modalMessage)} */}
          <p>{modalMessage}</p>
          <button className={`${hideButton ? "hide-close-button" : ""}`} onClick={closeModal}>Close</button>
        </div>
      </Modal>
          
        </div>
        
      )
}

export default LoginPage
