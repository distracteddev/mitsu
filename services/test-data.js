var flatiron = require('flatiron')
  , app = flatiron.app;

var Project = app.resources.Project.model;
var Page = app.resources.Page.model;
var Settings = app.resources.Setting.model;

//var p = new(Project)({
  //title: "",
  //caption: "",
  //img_url: "",
  //height: 0,
  //width: 0 
//}).save();


var i = 0;
var base = 160;
var makeBox = function(i) {
    var h;
    var w;
    if ((((i*3)+2) % 4) === 0) {
      h = (base * 2) - 10;
      w = h;
      if (Math.random() > .5) w = base - 10;
      //console.log("ELSE: ",h,w);
    }
    else if (((i*6+2) % 4) === 0) {
      h = base - 10;
      w = (base * 2) -10;
      //console.log("ELSE IF: ",h,w);
    }
    else {
      h = base - 10;
      w = base - 10;
      //console.log("ELSE: ",h,w);
    }

    h = h + 50;
   
    var p = new(Project)({
      title: "Test Project " + i,
      caption: "Caption Test " + i,
      img_url: "http://placekitten.com/" + w + "/" + w,
      height: h,
      width: w 
    }).save();
}

while (i <= 39) {
  i++
  makeBox(i);
}


var settings = new(Settings)({
  page_title: "Mitsuaki Yajima",
  column_width: 2,
  base: 160
}).save();

