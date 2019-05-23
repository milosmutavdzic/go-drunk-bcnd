require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');

let verifyToken = require('./middleware/verifyToken');
let authenticateController = require('./controllers/users/authenticate-controller');
let { registerController, registerFieldsValidation } = require('./controllers/users/register-controller');
let { getUserController } = require('./controllers/users/get-user-controller');
let { updateUserController } = require('./controllers/users/update-user-controller');
let { resetPasswordController } = require('./controllers/users/reset-pass-controller');

let { newLocationController } = require('./controllers/locations/newlocation-controller');
let { getLocationsController } = require('./controllers/locations/get-locations-controller');
let { votingController } = require('./controllers/locations/voting-controller');

let { locationsSync } = require('./controllers/db-locations-sync');

const app = express();

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
app.post('/reset-pass', resetPasswordController);

app.get('/locations', verifyToken, getLocationsController);
app.post('/locations', verifyToken, newLocationController);
app.post('/vote', verifyToken, votingController);

//  update old location on every hour
cron.schedule("0 0 */1 * * *", locationsSync );

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});