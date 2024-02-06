import React from 'react'

const findAverage = (team) => {

}

const groupPairData = (data) => {
    
}

const getEachRoundData =(data,roundNumber)=>{

    let groupedData = data.reduce((result, item) => {
       
        if (!result[item.round]) {
          result[item.round] = {};
        }
      
        
        if (!result[item.round][item.courtRoom]) {
          result[item.round][item.courtRoom] = [];
        }
      
       
        result[item.round][item.courtRoom].push(item);
      
    return result;
     
    }, {});
      
    
    
      if (groupedData[roundNumber]) {
        const roundData = groupedData[roundNumber];
        return roundData;
      } 
      
      else {
        console.log(`No data found for round ${roundNumber}`);
      }


}


const getTotalScore = (scores) => {
    //before sending cjeck whether length is there or not

    let totalSpeaker1 = 0;
    let totalSpeaker2 = 0;
    
    scores.forEach((judge) => {
        if(judge.scores){
            Object.keys(judge.scores).forEach((category) => {
                totalSpeaker1 += judge.scores[category].Speaker1;
                totalSpeaker2 += judge.scores[category].Speaker2;
       
            }); 
        }
      
     
    });

    return {
        Speaker1:totalSpeaker1,
        Speaker2:totalSpeaker2
    }
}

export {
    findAverage,
    groupPairData,
    getEachRoundData,
    getTotalScore
}
