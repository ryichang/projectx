// scripts.js
console.log("sanity check!");

// select the form and serialize data 
var signupData = $("#signup-form").serialize();
console.log(signupData);
// send POST request to /users with the form data
$.post('/users', signupData, function(response){
	console.log(response);
});