// scripts.js
console.log("sanity check!");

//Menu jQuery
$(".menu").click(function(){
  $(this).toggleClass("open");
});

$(document).ready(function(){
	particlesJS();
//Prevent input with no value entered

// var inputMessage = $('#inputMessage');
// inputMessage.submit(function(e){
// 	e.preventDefault();
// });
var container = document.querySelector('#masonry');
  var sasonry = new Masonry(container, {
    columnWidth: 50,
    itemSelector: '.item'
  });


$.ajax({
    type: "GET",
    dataType: "jsonp",
    url: "https://api.instagram.com/v1/users/2191727/media/recent?access_token=2191727.73fb6de.b45bbbba7d54487dbf936f996b1203fb&count=12",
    success: function (json) {
        $.each(json.data, function () {
            var thisdata = this;
            $('.instagram-gallery').append("<div class='instagram-img'><div class='imagebox'><span class='likes'>" + this.likes.count + "</span><img src='" + this.images.thumbnail.url + "'/></div></div>");
        });
        var $container = $('.instagram-gallery');
        // initialize
        $container.masonry({
            itemSelector: '.instagram-img'
        });
    }
});

	$('.submit').prop('disabled',true); 
	  $('#inputMessage').keyup(function(){ 
	      $('.submit').prop('disabled', this.value === "" ? true : false); 
	  }); 

// select the form and serialize data 
// var signupData = $("#signup-form").serialize();
// console.log(signupData);
// // send POST request to /users with the form data
// $.post('/users', signupData, function(response){
// 	console.log(response);
// });

// $('#login-form').on('submit', function(e){
// 	e.preventDefault();

// 	//select the form and serialize data
// 	var loginData = $(this).serialize();
// 	//send POST request to /login with the form data
// 	$.post('/login', loginData, function(response){
// 		console.log(response);
// 	});
// config

//nav on scroll 
$(function () { 
    var down = false;
    var menuOn = false;
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();    
        if ( scrollTop > 60 && down === false) {
            $('#header').animate({"top": 0}, 300 );
            down = true;
        } 
        if ( scrollTop < 60 && down === true) {
            $('#header').animate({"top": -200}, 300 );
            down = false;
        }
    });            
});

// Floating Menu 
$float_speed=1500; //milliseconds
$float_easing="easeOutQuint";
$menu_fade_speed=500; //milliseconds
$closed_menu_opacity=1;

//cache vars
$fl_menu=$("#fl_menu");
$fl_menu_menu=$("#fl_menu .menu");
$fl_menu_label=$("#fl_menu .label");

$(window).load(function() {
	menuPosition=$('#fl_menu').position().top;
	FloatMenu();
	$fl_menu.hover(
		function(){ //mouse over
			$fl_menu_label.fadeTo($menu_fade_speed, 1);
			$fl_menu_menu.fadeIn($menu_fade_speed);
		},
		function(){ //mouse out
			$fl_menu_label.fadeTo($menu_fade_speed, $closed_menu_opacity);
			$fl_menu_menu.fadeOut($menu_fade_speed);
		}
	);
});

$(window).scroll(function () { 
	FloatMenu();
});

function FloatMenu(){
	var scrollAmount=$(document).scrollTop();
	var newPosition=menuPosition+scrollAmount;
	if($(window).height()<$fl_menu.height()+$fl_menu_menu.height()){
		$fl_menu.css("top",menuPosition);
	} else {
		$fl_menu.stop().animate({top: newPosition}, $float_speed, $float_easing);
	}
}
});


