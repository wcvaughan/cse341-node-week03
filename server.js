const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const passport = require('./config/passport-config');
require('dotenv').config();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const transactionsRoutes = require('./routes/transactions');
const customerRoutes = require('./routes/customers');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorhandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const port = process.env.PORT || 8080;

// Session setup
const sessionSecret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // make sure the cookie is secure in production
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app
    .use(bodyParser.json()) // For parsing JSON request bodies
    .use((req, res, next) => { // Handle CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // Swagger API docs
    .use('/transactions', transactionsRoutes) // Transactions routes
    .use('/customers', customerRoutes) // Customers Routes
    .use('/auth', authRoutes); // Authentication routes (OAuth)

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exceptionL ${err}\n` + `Exception origin: ${origin}`);
});

// Use authentication routes
app.use('/auth', authRoutes);

app.use(errorHandler); // Global error handler

// Initialize the database and start the server
mongodb.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running at port ${port}`);
        });
    }
});

