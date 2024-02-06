import {addPrelimData, getDummyPredata} from "../testData/dummy.js";  
import {dummyRealPairData} from "../testData/dummy.js";  
import { getEachRoundData } from "../utilities.js";


const API_URL = "";



async function httpAdminLogin({username, password}){
    //TODO
    //validate admin login details and redirect to admin page
    
}


async function httpJudgeLogin({username, password}){
    //TODO
    //validate operator login details and redirect to operator page
   
}

async function httpJudgeRegister({username, password}){
    //TODO
   
  
}

async function httpGetAdminSettings(){
    //get the currnt round from admin
    
    return {
        round: 0,
        judgeNumber: 2
    }
}

async function httpSetAdminSettings(data){
    //set the currnt round and judge number from admin
    
}



async function httpSubmitPrelimData(prelimData){
    //TODO
    console.log(prelimData);

    // if (judgeScore.length == judgeNumber){
    //     calculate average and Speaker1 and speaker2 total
    // }
    
    return {
        ok: true
    }
}

async function httpGetPrelimData(judges){
    //TODO
    
    
    return {
        judgeNumber: judges,
        prelimData: getDummyPredata()
    
    };
    
    
}

async function httpUpdatePrelimData(data){
    //TODO
    //update TeamCode with the average score and speaker1 and speaker2
}
async function httpGetPairMatchesData(){
    //TODO
   return dummyRealPairData;

}

async function httpGetPairMatches(round,judgeNumber){
    //TODO
   // Filter objects with the specified round
//    const fetchedData = API_URL;
    
    const fetchedData = dummyRealPairData;
    const filteredData = getEachRoundData(fetchedData,round);
    return filteredData;
  


    

}

async function httpSubmitPairMatchesData(pairMatchData){
    //TODO
    //operator submitting each student data
}





export {
    httpAdminLogin,
    httpJudgeRegister,
    httpJudgeLogin, 
    httpGetAdminSettings,
    httpSetAdminSettings,
    httpGetPrelimData,
    httpSubmitPrelimData,
    httpUpdatePrelimData,
    httpGetPairMatchesData,
    httpGetPairMatches,
    httpSubmitPairMatchesData,
   
};