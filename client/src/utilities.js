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
 

const JudgeEmailTable =(judgeName, round, courtRoom, teamCode, scores,total)=>{
  const rounds = [
    'Preliminary Round',
    'Quater Finals',
    'Semi Final',
    'Final'
]

const categories = [
  "Appreciation and application of facts",
  "Application of legal principles",
  "Use of authorities and precedents",
  "Presentation skills",
  "Clarity of thoughts and structure of arguments",
  "Poise and demeanour",
  "Court Mannerism",
  "Strategy & Time Management",
  "Knowledge of laws",
  "Response to Forum questions",
];
  const tableContent = `
  <div>
      <table border="1" className="judge-table">
          <thead>
              <tr>
                  <th colSpan="3">${judgeName}</th>
              </tr>
              <tr>
                  <th colSpan='3'>${rounds[round]}</th>
              </tr>
              <tr>
                  <th></th>
                  <th colSpan="2">Court Room : ${courtRoom}</th>
              </tr>
              <tr>
                  <th>Team Code</th>
                  <th colSpan='2'>TC-${teamCode}</th>
              </tr>
              <tr>
                  <th>Categories</th>
                  <th colSpan="2">Marks</th>
              </tr>
              <tr>
                  <th></th>
                  <th>Speaker1</th>
                  <th>Speaker2</th>
              </tr>
          </thead>
          <tbody>
                    ${Object.keys(scores).map((key, index) => {
                        return `
                            <tr key="${index}">
                                <td>${categories[index]}</td>
                                <td>${scores[key].Speaker1}</td>
                                <td>${scores[key].Speaker2}</td>
                            </tr>`;
                    })
                    .join('')}
                    <tr rowSpan='1'>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr class="total-score-table">
                        <td>Total</td>
                        <td>${total.Speaker1}</td>
                        <td>${total.Speaker2}</td>
                    </tr>
                </tbody>
      </table>
  </div> 
`;

// console.log(tableContent);
return tableContent;

}
  
  


export {
  
    groupPairData,
    getEachRoundData,
    getTotalScore,
    getAverageScore,
    filterPrelimData,
    getSpeakerTotal,
    groupjudgeData,
    JudgeEmailTable
}
