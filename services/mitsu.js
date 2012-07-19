var flatiron = require('flatiron')
  , app = flatiron.app
  , static = require('node-static')
  , util = require('util')


var fileServer = new static.Server('../public');

app.use(flatiron.plugins.http, {
  before: [
    function(req, res) {
      req.addListener('end', function() {
        fileServer.serve(req, res, function(err, result) {
          if (err) {
            app.log.error("Error Serving " + req.url + " - " + err.message);
            res.emit('next');
          }
        });
      });
    }
  ],
  after: [],
});
app.use(flatiron.plugins.log);
app.use(flatiron.plugins.resourceful, {dir: __dirname + "/resources"});


// Load the test data for development
var testData = require('./test-data');

// Winston Logging Config
app.log.default.transports[0].colorize = true;
// Convenience Method
var inspect = app.inspect = function(o, m) {
  m+= ":";
  app.log.info(m, util.inspect(o, false, 5, true));
}

// Default header for this app
//app.http.headers["Content-Type"] = "application/json";

inspect(Object.keys(app.resources), "Resources");

var Project = app.resources.Project.model;
var Page = app.resources.Page.model;
var Settings = app.resources.Setting.model;

//inspect(Project);
//Project.all(function(err, val){console.log(val)});
//Project.get("Test Project 1",function(err, val){console.log(val)});


app.router.path('/', function() {
  this.get( function() {
    var self = this;
    self.res.writeHead(200, {'Content-Type': 'text/html'})
    self.res.end("Hello, World!");
  });

});

var routes = require('./routes');

var PORT = 5000;
app.start(PORT);

