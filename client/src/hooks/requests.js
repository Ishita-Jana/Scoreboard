import { getEachRoundData } from "../utilities.js";
// require('dotenv').config();

const API_URL = "https://mcc-scoreboard.onrender.com";
// const API_URL = "http://localhost:8000";



async function httpAdminLogin({username, password}){
    const response = await fetch(`${API_URL}/adminLogin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    const data = await response.json();
    return {
        token: data.token,
        judgeNumber: data.judgeNumber
    }
    
}

async function httpLogin(data){
    // console.log(data);
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const res = await response.json();
    // console.log(res);
    return res;

}

async function httpJudgeLogin({username, password}){
    const response = await fetch(`${API_URL}/judgeLogin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
   
}

async function httpJudgeRegister({username, password}){
    //TODO
   
  
}

async function httpGetAdminSettings(){
    const response = await fetch(`${API_URL}/adminSettings`);
    const data = await response.json();
    // console.log(data);
    
    return {
        round: data.round,
        judgeNumber: data.judgeNumber
    }

}

async function httpSetAdminSettings(data){
    const response = await fetch(`${API_URL}/adminSettings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
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

async function httpGetPrelimData(){
    const prelimData = await fetch(`${API_URL}/prelimsAllData`)
    const data = await prelimData.json();
    return {
        prelimData: data   
    };
    
    
}

async function httpUpdatePrelimData(data){
    //TODO
    //update TeamCode with the average score and speaker1 and speaker2
}
async function httpGetPairMatchesData(){
    const pairMatchesData = await fetch(`${API_URL}/pairMatches`)
    const data = await pairMatchesData.json();
    return {
        pairMatchesData: data   
    };

}

async function httpGetCurrPairMatches(){
    const currR = await httpGetAdminSettings();
    const round = {round: currR.round}
    // console.log(round,currR);
    const response = await fetch(`${API_URL}/pairMatchesCurr`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(round)
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    return {
        currRoundPairs: data
    }

}

async function httpSubmitPairMatchesData(pairMatchData){
    const response = await fetch(`${API_URL}/pairMatches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pairMatchData)
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

async function httpSendEmail(data){
    const response = await fetch(`${API_URL}/sendEmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(response);
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
    httpGetCurrPairMatches,
    httpSubmitPairMatchesData,
    httpLogin,
    httpSendEmail
   
};