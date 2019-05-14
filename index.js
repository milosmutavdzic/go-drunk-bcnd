require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');

let verifyToken = require('./middleware/verifyToken');
let authenticateController = require('./controllers/authenticate-controller');
let { registerController, registerFieldsValidation } = require('./controllers/register-controller');
let { getLocationsController } = require('./controllers/getlocations-controller');
let { votingController } = require('./controllers/voting-controller');
let app = express();

const environment = process.env.NODE_ENV; 
const stage = require('./config')[environment];

app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());

/* routes */
app.post('/register',registerFieldsValidation, registerController);
app.post('/authenticate', authenticateController.authenticate);
app.get('/locations', getLocationsController);
app.post('/vote', votingController)

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});