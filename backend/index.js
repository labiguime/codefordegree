"use-strict";

//Environment Variables from .env 
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';


/* Installed Modules */
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');

/* Internal Modules */
const User = require('./models/user');

/*Setup database*/
mongoDBUrl='mongodb://localhost/code4degree';
mongoose.connect(mongoDBUrl, {useNewUrlParser: true, useUnifiedTopology: true});

//Check database connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open',function(){ console.log('Database connected'); });

//Add a sample to the database
sample = new User({
	name: "Rafid Ashab Pranta",
	age: 21
});

//Example of call back Hell (Very common js problem)
User.find({ name: "Rafid Ashab Pranta", age: 21})
	.then(doc => {
		if (doc.length == 0) {
			sample.save()
				.then(doc => {
					console.log(doc);
				})
				.catch(err => {
					console.error(err);
				})
		}
		else {
			console.log("Record Already Exist");
		}
	})
	.catch(err => {
		console.error(err);
	})

/*Routes*/
app.get('/', (req, res) => {res.send('Hello World!')});
app.listen(port, () => console.log(`${env} server listening on port ${port}!`));
