// "Happy New Year" project's functions, by @mabrasil 

(function($){
   	
	// Preloader 	 
   	$(window).load(function() { 
       	$('#status').fadeOut();
        $('#preloader').delay(100).fadeOut('slow'); 
        $('body').delay(100).css({'overflow':'visible'});
    }); 
	
	$(document).ready(function() {
		
		// Handling Window Resize
		var countdown =  $('.countdown-time');

		createTimeCicles();

		$(window).on('resize', windowSize);

		function windowSize(){
			countdown.TimeCircles().destroy();
		    createTimeCicles();
			countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
        		countdown.removeClass('animated bounceIn');
        	});
		}

		// TimeCicles 
		function createTimeCicles() {
			countdown.addClass('animated bounceIn');
			countdown.TimeCircles({
				bg_width: 1,
    			fg_width: 0.04,
				circle_bg_color: '#bdc3c7',
				time: {
    				    Days: {color: '#c0392b'}
    			,	   Hours: {color: '#27ae60'}
    			,	 Minutes: {color: '#2980b9'}
    			,	 Seconds: {color: '#8e44ad'}
    			}
			});
			countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
        		countdown.removeClass('animated bounceIn');
        	});
		}

		// Open modal window on click
		$('.links a').on('click', function(e) {
			var mainInner = $('.overlay'),
				modal = $('#' + $(this).attr('data-modal'));
					
			mainInner.animate({opacity: 0}, 400, function(){
				$('html,body').scrollTop(0);
				modal.addClass('active').fadeIn(400);
				countdown.TimeCircles().destroy();
			});
			e.preventDefault();

			$('.modal-close').on('click', function(e) {
				modal.removeClass('active').fadeOut(400, function(){
					mainInner.animate({opacity: 1}, 400);
		       		createTimeCicles();
					countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
        				countdown.removeClass('animated bounceIn');
        			});
				});
				e.preventDefault();
			});
		});

		// Tooltips
		$('.links a, .share a').tooltip();
	
		$('.links a, .share a').on('click', function () {
			$(this).tooltip('hide')
		});
			
	});
})(jQuery);

// "Typewriter"
(function($){
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

// Error Message (If your "browser" doesn't support canvas)
if (!document.createElement('canvas').getContext) {
	var msg = document.createElement("div");
		msg.id = "errorMsg";
		msg.innerHTML = "Your 'browser' doesn't support HTML5!<br/> Try a real web browser ;)"; 
		document.body.appendChild(msg);
	$("#code").css("display", "none")
} 
else {
	$("#code").typewriter();
}
