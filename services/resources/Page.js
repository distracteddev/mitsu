var flatiron = require('flatiron')
  , app = flatiron.app;


exports.model = app.define('page', function() {
  
  this.use('memory');

  this.string('title');
  this.string('content');
  this.number('position');

  this.timestamps();
});
