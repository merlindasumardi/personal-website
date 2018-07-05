// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  // apiUrl: 'https://merlindasumardi.herokuapp.com',
  firebase: {
    apiKey: 'AIzaSyAvwnLPaO6H1_AFsgON3fIOOy_er_m0Gcg',
    authDomain: 'merlinda-website-1507826956343.firebaseapp.com',
    databaseURL: 'https://merlinda-website-1507826956343.firebaseio.com',
    projectId: 'merlinda-website-1507826956343',
    storageBucket: 'merlinda-website-1507826956343.appspot.com',
    messagingSenderId: '533630215046'
  }
};

