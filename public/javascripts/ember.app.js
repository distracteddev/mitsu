// Init Ember-Data store
App.store = DS.Store.create({
  revision: 4,
  adapter: DS.RESTAdapter.create({ bulkCommit: false })
});

App.Project = DS.Model.extend({
  title: DS.attr('string'),
  caption: DS.attr('string'),
  img_url: DS.attr('string'),
  height: DS.attr('number'),
  width: DS.attr('number'),
  primaryKey: 'title',
  didLoad: function() {
        console.log(this.get('title') + " finished loading.");
  },
  
  hoverStyle: function() {
    return "height: " + (this.get('height')+2) + ";";
  }.property('height'),

  element_id: function() {
    return this.get('title').replace(/ /g, '_').toLowerCase();
  }.property('title')
  

});

App.Page = DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  position: DS.attr('number')
});

App.Setting = DS.Model.extend({
  title: DS.attr('string'),
  column_width: DS.attr('number'),
  base: DS.attr('number')
});

App.projects = App.store.findAll(App.Project);

App.projectsController = Ember.Object.create({
  projects: App.projects,

  addProject: function() {
    console.log("Adding a Project")
  }
});
