// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Firebase project setup for testing only.
 * Please use your own instance
 * The instance will be unavailable on 2020
 */
export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyDCBdRTZVl1-w-TN9Tl-4kv_0mFIk3ucz0',
        authDomain: 'playingfirebase.firebaseapp.com',
        databaseURL: 'https://playingfirebase.firebaseio.com',
        projectId: 'playingfirebase',
        storageBucket: 'playingfirebase.appspot.com',
        messagingSenderId: '802853209609',
        appId: '1:802853209609:web:a0edc1b5d04a7e8f'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
