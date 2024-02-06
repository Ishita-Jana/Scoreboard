const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;


// Connection events
mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});


async function mongoConnect(){
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

async function mongoDisconnect(){
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('MongoDB disconnection error:', error);
    }
}

module.exports = {
    mongoConnect,
    mongoDisconnect
};
