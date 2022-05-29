
const methodOverride = require('method-override');
const info = require('../../../package.json');
const bodyParser = require('body-parser')
const SwigEngine = require('swig').Swig;
const express = require('express');
const morgan = require('morgan');
const nconf = require('nconf');
const path = require('path');
const cors = require('cors');

const session  = require('express-session');
const MongoStore =   require('connect-mongo')(session);
const swig = new SwigEngine();
exports.name = 'kernel-app';

exports.config = {
    publicPath: path.resolve('./public')
};

// Expose app
exports.core = (kernel) => {

    kernel.addProp('app', express());
    kernel.app.engine('swig', swig.renderFile);
    kernel.app.engine('html', swig.renderFile);
    kernel.app.set('view engine', 'swig');
    kernel.app.set('views', path.join(__dirname, '..', '..', 'views'));
    kernel.app.set('view cache', false);
    kernel.app.disable('x-powered-by');
    kernel.app.locals.baseUrl = nconf.get('baseUrl');

    process.env.ALLOW_CORS && kernel.app.use(cors());
    kernel.app.use(bodyParser.urlencoded({
        extended: false
    }));

    kernel.app.use(bodyParser.json());
    kernel.app.use(methodOverride());

    if (process.env.NODE_ENV === 'production') {
        // log only 4xx and 5xx responses to console
        kernel.app.use(morgan('dev', {
            skip(req, res) { 
                return res.statusCode < 400
            }
        }));
    } else {
        kernel.app.use(morgan('dev'));
    }

    kernel.app.use(express.static(this.config.publicPath));
    // express session MongoStore
    kernel.app.use(session({
        secret: 'foo',
        resave: false, //don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        store: new MongoStore({
            url: process.env.MONGO_URI,
            autoRemove: 'native', //  Remove expired sessions
            ttl: 14 * 24 * 60 * 60 // = 14 days. Default
        })
    }));

    kernel.app.get('/api-author', (req, res) => {
        res.status(200).send({
            author: 'Ohab Riaz <ohabdev@gmaill.com>',
            appName: info.name,
            version: info.version,
        });
    });
} 