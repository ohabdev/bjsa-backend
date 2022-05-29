
const nconf = require('nconf');
const path = require('path');
/*
    Cause we have to run queue with local file, so we will create queue name just for single server
    for scaling, so we will create a random key her as prefix/subfix for some queue
*/
process.env.LOCAL_ID = Math.random().toString(36).substring(7);
process.env.APP_ROOT_DIR = path.join(__dirname, '..');

nconf.argv()
    .env()
    .file({ file: path.resolve(path.join(__dirname, 'config', `${process.env.NODE_ENV}.json`)) });

const Kernel = require('./kernel');

const kernel = new Kernel();

kernel.loadModule(require('./module/system'));
kernel.loadModule(require('./module/i18n'));
kernel.loadModule(require('./module/country'));

// NOTE - compose at last
kernel.compose();

module.exports = kernel;