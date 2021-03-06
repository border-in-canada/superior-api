const express  = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cognito = require('./middleware/getVerifyMiddleware');
const appConfig = require('./config/appConfig.json');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'https://www.superiorrecoveryllc.com',
    optionsSuccessStatus: 200,
    credentials: true
}

const cognitoMiddleware = cognito.getVerifyMiddleware();

const dashboardRoutes = require('./routes/dashboard');
const accountRoutes = require('./routes/account');

const PORT = process.env.PORT || 8080;

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', accountRoutes);
app.use('/dashboard', cognitoMiddleware, dashboardRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(result => {
    app.listen(PORT);
})
.catch(err => {
    console.log(err);
});
