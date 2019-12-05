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
**In server/app.js:**
```js
const path = require(‘path’);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,  '../index.html)');
});  // __dirname returns the absolute path ending in './server' but, we need to serve the index.html which is outside of the server directory.
```
Step 3: Start the Server
Let’s start our server, so we can see what our app looks like so far in the browser.
In server/app.js:
const port = process.env.PORT || 3000;
At the bottom of the file:
app.listen(port, function () {
 	    console.log(`Your server is on port ${port}`);
 	});
In package.json:
Add the following to "scripts" object to start running our server
“start”: “node server/app.js”
Step 4: Install Nodemon
Instead of having to kill and restart the server each time we make a change to our app, lets install nodemon.  Now we'll be able to make changes to our app and restart our server automatically.
In terminal:
npm i --S -D nodemon //installs nodemon as a development dependency
In package.json
Add the following to your "scripts" object after "start":
"dev": "nodemon server/app.js,
In terminal,
npm run dev //starts server

Now go to your browser, go to http://localhost:3000/ and you should see “Placeholder Text” from  your index.html. Go ahead and change it to whatever you like.  We’ll be adding more to this file later!
Middleware
Step 5: Logging Middleware
In terminal:
npm install --save morgan //installs morgan node package
In /server/app.js
const morgan = require('morgan'); //import morgan from node modules
app.use(morgan('dev')); //tells express to use this logging middleware
Step 6: Parsing Middleware
Express contains built-in middleware that allows us to parse or translate the body (information) that often comes with a request from the browser or client side.  We can tell which parser will be needed based on the content type of the body (located in the header of the request).  After the middleware parses the body, a new body object containing that parsed data is added to the request object. Otherwise, the parser will return an empty object.
In /server/app.js
express.urlencoded({extended: true}); //parses urlencoded request
express.json(); //parses json requests

Step 7: Static Files and Middleware
So far we’re only showing our index.html file, which gives us a layout for our website with no styling or effects whatsoever.  Eventually, we’ll be sending some javascript, css, and other static files from the server.  These files will be stored in a folder called “public.”
In terminal:
mkdir public; // creates public folder for static files.
In server/app.js:
app.use('express.static('public')); //serves up static files
Step 8: Error Handling Middleware
The 500 Internal Server Error is a HTTP status code that means something has gone wrong on the web site's server but we’re not sure why.  We’ll add more error handling later when we build express routes to database.
In server/index.js
app.use(function (err, req, res, next) {
  console.error(‘Error: ‘, err);
  console.error(err.stack);
  res.status(err.status || 500)
        .send(err.message || 'Internal server error.');
});
Heading 2: Set reader’s up to learn/take action.
Content/Images: practical, easy to implement advice. Readers should see results if they implement your advice.

Conclusion: Sum up main points; call to action. Subscribe!

