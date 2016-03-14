// scripts.js
console.log("sanity check!");

//Menu jQuery
$(".menu").click(function(){
  $(this).toggleClass("open");
});

$(document).ready(function(){
	particlesJS();



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

