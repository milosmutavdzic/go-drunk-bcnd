require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');

let verifyToken = require('./middleware/verifyToken');
let authenticateController = require('./controllers/authenticate-controller');
let { registerController, registerFieldsValidation } = require('./controllers/register-controller');
let app = express();

const environment = process.env.NODE_ENV; 
const stage = require('./config')[environment];

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* routes */
app.post('/register',registerFieldsValidation, registerController);
app.post('/authenticate', authenticateController.authenticate);

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});