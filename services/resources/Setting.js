var flatiron = require('flatiron')
  , app = flatiron.app;

exports.model = app.define('setting', function() {
  this.use('memory');

  this.string('page_title');
  this.number('column_width');
  this.number('base');

  this.timestamps();
});
