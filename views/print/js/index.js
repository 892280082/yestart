$(function() {

  $('.nav li').mousemove(function(){
		$('.nav li').find('h3').hide();
		$(this).find('h3').show();//you can give it a speed
  });
  $('.nav li').mouseleave(function(){
  		$(this).find('h3').slideUp("fast");
  });

});