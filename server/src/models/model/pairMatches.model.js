const pairMatches = require('../schemas/pairmatches.mongo');

async function loadPairMatchesData(req,res) {
    const pairMatchesData = await pairMatches.find();
    return pairMatchesData;
}

async function addPairMatchData(data) {
    try {
        const { teamCode, round,jScore,courtRoom,judgeNumber} = data;
        // console.log(data,"inside addPairScore")
        const pairMatchesData = await pairMatches.findOne({teamCode:teamCode,round:round,courtRoom:courtRoom});
        // console.log(pairMatchesData,"pairMatchesData")
        if(pairMatchesData){
            if(pairMatchesData.judgeScore.length < judgeNumber){
                const result = await pairMatches.updateOne(
                    { teamCode:teamCode },
                    {
                        $push: {
                            judgeScore: {
                                $each: [jScore],
                            },
                        },
                    }
                );
                if(result){
                    return { ok: true, message: "Score added successfully." };
                }
                else{
                    return { ok: false, message: "Error in adding score." };
                }
            }
        }

        else{
            const newScore = new pairMatches({
                teamCode: teamCode,
                round: round,
                courtRoom: courtRoom,
                judgeScore: [jScore]
                
            });
            const result = await newScore.save();
            if(result){
                return { ok: true, message: "Score added successfully." };
            }
            else{
                return { ok: false, message: "Error in adding score." };
            }
        }

        
    
        
    } catch (error) {
        console.log("Error in adding Score:", error.message);
        return { ok: false, message: "Error in adding Score." };
    }
}

async function getCurrentRoundData(round) {
    const pairMatchesData = await pairMatches.find({round:round});
    return pairMatchesData;
}

async function updatePairMatchData(teamCode, judgeName, scores) {

}
module.exports = {
    loadPairMatchesData,
    addPairMatchData,
    getCurrentRoundData,
    updatePairMatchData
}