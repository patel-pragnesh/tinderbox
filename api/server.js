var express		= require('express'),
	bodyParser	= require('body-parser'),
	app			= express(),
	morgan		= require('morgan'),
	mongoose	= require('mongoose'),
	router		= express.Router();

app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tinderbox');

//Models
var models = {
	group: require('./app/models/group'),
	artist: require('./app/models/artist'),
	user: require('./app/models/user')
};

//Routes
require("./app/routes/group")(router, models);

router.get('/', function(req, res) {
	res.json({ message: 'hooray!' });
});



app.use('/api/v.1.0.0', router);
app.listen(8888);
console.log('Magic happens on port 8888');