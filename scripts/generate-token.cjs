const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Read the service account key file
const keyPath = path.join(__dirname, '..', 'service-account-key.json');
const keyFile = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

// Configure JWT client
const jwtClient = new google.auth.JWT(
  keyFile.client_email,
  null,
  keyFile.private_key,
  [
    'https://www.googleapis.com/auth/datastore',
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/firebase.database'
  ]
);

// Get the access token
jwtClient.authorize((err, response) => {
  if (err) {
    console.error('Error getting access token:', err);
    if (err.message.includes('invalid_grant')) {
      console.log('\nTip: Make sure your service-account-key.json is valid and not expired.');
    }
    return;
  }

  if (!response || !response.access_token) {
    console.error('No access token received');
    return;
  }
  
  console.log('\nYour access token (add this to .env.local as FIREBASE_ACCESS_TOKEN):\n');
  console.log(response.access_token);
  console.log('\nNote: This token will expire in 1 hour. Generate a new one as needed.\n');
}); 