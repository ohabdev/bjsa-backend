
const Schema = require('mongoose').Schema;

// i18n-language collections schema

const schema = new Schema(
    {
        key: { type: String, required: true, index: true },
        name: { type: String },
        flag: { type: String },
        isDefault: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: new Date },
        updatedAt: { type: Date, default: new Date }
    },
    {
        restrict: true,
        minimize: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

module.exports = schema;
