/**
 * File Purpose:
 * This file defines all routes related to book operations in the application.
 * It acts as the entry point for handling HTTP requests related to books.
 *
 * Router Purpose:
 * The BookRouter module provides a structured interface for handling 
 * CRUD (Create, Read, Update, Delete) operations on books. It routes 
 * incoming HTTP requests to the appropriate controller methods, ensuring 
 * separation of concerns between routing and business logic.
 */

// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES
// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES
// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES

/**
 * express - A web framework for Node.js that provides tools for routing 
 * and handling HTTP requests.
 */
const express = require("express");

/**
 * router - Express Router instance used to define routes for book-related 
 * operations and export them as a module.
 */
const router = express.Router();

/**
 * booksController - The controller module containing the business logic for 
 * handling book operations such as retrieving, adding, updating, and deleting books.
 */
const booksController = require("../controllers/booksController");

// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS
// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS
// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS

/**
 * BASE_BOOK_PATH - The base route path for book-related operations.
 */
const BASE_BOOK_PATH = "/book";

/**
 * ADD_BOOK_PATH - The route path for adding a new book.
 */
const ADD_BOOK_PATH = "/add";

/**
 * EDIT_BOOK_PATH - The route path for editing an existing book.
 */
const EDIT_BOOK_PATH = "/edit";

/**
 * DELETE_BOOK_PATH - The route path for deleting a book.
 */
const DELETE_BOOK_PATH = "/delete";

// ROUTE DEFINITIONS -- ROUTE DEFINITIONS -- ROUTE DEFINITIONS -- ROUTE DEFINITIONS
// ROUTE DEFINITIONS -- ROUTE DEFINITIONS -- ROUTE DEFINITIONS -- ROUTE DEFINITIONS
// ROUTE DEFINITIONS -- ROUTE DEFINITIONS -- ROUTE DEFINITIONS -- ROUTE DEFINITIONS

/**
 * Home page - Retrieves and displays a list of all books.
 * 
 * @route GET /
 * @returns {Array} - A list of book objects
 */
router.get("/", booksController.getAllBooks);

/**
 * Add book form - Displays the form to add a new book.
 * 
 * @route GET /add
 */
router.get(ADD_BOOK_PATH, booksController.showAddForm);

/**
 * Add book - Handles the form submission for adding a new book.
 * 
 * @route POST /add
 */
router.post(ADD_BOOK_PATH, booksController.addBook);

/**
 * View a single book - Retrieves details of a specific book by its ID.
 * 
 * @route GET /book/:id
 * @param {string} id - The unique identifier of the book
 * @returns {Object} - The book object with the matching ID
 */
router.get(`${BASE_BOOK_PATH}/:id`, booksController.getBook);

/**
 * Edit book form - Displays the form to edit an existing book.
 * 
 * @route GET /edit/:id
 * @param {string} id - The unique identifier of the book
 */
router.get(`${EDIT_BOOK_PATH}/:id`, booksController.showEditForm);

/**
 * Update book - Handles the form submission for updating book details.
 * 
 * @route POST /edit/:id
 * @param {string} id - The unique identifier of the book
 */
router.post(`${EDIT_BOOK_PATH}/:id`, booksController.updateBook);

/**
 * Delete book - Handles the deletion of a book from the database.
 * 
 * @route POST /delete/:id
 * @param {string} id - The unique identifier of the book
 */
router.post(`${DELETE_BOOK_PATH}/:id`, booksController.deleteBook);

// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS
// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS
// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS

/**
 * Export the router to make book routes available for use in the application.
 */
module.exports = router;
