
const Schema = require('mongoose').Schema;

// country collection schema
const schema = new Schema({
    name: { 
        type: String 
    },
    // alpha 2
    isoCode: { 
        type: String, 
        index: true 
    }
});

module.exports = schema;
