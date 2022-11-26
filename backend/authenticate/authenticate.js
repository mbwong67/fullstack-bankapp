// Let's try firebase for firAdmin the backend as well (see https://dev.to/bbarbour/creating-a-mern-stack-app-that-uses-firebase-authentication-part-one-31a7 and https://firebase.google.com/docs/firAdmin/setup)
require('dotenv').config();
const firAdmin = require('firebase-admin');
// require('dotenv').config({path: './config/fir-env.env'});

const serviceAccount = {
  type: process.env.FIREBASE_ADMIN_TYPE,
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
};

// const serviceAccount = require('../config/fir-env.json');

firAdmin.initializeApp({
        credential: firAdmin.credential.cert(serviceAccount)
    });

function verifyToken(req, res, next) {
    try {
      const idToken = req.headers.authorization;
      firAdmin.auth().verifyIdToken(idToken)
        .then(() => {next()})
    } catch (err) {
      console.log('Cannot verify token');
      console.log(`Cannot verify token (${err})`);
      res.send('Authentication error! (' + err + ')');
    }
  }

  module.exports = {verifyToken};
