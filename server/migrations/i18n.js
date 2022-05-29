
/* eslint import/no-extraneous-dependencies: 0, no-restricted-syntax: 0, no-await-in-loop: 0 */

const langs =  ['en', 'bn'];
const fs =  require('fs');
const path = require('path');

module.exports = async () => {
    try {
        // delete collection if exist on database
        await DB.I18nLanguage.remove();
        
        await DB.I18nLanguage.create(
            {
                key: 'en',
                name: 'EN',
                isDefault: true,
                isActive: true,
            },
            {
                key: 'bn',
                name: 'BN',
                isDefault: false,
                isActive: true,
            });
    } catch (e) {
        console.log(e);
        throw e;
    }
}