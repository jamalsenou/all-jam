
import { defineString } from 'firebase-functions/params';
import { Buffer } from 'buffer';
import { onCall } from 'firebase-functions/https';

// Define parameters
const clientId = defineString('SPOTIFY_CLIENT_ID');
const clientSecret = defineString('SPOTIFY_CLIENT_SECRET');

export const getSpotifyToken = onCall({region: 'europe-west3'}, async (data, context) => {
  try {
    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(clientId.value() + ':' + clientSecret.value()).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials'
      }).toString()
    };

    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const body = await response.json();
    
    return {
      access_token: body.access_token,
      token_type: body.token_type,
      expires_in: body.expires_in
    };
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw new Error('Failed to get Spotify token');
  }
})