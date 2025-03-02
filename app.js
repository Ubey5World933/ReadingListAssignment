/**
 * Filename: app.js
 * Part of Project: Book Management System
 *
 * File Purpose:
 * This is the main application file that sets up and configures the Express.js
 * server, including middleware, view engine, and route handling.
 *
 * Program Purpose:
 * The purpose of this program is to provide a web-based book management system.
 * It allows users to view, add, edit, and delete books from a collection. The 
 * application uses Express.js as the web framework, Handlebars for template 
 * rendering, and follows the MVC (Model-View-Controller) pattern for organization.
 * Users can interact with the book collection through a user-friendly web interface
 * that displays book information and provides forms for data manipulation.
 */

// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS
// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS
// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS

const PORT = 3000; // The port number on which the server will listen for incoming requests

// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES
// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES
// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES

/**
 * Express - The core web application framework that provides
 * routing, middleware support, and HTTP utility methods
 */
const express = require("express");

/**
 * Express-Handlebars - A view engine for Express that uses Handlebars
 * templates for rendering dynamic HTML content
 */
const exphbs = require("express-handlebars");

/**
 * Path - Node.js built-in module that provides utilities for working 
 * with file and directory paths
 */
const path = require("path");

/**
 * Body-Parser - Middleware that parses incoming request bodies and makes
 * the parsed data available on the req.body property
 */
const bodyParser = require("body-parser");

/**
 * Books Router - A modular router that contains all routes and handlers
 * for book-related operations in the application
 */
const booksRouter = require("./routes/books");

// VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES
// VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES
// VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES -- VARIABLES

/**
 * app - The main Express application instance that will handle
 * all incoming HTTP requests and responses
 */
const app = express();

// METHODS/FUNCTIONS -- METHODS/FUNCTIONS -- METHODS/FUNCTIONS
// METHODS/FUNCTIONS -- METHODS/FUNCTIONS -- METHODS/FUNCTIONS
// METHODS/FUNCTIONS -- METHODS/FUNCTIONS -- METHODS/FUNCTIONS

/**
 * configureViewEngine
 * 
 * This function sets up Handlebars as the template engine for rendering views.
 * It configures the engine with the .hbs file extension for template files.
 * 
 * @param {Object} app - The Express application instance
 */
function configureViewEngine(app) {
  app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
  app.set("view engine", "hbs");
}

/**
 * configureMiddleware
 * 
 * This function sets up the middleware stack for the Express application.
 * It includes body parsing for form submissions and static file serving.
 * 
 * @param {Object} app - The Express application instance
 */
function configureMiddleware(app) {
  // Parse application/x-www-form-urlencoded form data
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Serve static files from the 'public' directory
  app.use(express.static("public"));
}

/**
 * makeRoutes
 * 
 * This function sets up the route handlers for the application.
 * It mounts the books router at the root path.
 * 
 * @param {Object} app - The Express application instance
 */
function makeRoutes(app) {
  app.use("/", booksRouter);
}

/**
 * startServer
 * 
 * This function starts the Express server on the specified port
 * and logs a message to the console when the server is running.
 * 
 * @param {Object} app - The Express application instance
 * @param {Number} port - The port number to listen on
 */
function startServer(app, port) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// MAIN PROGRAM EXECUTION -- MAIN PROGRAM EXECUTION -- MAIN PROGRAM EXECUTION
// MAIN PROGRAM EXECUTION -- MAIN PROGRAM EXECUTION -- MAIN PROGRAM EXECUTION
// MAIN PROGRAM EXECUTION -- MAIN PROGRAM EXECUTION -- MAIN PROGRAM EXECUTION

// Configure the view engine to use Handlebars
configureViewEngine(app);

// Set up middleware for request parsing and static files
configureMiddleware(app);

// Configure application routes
makeRoutes(app);

// Start the Express server
startServer(app, PORT);