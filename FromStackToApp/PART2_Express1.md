# Express: The Middleman
#### In this second installment of From Stack to App, learn about the E in NERD - Express!

## What is Express?
While there are many benefits to using Node to develop web applications, it is unable to handle all web-development tasks.  Instead of having to write (and rewrite) the vanilla JavaScript needed to accomplish these tasks, why not just use a web framework developed by the Node.js Foundation -Express!

Express is a popular, unopinionated Node web framework that provides middleware to address the web development tasks not addressed through Node including:
1. handling different HTTP requests (eg. logging in, checking out a cart, entering information into an online form,  etc.) for different URL paths,
2. inserting data (eg. user information, items in your shopping cart, etc.) from our database onto the screen for users to see, and
3. setting web application settings like where to locate certain files or connecting to servers.

In short it is the middleman of your app.  Express will handle the communication between your frontend (the user interface or browser) and your backend (database and server).  So let’s pick up where we left off.

*Quote: a soundbite from the article that you want to highlight to readers!*

## Create a Server
### Step 1: Start Express App
We need an entry point to our app.  So we're going to start our express server by creating a server directory and starting an instance of an express application.

**In terminal:**
```zsh
makedir server // creates a folder called “server”
cd server // enter the server file
touch app.js // creates entry point file for our application.
code app.js // opens up file to edit
```
**In server/app.js:**
```js
const express = require('express'); //imports express from node modules
const app = express(); //initiates an instance of an express app
```
### Step 2: Request and Send Index.html file to the Browser
We need to actually see our app, so let’s create a basic layout or HTML file.  Make sure you are in your main directory (i.e. you are NOT in the server file).

**In terminal:**
```zsh
Touch index.html
Code index.html
```
**In index.html**, create a basic HTML file:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Your App Name</title>
  </head>
  <body>
    <div id="app">
      <h1>Placeholder Text</h1>
    </div>
  </body>
</html>
```

Now lets "get" our HTML file so we can (eventually) display it on the browser.

**In server/app.js:**
```js
const express = require('express');
const path = require(‘path’); // a method that will allow us to work with files and directory paths.

const app = express();

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,  '../index.html)');
});  // __dirname returns the absolute path ending in './server' but, we need to serve the index.html which is outside of the server directory.
```
### Step 3: Start the Server
Let’s start our server, so we can see what our app looks like so far in the browser.

**In server/app.js:**
```js
const express = require('express');
const path = require('path');
// set the environment variable PORT to tell your web server what port to listen on.
const port = process.env.PORT || 3000; // whatever is in the  variable PORT, or 3000 if there's nothing there.

const app = express();

app.get('*', function (req, res) {
  // __dirname returns the absolute path ending in './server' but, we need to serve the index.html which is outside of the server directory.
  res.sendFile(path.join(__dirname, '../index.html'));
});


// At the bottom of the file:
app.listen(port, function () {
 	    console.log(`Your server is on port ${port}`);
   });
```

**In package.json:**
Add the following line to `"scripts"` object. This tells node which file to go to in order to start running our server:
```json
"scripts": {
  "start": "node server/app.js"
}
```
### Step 4: Install Nodemon
Instead of having to kill and restart the server each time we make a change to our app, lets install [nodemon](https://nodemon.io/).  Now we'll be able to make changes to our app and restart our server automatically.

**In terminal:**
```zsh
npm i --S -D nodemon //installs nodemon as a development dependency
```

**In package.json:**
Add a `"dev"` property to your `"scripts"` object after `"start"`. This will tell nodemon which file to use to run and restart our server during development of our application:
```json
"scripts": {
  "start": "node server/app.js",
  "dev": "nodemon server/app.js"
}
```

**In terminal:**
```zsh
npm run dev //starts server
```

Now go to your browser, go to http://localhost:3000/, and you should see “Placeholder Text” from  your index.html. Go ahead and change it to whatever you like.  We’ll be adding more to this file later!

## Middleware
So now we have a basic express app.  However, we've yet to tap into all that express has to offer. One of the advantages of using express is it's ability to handle common web development tasks. Granted, we could write the vanilla JavaScript for these tasks ourselves, but by installing express middleware, we can add this functionality to our applications in an optimized and efficient way.

Middleware are functions that process HTTP requests and responses to the HTTP client, then calls the next function in the stack - either another middleware or route handler (we'll get to that later). It can execute any operation or code and can be organized based on your preferences (unless a middleware is dependent on another to run successfully).

### Step 5: Logging Middleware
Not all middleware are built into the express library.  We call these third-party middleware.  In order to use it, we need to first install their node package, require it in our application, then "use" it in our app. One such middleware is [morgan](https://github.com/expressjs/morgan), which logs HTTP requests.

**In terminal:**
```zsh
npm install --save morgan //installs morgan node package
```

**In /server/app.js:**
```js
const express = require('express');
const morgan = require('morgan'); //import morgan from node modules
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev')); //tells express to use this logging middleware

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, function () {
  console.log(`Your server, listening on port ${port}`);
});
```
### Step 6: Parsing Middleware
Express contains built-in middleware that allows us to parse or translate the body (information) that often comes with a request from the browser or client side.  We can tell which parser will be needed based on the content type of the body (located in the header of the request).  After the middleware parses the body, a new body object containing that parsed data is added to the request object. Otherwise, the parser will return an empty object.

**In /server/app.js:**
```js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
express.urlencoded({extended: true}); // parses urlencoded request that contains any data type
express.json(); // parses json requests

// The rest of the previous code below...
```
### Step 7: Static Files and Middleware
So far we’re only showing our index.html file, which gives us a layout for our website with no styling or effects whatsoever.  Eventually, we’ll be sending some javascript, css, and other static files from the server.  These files will be stored in a folder called “public.”

**In terminal:**
```zsh
mkdir public; // creates public folder for static files.
```

**In server/app.js:**
```js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
express.urlencoded({
  extended: true
});
express.json();
express.static('public'); // serves up static files and assets in our "public" directory

// The rest of the previous code below...
```

### Step 8: Error Handling Middleware
The 500 Internal Server Error is a HTTP status code that means something has gone wrong on the web site's server but we’re not sure why.  We’ll add more error handling later when we build express routes to the database, but for now, lets create this error handling middleware.

**In server/index.js:**
```js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
express.urlencoded({
  extended: true
});
express.json();
express.static('public');

app.use('/api', require('./apiRoutes'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// We want to place this error handler at the end of all of our middleware.  If we pass errors through our application, this will be the last error handler it hits before return the response to the client.
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, function () {
  console.log(`Your server, listening on port ${port}`);
});
```
Heading 2: Set reader’s up to learn/take action.
Content/Images: practical, easy to implement advice. Readers should see results if they implement your advice.

Conclusion: Sum up main points; call to action. Subscribe!

