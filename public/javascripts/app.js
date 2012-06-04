jQuery(document).ready(function ($) {

  window.ctn = $("#grid-ctn");
  // Used to save the selected grid-image's original size
  var origHeight, origWidth, selectedImg;

  function randomXToY(minVal,maxVal,floatVal) {
    var randVal = minVal+(Math.random()*(maxVal-minVal));
    return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
  };

  function getTargetPosition() {
    // Return the coordinates of the center of the container
    // offset by some vertical distance from the top.
    var x = ctn.width()/2;
    var y = 150;
    return {x:x, y:y};
    
  };
 
  
  $(".item").each(function(idx) { 
/*
	  var width;
	  width = ((idx+1)*200) % 300;
	  var mod  = width % 200;
	  width = width + (200 - mod );
	  //console.log(width, mod);
	  $(this).width(width-4);
	  
	  var height;
	  height = ((idx+(Math.random()*3)*200)) % 400;
	  var mod = height % 200;
	  height = height + (200 - mod);
	  console.log(height, width);
	  $(this).height(height-4);
*/
	//  console.log($(this).height());
	
	var hw = function(h,w, el) {
		console.log(h,w);
		$(el).height(h).width(w-4);
	}
	
	switch (idx) {
		case 0:
			hw(200,300,this)
			break;
		case 1:
			hw(400,300,this)
			break;
		case 2:
			hw(200,300,this);
			break;
		case 3:
			hw(100,300,this);
			break;
		case 4:
			hw(400,300,this);
			break;
		case 5:
			hw(500,300,this);
			break;			
		case 6:
			hw(400,200,this);
			break;			
		case 7:
			hw(400,90,this);
			break;
		case 8:
			hw(100,300,this);
			break;
		case 9:
			hw(300,300,this);
			break;
		case 9:
			hw(300,300,this);
			break;
	}
	
	
   })
   
   
  $("#img-container").isotope({
  	itemSelector: '.item',
  	layoutMode: 'masonry',
  	masonry: {
	  	columnWidth: 300
  	}
  });   


  move("#up").to(0,52).rotate(135).end();
  move("#back").to(52).rotate(45).end();
  move("#down").to(0,-52).rotate(315).end();
  move("#markers").set('height','0px').rotate(90).end();

  console.log(getTargetPosition());

  function getOffsetToTarget(el) {
    el = $(el);
    var x = el.position().left + el.width()/2;
    var y = el.position().top;
    var pos = getTargetPosition();
    x = pos.x - x;
    y = pos.y - y;
    return {x:x, y:y};
  };

  var hide = function (elm) {
   // $(elm).hide();
  };

  var reset = function() {
    // Reset the navigation controls
    move("#up").to(0,52).rotate(135).end();
    move("#back").to(52).rotate(45).end();
    move("#down").to(0,-52).rotate(315).end();
    move("#markers").set('height','0px').rotate(90).end();
    // Reset the image grid
    var resetBoxes = function() { 
      $('.box').show();
      $('.box').each(function() {
        move(this)
          .delay(500)
          .set('left',0)
          .scale(1)
          .end();
      });
    };
    // Move item description off the screen
    move("#item-description").set('left','-100%').end(resetBoxes);
    // Re-Apply a border to the previously selected image
    move(selectedImg)
      .delay(1000)
      .set('border-width', '4px')
    .end();
  };

  var flyout = function() {
    selectedImg = this;
    $('.box').not(this).each(function(el) {
        var dur = randomXToY(2,5)*100;
        if (el % 2 == 0)
          move(this).set('left',2500).duration(dur).end(hide(this));
        else
          move(this).set('left',-2500).duration(dur).end(hide(this));
    });
    var x = getOffsetToTarget(this).x;
    var y = getOffsetToTarget(this).y;
    // Save the elements original dimensions for when we need to reset the animation
    // origHeight = $(this).height();
    // origWidth = $(this).width();
    // Move the selected image to the center of it's designated position
    var showDescription = function () { 
      move("#item-description")
        .set('left', '8%')
        .delay('.4s')
        .duration(250)
        .end(function() {
            move("#up").delay(500).to(0,0).rotate(135).end();
            move("#back").delay(500).to(0).rotate(45).end();
            move("#down").delay(500).to(0,0).rotate(315).end();
            move("#markers").delay(500).set('height','22px').rotate(90).end();
      });
    };    
    move(this).to(x,y)
      .then()
        // After the element has reached its target position, expand it by 30%
        //.set("width",origWidth*1.3)
        //.set("height",origHeight*1.3)
        .set('border-width','0px')
        .scale(1.3)
        .duration(200)
        .pop()
      .end(showDescription);
  };


  var exp1 = function () {
    move('#box1')
      .to(300)
      .duration('2s')
      .end(function () {
        move('#box1')
        .scale(1.5)
        .end()
      });

    move("#box2")
      .to(-700)
      .end(function(el) {
        $(el).hide();
        console.log(el);
      });
  };


$(".box").click(flyout);

$("#run").click(exp1);
$("#flyout").click(flyout);
$("#back").click(reset);

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
				contentLocation = $tab.attr("href") + 'Tab';

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

    	//Show Tab Content
		$(contentLocation).closest('.tabs-content').children('li').hide();
		$(contentLocation).css('display', 'block');
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
	  $(this).closest(".alert-box").fadeOut(function(event){
	    $(this).remove();
	  });
	});


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	$('input, textarea').placeholder();

	/* TOOLTIPS ------------ */
	$(this).tooltips();



	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
//	$('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
//	$('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
//	$('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
//	$('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});



	/* DROPDOWN NAV ------------- */

	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});
  if (Modernizr.touch) {
    $('.nav-bar>li.has-flyout>a.main').css({
      'padding-right' : '75px'
    });
    $('.nav-bar>li.has-flyout>a.flyout-toggle').css({
      'border-left' : '1px dashed #eee'
    });
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    })
  }


	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */
  

});
