import React, { useCallback, useEffect, useState } from 'react'
import {
    httpAdminLogin,
    httpJudgeLogin,
    httpJudgeRegister,
} from "./requests"


const useUserData = () => {
    const [currentRound, setCurrentRound] = useState('Semi');
    const [allData, setAllData] = useState();

    const adminLogin = useCallback(async (username, password) => {
        // const adminLoginData = await httpAdminLogin(username, password);
        // console.log(adminLoginData);
        console.log(username,password);
        
    })
    
   

   const judgeRegister = useCallback( async(username, password) => {
        const response = await httpJudgeRegister(username, password);
      });

    const judgeLogin = useCallback( async(username, password) => {
        const response = await httpJudgeLogin(username, password);
        
    })

  
    // useEffect(()=>{
    //   getCurrentRound();
    //   getAllData();
    // },[])

  return {
    adminLogin,
    judgeLogin,
    judgeRegister
    
  }
}

export default useUserData
