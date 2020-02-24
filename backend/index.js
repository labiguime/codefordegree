"use-strict";
const express = require('express');
const app = express();
const port = 5000;

/*Setup database*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/code4degree', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open',function(){
	console.log('Database connected');
})

/*Routes*/
app.get('/', (req, res) => {res.send('Hello World!')});

app.listen(port, () => console.log(`App listening on port ${port}!`))
