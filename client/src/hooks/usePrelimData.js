import React, { useCallback,useEffect,useState } from 'react'

import { httpGetPrelimData, httpSubmitPrelimData, httpUpdatePrelimData } from './requests';
const usePrelimData = () => {
   
    const [prelimData, setPrelimData] = useState([]);
 



    const getPrelimdata = useCallback(async () => {
        const requiredData =[];
        const fetchPrelimData = await httpGetPrelimData();
        const data = fetchPrelimData.prelimData;
        


        if (data) {
            data.forEach((team) => {
              let totalSpeaker1 = 0;
              let totalSpeaker2 = 0;
          
              if (team.judgeScore != null && team.judgeScore.length === 2) {
                team.judgeScore.forEach((item) => {
                  if (item.scores) {
                    Object.keys(item.scores).forEach((key) => {
                      totalSpeaker1 += item.scores[key].Speaker1 || 0;
                      totalSpeaker2 += item.scores[key].Speaker2 || 0;
                    });
                  }
                });
              }
          
              let average = (totalSpeaker1 + totalSpeaker2) / 4;
          
              if (average > 0) {
                requiredData.push({
                  teamCode: team.teamCode,
                  Speaker1: totalSpeaker1,
                  Speaker2: totalSpeaker2,
                  Total: totalSpeaker1 + totalSpeaker2,
                });
              }
            });
          
            console.log("requiredData", requiredData);
          }
        setPrelimData(requiredData);
        // console.log("data",requiredData);
     
        // updatePrelimData(requiredData);
       
    },[]);



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


    return {
        prelimData,
        getPrelimdata,
        updatePrelimData,
        submitPrelimData
      }
}
export default usePrelimData
