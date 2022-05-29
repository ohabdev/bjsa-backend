
const mongoose = require('mongoose');

const MONGOOSE_RECONNECT_MS = 1000;

// mongo reconnect 
function reconnect() {
    return new Promise(async (resolve) => {
        try {
            // { useNewUrlParser: true, useUnifiedTopology: true }
            await mongoose.connect(process.env.MONGO_URI);
            resolve();
        } catch (error) {
            console.log(error);
            console.info(`Attempting to reconnect in (${MONGOOSE_RECONNECT_MS}) ms`)
            setTimeout(() => {
                resolve(reconnect());
            }, MONGOOSE_RECONNECT_MS);
        }
    });
}

// mongodb database connection
exports.core = async () => {

    mongoose.connection.on('connected', () => {
        if (['development', 'test'].indexOf(process.env.NODE_ENV) > -1) {
            console.info(`mongoose connection open to ${process.env.MONGO_URI}`);            
        }
    });

    // if the connection throws an error
    mongoose.connection.on('error', console.error);

    // when the connection is disconnected
    mongoose.connection.on('disconnected', () => console.info('mongoose disconnected'));
    
    // connec to mongodb
    await reconnect();

    return mongoose;
}


