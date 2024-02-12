const mongoose = require('mongoose');


const judgeScoreSchema = new mongoose.Schema({
    judgeName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    scores: {
        type: Object, // You can adjust the type based on your data structure
        required: true
    }
});





const pairMatchesSchema = new mongoose.Schema({
    teamCode: {
        type: String,
        required: true
    },
    courtRoom: {
        type: String,
        required: true
    },
    round: {
        type: Number,
        required: true
    },
    judgeScore: {
        type: [judgeScoreSchema],
        required: true
    }
});

const PairMatches = mongoose.model('PairMatches', pairMatchesSchema);

module.exports = PairMatches;