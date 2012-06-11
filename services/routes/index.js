var flatiron = require('flatiron')
  , pluralize = require('resourceful').pluralize
  , app = flatiron.app;


app.router.post('/test', function() {
  var self = this;
  self.res.writeHead(200);
  self.res.end(JSON.stringify(self.req.body));
});

var createPaths = function(name, resource) {

  app.router.path(name, function() {
    
    // GET resource
    this.get(function() {
      var self = this;
      console.log(name);
      resource.all(function(err, all) {
        if (err) throw err;
        var return_object = {};
        return_object[name] = all;
        self.res.end(JSON.stringify(return_object));
      })
    });

    //POST resource
    this.post(function() {
      var self = this;
      // Create a resource with the contents of the request body.
      resource.create(self.req.body[name], function(err, doc) {
        if (err) throw err;
        app.log.info("Saved");
        var return_object = {};
        return_object[name] = doc;
        self.res.end(JSON.stringify(return_object));
      });

    });

    this.get('/(.+)', function(id) {
      var self = this;
      app.log.info(id);
      resource.get(id, function(err, doc) {
        if (err) {
          self.res.writeHead(204);
          self.res.end();          
        }
        if (doc) {
          var return_object = {};
          return_object[name] = doc;
          self.res.end(JSON.stringify(return_object));
        }
      })
    });

    this.put('/:id', function(id) {
      var self = this;
      app.log.info(id);
      // Check to see if a document with that ID exists
      resource.get(id, function(err, doc) {
        if (err) throw err;
        // A document was found, lets update it.
        if (doc) {
          doc.update(self.req.body[name], function(err, doc) {
            if (err) throw err;
            var return_object = {};
            return_object[name] = doc;
            self.res.end(JSON.stringify(return_object));
          });
        }
        // A document with that ID was not found
        else {
          self.res.writeHead(404);
          self.res.end();
        }
      });
    });

    this.delete('/:id', function(id) {
      var self = this;
      app.log.info(id);
      resource.destory(id, function(err, doc) {
        if (err) throw err;
        self.res.end("Deleted");
      });
    });


  });

}

Object.keys(app.resources).forEach(function(key) {
  var resource = app.resources[key].model;
  var name = pluralize(resource._resource).toLowerCase();
  app.log.info(name);
  createPaths(name, resource);

});




