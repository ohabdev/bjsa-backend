const configController = require('../controllers/config.controller');

module.exports = (router) => {

    /**
     * @apiDefine configRequest
     * @apiParam {Object}   value Any value type
     */

    /**
     * @apiGroup System
     * @apiVersion 1.0.0
     * @api {get} /v1/system/configs  Get list configs
     * @apiDescription Get list configs
     * @apiPermission admin
     */


    /**
     * @apiGroup System
     * @apiVersion 1.0.0
     * @api {put} /v1/system/configs/:id  Update a config
     * @apiDescription Update a config
     * @apiParam {String}   id        config id
     * @apiUse configRequest
     * @apiPermission admin
     */


    /**
     * @apiGroup System
     * @apiVersion 1.0.0
     * @api {get} /v1/system/configs/public Get system public info
     * @apiName GetSystemConfigs
     * @apiPermission All
     * @apiDescription System info public access.
     */
    router.get(
        '/v1/system/configs/public',
        configController.publicConfig,
        Middleware.Response.success('publicConfig')
    )
}