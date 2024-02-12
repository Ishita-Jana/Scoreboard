import React, { useContext, useState } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({allowedRole}) => {
  const {auth} = useAuth();
  const location = useLocation();
  // console.log(auth.role);
  // console.log("allowedRole",allowedRole);
  
  try {
      const authString = localStorage.getItem('auth');
      if(authString === null || authString === "[]"){
      return(<Navigate to="/login" state={{ from: location }} replace />)
      }



    else{
      const authObject = JSON.parse(authString);

         if(authObject!=null && authObject.token){
            if(authObject.role === allowedRole){
              return(<Outlet />)
          }
        }
    
        else {
          return(<div>Unauthorized</div>)
        }
    }
    
      return(<div>Unauthorized</div>)
    
  
  } 
  
  
  
  
  catch (error) {
    
  }
  

  // console.log("Role:", authString,authObject);
  // const token2 = localStorage.getItem('auth');
  // console.log("token2",token2.role,token2.token,token2);
  // 
//   return (
//     auth?.roles?.find(role => allowedRole?.includes(role))
//         ? <Outlet />
//         : auth?.user
//             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//             : <Navigate to="/login" state={{ from: location }} replace />
// );

  
}

export default PrivateRoute
