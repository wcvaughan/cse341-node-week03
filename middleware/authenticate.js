const dotenv = require('dotenv');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config));

module.exports = {
    auth,
    requiresAuth
};