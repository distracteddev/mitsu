var flatiron = require('flatiron')
  , app = flatiron.app;


var Project = app.define('project', function() {

  this.use('memory');

  this.string('title');
  this.string('caption');
  this.string('img_url');
  this.number('height');
  this.number('width');
  this._key = "title";
  this.timestamps();
});

exports.model = Project;
