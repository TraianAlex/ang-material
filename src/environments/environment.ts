// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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
  production: false,
  token: mySecrets.token,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
