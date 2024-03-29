// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

  'name': 'It\'s Valentines Day',
  'brand': 'It\'s Valentines Day',
  
  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'jade',
  
  'emails': 'templates/emails',
  
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '/4`Jx_;XilR(Q</HP~CodE2:CI*Vb_0Nl6&yx4fa7pa>onVci)@XrOLs{=2[^:!)'

});

// Load your project's Models

keystone.import('models');
keystone.set('mongo', 'mongodb://heroku:9GhHEXNNc-gfZCrvkRX3pCq0B-Pn_KkeTck74alROLkwd1kenZp06QN3_VUEToYkvWfwoVwuoNJ9SSOAPDmatg@dogen.mongohq.com:10057/app32058831');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

console.log("current env:", keystone.get('env'));
keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
  logo_src: '/images/logo-email.gif',
  logo_width: 194,
  logo_height: 76,
  theme: {
    email_bg: '#f9f9f9',
    link_color: '#2697de',
    buttons: {
      color: '#fff',
      background_color: '#2697de',
      border_color: '#1a7cb7'
    }
  }
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
  find: '/images/',
  replace: (keystone.get('env') == 'production') ? 'http://www.itsvalentinesday.com/images/' : 'http://localhost:3000/images/'
}, {
  find: '/keystone/',
  replace: (keystone.get('env') == 'production') ? 'http://www.itsvalentinesday.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
  'posts': ['posts', 'post-categories'],
  'galleries': 'galleries',
  'enquiries': 'enquiries',
  'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
