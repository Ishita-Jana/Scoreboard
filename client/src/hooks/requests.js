import {addPrelimData, getDummyPredata} from "../testData/dummy.js";  
import {dummyRealPairData} from "../testData/dummy.js";  
import { getEachRoundData } from "../utilities.js";


const API_URL = "http://localhost:8000";



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
    
    const response = await fetch(`${API_URL}/prelims`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prelimData)
    });
    // console.log(response);
    if(response.ok){
        return {
            ok: true
        }
    }
    else{
        return {
            ok: false
        }
    
    }
    
    
}

async function httpGetPrelimData(judges){
    const prelimData = await fetch(`${API_URL}/prelimsAllData`)
    const data = await prelimData.json();
    return {
        judgeNumber: judges,
        prelimData: data
    
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