var express = require('express');

module.exports.addResource = function(options) {

    var app = options.app;
    var prefix = options.urlPrefix || "/api";
    var resourceSlug = options.resourceSlug;
    var collection = options.collection;
    var schema = options.collection.schema;
    var paths = Object.keys(schema.paths);

    if (prefix[0] != '/') prefix = '/' + prefix;


    var baseUrl = '/' + resourceSlug;

    var router = express.Router();
    app.use(prefix, router);

    /**
     * schema: Show eschema for colletion
     */
    router.get(baseUrl + '/schema', function(req, res) {
        res.json(schema);
    });


    /**
     * GET: List all model instances.
     */
    router.get(baseUrl, function(req, res) {
        var cb = function(error, resources) {
            if (!error) res.json(resources); // Write the jsonified resources to the response object
            else res.json(error);
        };

        resources = collection.find(cb);
    });


    /**
     * GET [:ID]: Show model instance.
     */
    router.get(baseUrl + '/:id', function(req, res) {
        collection.find({
            "_id": req.params.id
        })
        // .populate('_location _type')
        .exec(function(error, resource) {
            if (error) res.json(error);
            else {
                if (resource.length) res.json(resource[0]);
                else {
                    res.json({
                        message: resourceSlug + 'Not Found'
                    });
                }
            }
        });
    });


    /**
     * POST: Create model.
     */
    router.post(baseUrl, function(req, res) {

        var data = req.body;
        postHash = {};
        paths.forEach(function(key) {
            if (!data[key] || key === '_id') return;
            postHash[key] = data[key];
        });

        collection.create(postHash, function(error, resource) {
            if (!error) res.json(resource);
            else res.json(error);
        });
    });


    /**
     * PUT: Update model.
     */
    router.put(baseUrl + '/:id', function(req, res) {
        var data = req.body;

        var _id = data._id;
        delete data._id;

        collection.update({_id: _id}, data, function(error, resource) {
            console.log(error ? error : resource);
            if (error) return res.send(error);
            else res.json(resource);
        });
    });

    /**
     * DELETE: Remove model.
     */
    router.delete(baseUrl + '/:id', function(req, res) {
        return collection.remove({_id: req.params.id}, function(error) {
            if (!error) res.send('');
            else res.send(error);
        });
    });
};
