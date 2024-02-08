import React, { useCallback,useEffect,useState } from 'react'

import { httpGetPrelimData, httpSubmitPrelimData, httpUpdatePrelimData } from './requests';
import { httpGetAdminSettings } from './requests';
import { getAverageScore, getTotalScore } from '../utilities';
const usePrelimData = () => {
   
    const [prelimData, setPrelimData] = useState([]);
 

    const getAllPrelimdata = useCallback(async () => {
      const fetchPrelimData = await httpGetPrelimData();
      const adminSettings = await httpGetAdminSettings();
      const judgeNumber = adminSettings.judgeNumber;
      const data = fetchPrelimData.prelimData;
      return {
        prelimData: data,
        judgeNumber: judgeNumber
      }
     
      
  },[]);

    const getPrelimdata = useCallback(async () => {
        const fetchPrelimData = await httpGetPrelimData();
        const adminSettings = await httpGetAdminSettings();
        const judgeNumber = adminSettings.judgeNumber;
        const data = fetchPrelimData.prelimData;
        const totalScores = {};

        if(data){
          const requiredData = getAverageScore(data,judgeNumber);
          return requiredData;
        }
       
        
    },[]);

    const getPrelimAverage=useCallback(async()=>{
            const allPrelimData = await httpGetPrelimData();
            if(allPrelimData.prelimData){
              const totalScore = getAverageScore(allPrelimData.prelimData);
              return totalScore;
            }
    },[])



    const submitPrelimData = useCallback(async(data)=>{
        console.log(data,"submitting prelim data")
        const response = await httpSubmitPrelimData(data);
        if(response.ok){
            getPrelimdata();
        }
        else{
            console.log("error in submitting prelim data");
        }
    })



    const updatePrelimData = useCallback(async (e)=> {
        const data = e.target;
        const response = await httpUpdatePrelimData(data);
        if(response.ok){
            getPrelimdata();
        }
        else{
            console.log("error in updating prelim data");
        }

    });



    useEffect(()=>{
        getPrelimdata();
    },[getPrelimdata]);

    useEffect(()=>{
      getPrelimAverage();
    },[getPrelimAverage])


    return {
        prelimData,
        getPrelimdata,
        updatePrelimData,
        submitPrelimData,
        getPrelimAverage,
        getAllPrelimdata
      }
}
export default usePrelimData
