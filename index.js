require('dotenv').config();

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

let verifyToken = require('./middleware/verifyToken');
let authenticateController = require('./controllers/authenticate-controller');
let { registerController, registerFieldsValidation } = require('./controllers/register-controller');
let { getUserController } = require('./controllers/get-user-controller');
let { updateUserController } = require('./controllers/update-user-controller');

let { newLocationController } = require('./controllers/newlocation-controller');
let { getLocationsController } = require('./controllers/get-locations-controller');
let { votingController } = require('./controllers/voting-controller');

let { resetPasswordController } = require('./controllers/reset-pass-controller');


let app = express();

const environment = process.env.NODE_ENV; 
const stage = require('./config')[environment];
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

/* routes */
app.post('/users', registerFieldsValidation, registerController);
app.get('/users', verifyToken, getUserController );
app.put('/users', verifyToken,updateUserController );
app.post('/authenticate', authenticateController.authenticate);

app.get('/locations', verifyToken, getLocationsController);
app.post('/locations', verifyToken, newLocationController);
app.post('/vote', verifyToken, votingController);

app.post('/reset-pass', resetPasswordController);

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});