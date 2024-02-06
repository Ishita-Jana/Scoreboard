import { useCallback, useEffect, useState } from "react";

import {
    httpGetPairMatches,
    httpGetPairMatchesData,
    httpSubmitPairMatchesData
} from "./requests";



const usePairMatchesData = () => {

    const [pairMatchesData,setPairMatchesData] = useState([]);
    const [currRoundPairs,setCurrRoundPairs] = useState([]);

    const getPairMatchesData = useCallback(async ()=>{
      const fetchData = await httpGetPairMatchesData();
      setPairMatchesData(fetchData);
      return fetchData;

     
    },[]);



    const submitPairMatchesData = useCallback(async (data)=> {
      console.log(data);
      const response = await httpSubmitPairMatchesData(data);
      if(response.ok){
        getPairMatchesData();
      }
      else{
        console.log(response)
      }
      
    },[])


    const getCurrPairMatchesData = useCallback(async (roundNumber,judgeNumber)=> {
     
      const data = await httpGetPairMatches(roundNumber,judgeNumber);
      setCurrRoundPairs(data);
      return data;
  },[])



  
  useEffect(()=>{
    getPairMatchesData();
  },[getPairMatchesData]);


    

  return {
    currRoundPairs,
    pairMatchesData,
    getPairMatchesData,
    submitPairMatchesData,
    getCurrPairMatchesData
  }
   
  
}

export default usePairMatchesData
