// Explicit Global Namespace
window.App = Ember.Application.create({
  ready: function() {
  Ember.run.next(function() {
    Ember.run.next(function() {
    var ctn = $("#container");


    function bindHover() {
      $('.item').hover(function() {
        var el = $(this).children('.hover')
        move(el[0]).to(0,-40).end();

        },
        function() {
          var el = $(this).children('.hover')
          move(el[0]).to(0,0).end();
        }
      );
      $('.item').click(flyout);
    };
    
    bindHover();

    window.bindHover = bindHover;

    function randomXToY(minVal,maxVal,floatVal) {
      var randVal = minVal+(Math.random()*(maxVal-minVal));
      return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
    };
    
    function getTargetPosition(el) {
      // Return the coordinates of the center of the container
      // offset by some vertical distance from the top.
      el_width = $(el).width();
      var x = ctn.width()/2;
      x-= el_width/2;
      var y = 150;
      console.log(x, y, el_width);
      return {x:x, y:y};
    };

    function getOffsetToTarget(el) {
      el = $(el);
      var x = el.position().left + el.width()/2;
      var y = el.position().top;
      var pos = getTargetPosition();
      x = pos.x - x;
      y = pos.y - y;
      return {x:x, y:y};
    };

  
    var selectedWidth;
    var selectedImg;


    var flyout = function() {
      selectedImg = this;
      selectedWidth = $(this).width();
      var el = $(this).children('.hover')
      move(el[0]).to(0,0).end();
      $(this).unbind('hover');
      $(this).unbind('click');
      var t = setTimeout(function() {
        $("#back, body").click(reset);
        console.log("I ran");
      },1000);
      $('.item').not(this).each(function(el) {
          var dur = randomXToY(2,5)*100;
          if (el % 2 == 0)
            move(this).set('left',2500).duration(dur).end();
          else
            move(this).set('left',-2500).duration(dur).end();
          });

      var x = getTargetPosition(this).x;
      selectedWidth = $(this).width();
      console.log(selectedWidth, "<-- Sel Pos");
      var y = getTargetPosition(this).y;
      move(this).to(x,y)
        .then()
          // After the element has reached its target position, expand it by 30%
          //.set("width",origWidth*1.3)
          //.set("height",origHeight*1.3)
          .set('border-width','0px')
          .scale(1.3)
          .duration(200)
          .pop()
        .end(showDetails);
    };

    $('.item').click(flyout);
    move("#up").to(0,52).rotate(135).end();
    move("#back").to(52).rotate(45).end();
    move("#down").to(0,-52).rotate(315).end();
    move("#markers").set('height','0px').rotate(90).end();
    var x = getTargetPosition($("#item-description")).x;
    
    showDetails = function() {
      var offset = selectedWidth/2
      console.log(offset, "<-- Offset");
      // x is the distance to center if this element was at (0,0).
      // Since the "details" start at (-400,0), we add 0.
      // The -200 is for the width of the details itself.
      // offset is the width of the currently selected element divided by 2.
      move("#item-description").to(x+400-200-offset,0).end(function() {
        move("#up").delay(500).to(0,-10).rotate(135).end();
        move("#back").delay(500).to(-10).rotate(45).end();
        move("#down").delay(500).to(0,10).rotate(315).end();
        move("#markers").delay(500).to(-4,-11).set('height','22px').rotate(90).end();
      });
    }

    reset = function() {
      // Reset the navigation controls
      bindHover();
      $("#back, body").unbind("click");
      move("#up").to(0,52).rotate(135).end();
      move("#back").to(52).rotate(45).end();
      move("#down").to(0,-52).rotate(315).end();
      move("#markers").set('height','0px').rotate(90).end();
      // Reset the image grid
      var resetBoxes = function() { 
          $('.item').each(function() {
          move(this)
            .delay(500)
            .set('left',0)
            .scale(1)
            .end();
        });
        $("#container").isotope('reLayout');
      };
      // Move item description off the screen
      move("#item-description").to(0,0).end(resetBoxes);
    };
    

        $("#container").isotope({
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: 2
          }
        });
      });
    });

  }
});

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
