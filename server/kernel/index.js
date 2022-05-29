const http = require('http');
const _ = require('lodash');
const mongoose = require('mongoose');
const ResponseMiddleware = require('./middlewares/response');


class Kernel {

    constructor(config) {
        // Kernel object base key configuration
        this.config = config || {};
        this._modelSchemas = {};
        this._mongoosePlugins = {};
        this._routes = [];
        this._agendaJobs = [];
        this._services = {};
        this.httpServer = null;
        this.db = {};
        this.middleware = {
            Response: ResponseMiddleware,
            Request: {}
        }
    }

    addProp(key, val) {
        this[key] = val;
    }

    startHttpServer() {
        const app = http.createServer(this.app);
        app.listen(process.env.PORT, null, () => {
            // TODO - load env from config
            console.log('Express server listening on %d, in %s mode', process.env.PORT, process.env.NODE_ENV || 'development');
        });
    }

    loadModule(module) {
        // load config module
        if (module.config) {
            this.config = _.defaults(this.config, module.config);
        }
        // load core module express/mongoose/agendaJobs 
        if (module.core) {
            module.core(this);
        }
        // load applcation models
        if (module.model) {
            Object.keys(module.model).forEach((modelName) => {
                this._modelSchemas[modelName] = module.model[modelName];
            });
        }

        // load all module routes to constractor
        if (module.router) {
            this._routes.push(module.router);
        }

    }

    // load all models to constructor db;
    _modelLoader() {
        const db = {};
        Object.keys(this._modelSchemas).forEach((name) => {
            const schema = typeof this._modelSchemas[name] === 'function' ? this._modelSchemas[name]() : this._modelSchemas[name];
            if (schema instanceof mongoose.Schema) {
                if (this._mongoosePlugins[name] && Array.isArray(this._mongoosePlugins[name])) {
                    this._mongoosePlugins[name].forEach(pluginFuncitonFactory => schema.plugin(pluginFuncitonFactory));
                }
                db[name] = mongoose.model(name, schema);
            } else {
                db[name] = schema;
            }
        });

        this.db = db;
    }

    compose() {
        this._modelLoader();
        // set global DB
        global.DB = this.db;
        global.Middleware = this.middleware;
        global.Log = require('./util/log');
        this._routes.forEach(route => route(this.app));
    }

}

function kernelFactory(config) {

    const kernel = new Kernel(config);

    kernel.loadModule(require('./core/express'));
    kernel.loadModule(require('./core/mongoose'));
    kernel.loadModule(require('./models/user'));
    kernel.loadModule(require('./models/log'));

    return kernel;
}

module.exports = kernelFactory;