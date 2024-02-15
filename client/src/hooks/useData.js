import React, { useEffect,useState,useCallback } from 'react'
import { httpGetAllData, httpGetAdminSettings,httpGetPrelimData,httpSetAdminSettings,httpGetPairMatchesData,httpAdminLogin,httpJudgeLogin,httpJudgeRegister,httpLogin } from './requests'

const useData = () => {
    const [currentRound, setCurrentRound] = useState();
    const [judgeNumber,setJudgeNumber] = useState();
    const [allData, setAllData] = useState({});



    // const adminLogin= useCallback(async (username, password) => {
    //     const response = await httpAdminLogin(username, password);
    //     if(response.ok){
    //         return {
    //             token: response.token,
    //             ok: true,
    //             message: "Admin Login Successful"
    //         }
    //     }
    // },[]);

    // const judgeLogin = useCallback(async (username, password) => { 
    //     const response = await httpJudgeLogin(username, password);
    //     if(response.ok){
    //         return {
    //             ok: true,
    //             message: "Judge Login Successful"
    //         }
    //     }
    // },[]);

    // const judgeRegister = useCallback(async (username, password) => {
    //     const response = await httpJudgeRegister(username, password);
    //     if(response.ok){
    //         return {
    //             ok: true,
    //             message: "Judge Registration Successful"
    //         }
    //     }
    // },[]);


   
    const loginUser = useCallback(async (data) => {
        // console.log("inside login")
        const response = await httpLogin(data);
        if(response && response.ok){
            return {
                role : response.role,
                token: response.token,
                ok: true,
                message: "Login Successful"
            }
        }
    })

    // const userLogin = useCallback(async(data)=>{
    //     const response = await httpLogin(data);{
    //         if(response.ok){
    //             return {
    //                 role: response.role,
    //                 token: response.token,
    //                 ok: true,
    //                 message: "Login Successful"
    //             }
    //         }
    //     }
    // })


    const getCurrentAdminSettings = useCallback(async () => {
        const fetchCurrentRound = await httpGetAdminSettings();
        setCurrentRound(fetchCurrentRound.round);
        setJudgeNumber(fetchCurrentRound.judgeNumber);
        if(fetchCurrentRound.round && fetchCurrentRound.judgeNumber){
            return{
                round: fetchCurrentRound.round,
                judgeNumber: fetchCurrentRound.judgeNumber
            }
        }
    },[currentRound,judgeNumber]);






    const setCurrentAdminSettings = useCallback(async (data) => {
        const response = await httpSetAdminSettings(data);
        if(response.ok){
          await getCurrentAdminSettings();
           return {
                ok: true,
                message: "Settings Updated"
           }
        }
    },[]);


    const getAllData = useCallback(async () => {
        const prelimsData = await httpGetPrelimData();
        const pairMatchesData = await httpGetPairMatchesData();
        setAllData({
            prelimsData,
            pairMatchesData
        });
        return {
            prelimsData,
            pairMatchesData
        }


    },[]);

    useEffect(()=>{
        getAllData();
    },[getAllData]); 
    
    useEffect(()=>{
        getCurrentAdminSettings();
    },[getCurrentAdminSettings]);

   
  return {
    currentRound,
    judgeNumber,
    allData,
    loginUser,
    // userLogin,
    getAllData,
    setCurrentAdminSettings,
    getCurrentAdminSettings,
  }
}

export default useData;
