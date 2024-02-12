import React from 'react'



const groupPairData = (data) => {
  const groupedData = data.reduce((acc, obj) => {
    const { courtRoom, ...rest } = obj;
    if (!acc[courtRoom]) {
        acc[courtRoom] = [rest];
    } else {
        acc[courtRoom].push(rest);
    }
    return acc;
}, {});
const resultArray = Object.keys(groupedData).map(courtRoom => ({ [courtRoom]: groupedData[courtRoom] }));
  // console.log(JSON.stringify(resultArray));
  // console.log(resultArray);
  return resultArray;  
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



const groupjudgeData = (data) => {
  const groupedData = {};
  
    if(data){
    data.forEach(item => {
      const test = getTotalScore(item.judgeScore);
      item.judgeScore.forEach(score => {
        const { teamCode, courtRoom, round } = item;
        const { judgeName, scores } = score;

      
        if (!groupedData[judgeName]) {
          groupedData[judgeName] = [];
        }
        const  total = getSpeakerTotal(scores);
        groupedData[judgeName].push({
          teamCode,
          courtRoom,
          round,
          judgeName,
          scores,
          total
        });
      });
    });
    }
return groupedData;
}


const getSpeakerTotal =(scores)=>{
  let totalSpeaker1 = 0;
  let totalSpeaker2 = 0;


  Object.keys(scores).forEach(category => {
    const score = scores[category];
    totalSpeaker1 += parseInt(score.Speaker1);
    totalSpeaker2 += parseInt(score.Speaker2);

  });
  return{
    Speaker1:totalSpeaker1,
    Speaker2:totalSpeaker2

  }

}








const getTotalScore = (judgescores) => {
    //before sending cjeck whether length is there or not
    let totalSpeaker1 = 0;
    let totalSpeaker2 = 0;
    judgescores.forEach(judge => {
      // Iterate over the scores for each judge
      // console.log(judge)
      Object.values(judge.scores).forEach(score => {
        // Add the scores for Speaker1 and Speaker2 to the total
        totalSpeaker1 += parseInt(score.Speaker1);
        totalSpeaker2 += parseInt(score.Speaker2);
      });
    });
    return {
      Speaker1: totalSpeaker1,
      Speaker2: totalSpeaker2
    };
    
}




function filterPrelimData(data){
  const requiredData = []
  // console.log(data,"data in filterPrelimData");
  data.map((team)=>{
    if(team.judgeScore.length == 2){
      const speaker = getTotalScore(team.judgeScore);
      // console.log(speaker,"speaker in filterPrelimData");
      const teamWithSpeakerResult = { ...team, speakerTotal: speaker };
      requiredData.push(teamWithSpeakerResult);
    }
  })
  // console.log(requiredData,"requiredData in filterPrelimData");
  return requiredData;
}






function getAverageScore(data,judgeNumber) {
  const totalScores = {};
 
  data.forEach(entry => {
    const teamCode = entry.teamCode;

    // Initialize team if not present in totalScores
    if (!totalScores[teamCode]) {
      totalScores[teamCode] = {
        courtRoom: entry.courtRoom,
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
    totalScores[teamCode].courtRoom = totalScores[teamCode].courtRoom;
    totalScores[teamCode].Speaker1 = totalScores[teamCode].Speaker1.toFixed(2);
    totalScores[teamCode].Speaker2 = totalScores[teamCode].Speaker2.toFixed(2);
  });

  // Transform the result into the desired format
  const result = Object.keys(totalScores).map(teamCode => ({
    teamCode: teamCode,
    courtRoom: totalScores[teamCode].courtRoom,
    Speaker1: totalScores[teamCode].Speaker1,
    Speaker2: totalScores[teamCode].Speaker2,
    Total: ((parseFloat(totalScores[teamCode].Speaker1) + parseFloat(totalScores[teamCode].Speaker2))/(judgeNumber*2)).toFixed(2)
  }));

  // console.log(result,"result in getAverageScore");
  return result;
}
 
  
  
  


export {
  
    groupPairData,
    getEachRoundData,
    getTotalScore,
    getAverageScore,
    filterPrelimData,
    getSpeakerTotal,
    groupjudgeData
}
