$(document).ready(function(){
	var story = $('.timeline .timeline-story');
	var year = $('.timeline .year');
	// Assign data-id to both entries and stories
	for(i = 0; i < year.length; i++) {
		story.eq(i).attr('data-id', 'post-' + i);
		year.eq(i).attr('data-id', 'post-' + i);
	}
	// Display the first story when website loads
	$('.timeline .timeline-story').first().addClass('active');
	
});

// Detect request animation frame - this replaces scroll function as it makes the function much slower than request animation frame
var scroll = window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60) };

var lastPosition = -1;


// Since the requestAnimationFrame works all the time and not only when you scroll, we need to tell the browser that it has nothing to calculate if you haven't scrolled
function loop(){
		var year = $('.timeline .year');
	    // Avoid calculations if not needed
	    if (lastPosition == window.pageYOffset) {
	        scroll(loop);
	        return false;
	    } else {
	    	lastPosition = window.pageYOffset;
	    }

		var trackerHeight = '';
		for(i = 0; i < year.length; i++) {
			// Define the current instance of the loop
			var self = year.eq(i);		
			// Here we need to store the distance scrolled plus some offset in a variable for further calculations
			var scrollTop = (pageYOffset || (document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop)) + 230;


			if ( ( scrollTop > 0 && scrollTop > (self.offset().top || document.body.scrollTop > self.offset().top ) ) ) {
				
				trackerHeight = self.offset().top - $('.tracker').offset().top + (self.outerHeight() / 2) + 10;
				var id = self.attr('data-id');
				$('.timeline-story.active').removeClass('active') 
				$('.timeline-story[data-id="' + id +'"]').addClass('active');			
				
			}

			
		}
		$('.tracker').css('height' , trackerHeight + 'px');

	
	scroll( loop )
}


loop();

