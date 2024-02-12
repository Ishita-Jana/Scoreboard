const axios = require('axios');
const prelims = require('../schemas/prelims.mongo');

async function loadPrelimsData(req,res) {
    try {
        const prelimsData = await prelims.find({},);
        return prelimsData;
    } 
    catch (error) {
        console.log("error",error.message);
    }
}

async function addPrelimScore(data) {

    try {
        const { teamCode, round,jScore,courtRoom,judgeNumber} = data;
        // console.log(data,"inside addPrelimScore")
        const prelimData = await prelims.findOne({teamCode:teamCode});
        if(prelimData){
            if(prelimData.judgeScore.length < judgeNumber){
                const result = await prelims.updateOne(
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
            const newPrelim = new prelims({
                teamCode: teamCode,
                round: round,
                courtRoom: courtRoom,
                judgeScore: [jScore]
                
            });
            const result = await newPrelim.save();
            if(result){
                return { ok: true, message: "Score added successfully." };
            }
            else{
                return { ok: false, message: "Error in adding score." };
            }
        }

        
    
        
    } catch (error) {
        console.log("Error in addPrelimScore:", error.message);
        return { ok: false, message: "Error in addPrelimScore." };
    }
}




async function updatePrelimScore(teamCode, judgeName, scores) {

}
   
module.exports = {
    loadPrelimsData,
    addPrelimScore,
    updatePrelimScore
}








