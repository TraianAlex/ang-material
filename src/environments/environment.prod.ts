import { mySecrets } from './environment.secret';

export const environment = {
  firebase: {
    projectId: 'ang-material-1f64d',
    appId: '1:675292816542:web:d621a51c986efc7a31c78f',
    storageBucket: 'ang-material-1f64d.appspot.com',
    apiKey: mySecrets.apiKey,
    authDomain: 'ang-material-1f64d.firebaseapp.com',
    messagingSenderId: '675292816542',
    measurementId: 'G-QC852WN5XG',
  },
  production: true,
  token: mySecrets.token,
};
