const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Read the service account key file
const keyPath = path.join(process.cwd(), 'service-account-key.json');
const keyFile = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

// Configure JWT client
const jwtClient = new google.auth.JWT(
  keyFile.client_email,
  undefined, // keyFile
  keyFile.private_key,
  [
    'https://www.googleapis.com/auth/datastore',
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/firebase.database'
  ]
);

async function refreshToken() {
  try {
    const response = await jwtClient.authorize();
    
    if (!response || !response.access_token) {
      throw new Error('No access token received');
    }

    // Read current .env.local file
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = fs.existsSync(envPath) 
      ? fs.readFileSync(envPath, 'utf8')
      : '';

    // Update or add FIREBASE_ACCESS_TOKEN
    const tokenLine = `FIREBASE_ACCESS_TOKEN=${response.access_token}`;
    if (envContent.includes('FIREBASE_ACCESS_TOKEN=')) {
      envContent = envContent.replace(
        /FIREBASE_ACCESS_TOKEN=.*/,
        tokenLine
      );
    } else {
      envContent += `\n${tokenLine}`;
    }

    // Write back to .env.local
    fs.writeFileSync(envPath, envContent.trim() + '\n');

    console.log('Token refreshed successfully!');
    console.log('Next refresh in 55 minutes...');
    
    // Schedule next refresh (55 minutes to ensure we refresh before expiration)
    setTimeout(refreshToken, 55 * 60 * 1000);
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Retry after 5 minutes if there's an error
    setTimeout(refreshToken, 5 * 60 * 1000);
  }
}

// Start the refresh cycle
refreshToken(); 