// Imports for Node packages
var express = require("express"); // Handles routing
var app = express(); // Server for handling routes, the heart of our app
var axios = require("axios"); // Handles GET, POST etc request and responses
const bodyParser = require("body-parser"); // Middleware for dealing with form input data

// Express server setup (boilerplate code from the docs)
app.set("view engine", "ejs");

// BodyParser middleware setup (boilerplate code from the docs)
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// Tells express where to find any static files like images
app.use(express.static("public"));

/// ** -- ROUTES -- ** ///

// GET Home page which renders the index.ejs template. No data needed for plain HTML.
app.get("/", function (req, res) {
	res.render("pages/index");
});

// POST a new employee route
app.post("/create_employee", function (req, res) {
	// Useful for console logging the form inputs
	// console.log(console.log(req.body))
	// Example of form data for adding a new user
	var data = 
		`{"email":"${req.body.user.email}",
		"firstName":"${req.body.user.firstName}",
		"id":"${req.body.user.id}",
		"lastName":"${req.body.user.lastName}",
		"picture":"${req.body.user.picture}",
		"title":"${req.body.user.title}"}`;
		// console.log(req.body)

		var config = {
			method: 'post',
			url: 'https://spaexample-43742-default-rtdb.firebaseio.com/data.json',
			headers: { 
				"Content-Type": "text/plain"
			},
			data : data
		  };
		  
		  axios(config)
		  .then(function (response) {
			console.log(JSON.stringify(response.data));
		  })
		  .catch(function (error) {
			console.log(error);
		  });

		  res.redirect("/directory");
});

// GET Form to add new employee (GET the form first, then the forms "submit" button handles the POST request.
app.get("/create_employee", function (req, res) {
	// var newUser = req.query.user;
	// console.log(newUser)

	// var config = {
	// 	method: 'get',
	// 	url: 'https://spa-lab-ii-default-rtdb.firebaseio.com/data.json',
	// 	headers: { },
	// 	"Content-Type": "text/plain"
	//   };
	  
	//   axios(config)
	//   .then(function (response) {
	// 	console.log(JSON.stringify(response.data));
	//   })
	//   .catch(function (error) {
	// 	console.log(error);
	//   });	  

	res.render("pages/create_employee"); 
});



// GET Directory of employees, returns an array of objects from the server.
app.get("/directory", function (req, res) {
	// Modify this route and the views
var config = {
  method: 'get',
  url: 'https://spaexample-43742-default-rtdb.firebaseio.com/.json',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(Object.entries(response.data.data));
  return Object.entries(response.data.data);
})
.then((employee) => {
	console.log(employee)
	res.render("pages/directory", {
		employees: employee
	});
})
.catch(function (error) {
  console.log(error);
});
});


// GET static about page
app.get("/about", function (req, res) {
	res.render("pages/about");
});





// Single Employee
// "Render" the person view here!
app.get("/directory", function (req, res) {
//  let id = req.params.uid;
 //console.log('this is the id ' + id)
	//console.log(req);
	var config = {
		method: 'get',
		url: `https://spaexample-43742-default-rtdb.firebaseio.com/data/${id}.json`,
		headers: { }
	  };
	  
	  axios(config)
	  .then((response) => {
		  let dataFormAPI = response.data.data
		 return dataFormAPI;
	  })
	  .then((response) => {
		  res.render("pages/person", {
			  employees: response});
	  })
	  .catch(function (error) {
		console.log(error);
	  });
});





// DELETE user
app.delete("/delete/:uid", function (req, res) {
	let id = req.params.uid;
	var data = 
		`{"email":"${req.body.user.email}",
		"firstName":"${req.body.user.firstName}",
		"id":"${req.body.user.id}",
		"lastName":"${req.body.user.lastName}",
		"picture":"${req.body.user.picture}",
		"title":"${req.body.user.title}"}`;

	var config = {
	  method: 'delete',
	  url: `https://spaexample-43742-default-rtdb.firebaseio.com/data/${id}.json`,
	  headers: { 

	  },
	  data : data
	};
	
	axios(config)
	.then(function (response) {
	  console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
	  console.log(error);
	});

	res.redirect("/directory")
});

//GET Delete user form
app.get("/delete", function (req, res) {
	// var newUser = req.query.user;
	// console.log(newUser)

	// var config = {
	// 	method: 'get',
	// 	url: 'https://spa-lab-ii-default-rtdb.firebaseio.com/data.json',
	// 	headers: { },
	// 	"Content-Type": "text/plain"
	//   };
	  
	//   axios(config)
	//   .then(function (response) {
	// 	console.log(JSON.stringify(response.data));
	//   })
	//   .catch(function (error) {
	// 	console.log(error);
	//   });	  

	res.render("pages/delete"); 
});

//UPDATE user form
app.get("/update", function (req, res) {
	// var newUser = req.query.user;
	// console.log(newUser)

	// var config = {
	// 	method: 'get',
	// 	url: 'https://spa-lab-ii-default-rtdb.firebaseio.com/data.json',
	// 	headers: { },
	// 	"Content-Type": "text/plain"
	//   };
	  
	//   axios(config)
	//   .then(function (response) {
	// 	console.log(JSON.stringify(response.data));
	//   })
	//   .catch(function (error) {
	// 	console.log(error);
	//   });	  

	res.render("pages/update"); 
});

//UPDATE User
app.put("/update/:uid", function (req, res) {
	var data = 
		`{"email":"${req.body.user.email}",
		"firstName":"${req.body.user.firstName}",
		"id":"${req.body.user.id}",
		"lastName":"${req.body.user.lastName}",
		"picture":"${req.body.user.picture}",
		"title":"${req.body.user.title}"}`;

	var config = {
	  method: 'put',
	  url: `https://spaexample-43742-default-rtdb.firebaseio.com/data/${id}.json`,
	  headers: { 
		'Content-Type': 'text/plain'
	  },
	  data : data
	};
	
	axios(config)
	.then(function (response) {
	  console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
	  console.log(error);
	});

	res.redirect("/directory")
});

// Express's .listen method is the final part of Express that fires up the server on the assigned port and starts "listening" for request from the app! (boilerplate code from the docs)

app.listen(2001);
console.log("Port 2001 is open");


