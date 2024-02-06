const mongoose = require('mongoose');


const judgeScoreSchema = new mongoose.Schema({
    judgeName: {
        type: String,
        required: true
    },
    scores: {
        type: Object, // You can adjust the type based on your data structure
        required: true
    }
});





const prelimsSchema = new mongoose.Schema({
    teamCode: {
        type: String,
        required: true
    },
    date: {
        type: Date,
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

const Prelims = mongoose.model('Prelims', prelimsSchema);

module.exports = Prelims;