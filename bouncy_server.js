//Imports the bouncy function
var bouncy = require('bouncy');

//Setup bouncy callback to catch request
bouncy( function(request, bounce)
{
	console.log("----------------");
	var method = "GET";
	console.log("METHOD: "+request.method);
	method = request.method.replace(/*HELLO*/g,"");
     //Check hosts to see which to redirect
		 	bounce(8080, opts={
		 		"method": method
		 	});
}).listen(9000);
