import React from 'react'



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


function getAverageScore(data,judgeNumber) {
  const totalScores = {};

  // Iterate through each entry in the data
  data.forEach(entry => {
    const teamCode = entry.teamCode;

    // Initialize team if not present in totalScores
    if (!totalScores[teamCode]) {
      totalScores[teamCode] = {
        Speaker1: 0,
        Speaker2: 0
      };
    }

    if(entry.judgeScore.length == judgeNumber){
      entry.judgeScore.forEach(judge => {
        const scores = judge.scores;
  
        // Sum up scores for Speaker1 and Speaker2
        Object.keys(scores).forEach(criterion => {
          totalScores[teamCode].Speaker1 += parseFloat(scores[criterion].Speaker1);
          totalScores[teamCode].Speaker2 += parseFloat(scores[criterion].Speaker2);
        });
      });
    }
   
   
  });

  // Round the scores to 2 decimal places
  Object.keys(totalScores).forEach(teamCode => {
    totalScores[teamCode].Speaker1 = totalScores[teamCode].Speaker1.toFixed(2);
    totalScores[teamCode].Speaker2 = totalScores[teamCode].Speaker2.toFixed(2);
  });

  // Transform the result into the desired format
  const result = Object.keys(totalScores).map(teamCode => ({
    teamCode: teamCode,
    Speaker1: totalScores[teamCode].Speaker1,
    Speaker2: totalScores[teamCode].Speaker2,
    Total: (parseFloat(totalScores[teamCode].Speaker1) + parseFloat(totalScores[teamCode].Speaker2)).toFixed(2)
  }));

  return result;
}
 
  
  
  


export {
  
    groupPairData,
    getEachRoundData,
    getTotalScore,
    getAverageScore

}
