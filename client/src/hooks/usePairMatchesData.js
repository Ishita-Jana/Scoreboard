import { useCallback, useEffect, useState } from "react";

import {
   httpGetCurrPairMatches,
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
      console.log("inside pair matches");
      console.log(response);
      return ;
      
    },[])


    const getCurrPairMatchesData = useCallback(async (round,judgeNumber)=> {
     
      const data = await httpGetCurrPairMatches();
      setCurrRoundPairs(data.currRoundPairs);
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
