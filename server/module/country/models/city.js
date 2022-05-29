
const Schema = require('mongoose').Schema;

// city collections shema
const schema = new Schema({
    
    name: { 
        type: String
    },
    countryCode: { 
        type: String, 
        index: true 
    },
    state: { 
        type: String
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    },
});

module.exports = schema;