/**
 * File Purpose:
 * This file contains all controller functions for handling book-related
 * operations in the application. It serves as the intermediary between
 * the routes and the Book model, processing HTTP requests and preparing
 * responses.
 *
 * Controller Purpose:
 * This controller manages all book-related operations including displaying
 * books, adding new books, editing existing books, and removing books from
 * the collection. It handles both the rendering of views and the processing
 * of form submissions. Each function corresponds to a specific route and
 * action in the application's workflow.
 */

// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES
// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES
// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES

/**
 * Book - The data model that handles all book-related operations
 * including retrieving, creating, updating, and deleting book records
 */
const Book = require("../models/Book");

// METHODS/FUNCTIONS -- METHODS/FUNCTIONS -- METHODS/FUNCTIONS
// METHODS/FUNCTIONS -- METHODS/FUNCTIONS -- METHODS/FUNCTIONS
// METHODS/FUNCTIONS -- METHODS/FUNCTIONS -- METHODS/FUNCTIONS

/**
 * This function retrieves all books from the data store and renders the home
 * page with the complete book collection.
 *
 * @param {Object} req - The Express request object containing information about
 *                      the HTTP request
 * @param {Object} res - The Express response object used for sending responses
 *                      to the client
 */
function getAllBooks(req, res) {
  // Retrieve the complete collection of books from the model
  const books = Book.getAllBooks();
  
  // Render the index view with the books data
  res.render("index", { books });
}

/**
 * This function renders the form for adding a new book to the collection.
 *
 * @param {Object} req - The Express request object containing information about
 *                      the HTTP request
 * @param {Object} res - The Express response object used for sending responses
 *                      to the client
 */
function showAddForm(req, res) {
  // Render the add book form view
  res.render("add");
}

/**
 * This function processes the submission of the add book form. It extracts
 * book details from the request body, adds the new book to the collection,
 * and redirects to the home page.
 *
 * @param {Object} req - The Express request object containing information about
 *                      the HTTP request, including the form data in req.body
 * @param {Object} res - The Express response object used for sending responses
 *                      to the client
 */
function addBook(req, res) {
  // Extract book details from the form submission
  const { title, author, cost, shoppingUrl } = req.body;
  
  // Add the new book to the collection using the Book model
  Book.addBook(title, author, cost, shoppingUrl);
  
  // Redirect to the home page to show the updated book collection
  res.redirect("/");
}

/**
 * This function retrieves a specific book by its ID and renders the
 * detailed view for that book.
 *
 * @param {Object} req - The Express request object containing information about
 *                      the HTTP request, including the book ID in req.params
 * @param {Object} res - The Express response object used for sending responses
 *                      to the client
 * @returns {Object} - If the book is not found, returns a 404 response
 */
function getBook(req, res) {
  // Extract and parse the book ID from the URL parameters
  const bookId = parseInt(req.params.id);
  
  // Retrieve the specified book from the model
  const book = Book.getBookById(bookId);
  
  // If the book doesn't exist, return a 404 response
  if (!book) {
    return res.status(404).send("Book not found");
  }
  
  // Render the book detail view with the book data
  res.render("book", { book });
}

/**
 * This function processes the submission of the edit book form. It updates
 * an existing book with new information and redirects to the book detail page.
 *
 * @param {Object} req - The Express request object containing information about
 *                      the HTTP request, including the book ID in req.params and
 *                      the updated book data in req.body
 * @param {Object} res - The Express response object used for sending responses
 *                      to the client
 * @returns {Object} - If the book is not found, returns a 404 response
 */
function updateBook(req, res) {
  // Extract and parse the book ID from the URL parameters
  const bookId = parseInt(req.params.id);
  
  // Extract updated book details from the form submission
  const { title, author, cost, shoppingUrl } = req.body;
  
  // Update the book in the collection using the Book model
  const updatedBook = Book.updateBook(bookId, title, author, cost, shoppingUrl);
  
  // If the book doesn't exist, return a 404 response
  if (!updatedBook) {
    return res.status(404).send("Book not found");
  }
  
  // Redirect to the book detail page to show the updated information
  res.redirect(`/book/${bookId}`);
}

/**
 * This function renders the form for editing an existing book, pre-populated
 * with the book's current information.
 *
 * @param {Object} req - The Express request object containing information about
 *                      the HTTP request, including the book ID in req.params
 * @param {Object} res - The Express response object used for sending responses
 *                      to the client
 * @returns {Object} - If the book is not found, returns a 404 response
 */
function showEditForm(req, res) {
  // Extract and parse the book ID from the URL parameters
  const bookId = parseInt(req.params.id);
  
  // Retrieve the specified book from the model
  const book = Book.getBookById(bookId);
  
  // If the book doesn't exist, return a 404 response
  if (!book) {
    return res.status(404).send("Book not found");
  }
  
  // Render the edit book form with the current book data
  res.render("edit", { book });
}

/**
 * This function removes a book from the collection and redirects to the home page.
 *
 * @param {Object} req - The Express request object containing information about
 *                      the HTTP request, including the book ID in req.params
 * @param {Object} res - The Express response object used for sending responses
 *                      to the client
 * @returns {Object} - If the book is not found, returns a 404 response
 */
function deleteBook(req, res) {
  // Extract and parse the book ID from the URL parameters
  const bookId = parseInt(req.params.id);
  
  // Delete the book from the collection using the Book model
  const deletedBook = Book.deleteBook(bookId);
  
  // If the book doesn't exist, return a 404 response
  if (!deletedBook) {
    return res.status(404).send("Book not found");
  }
  
  // Redirect to the home page to show the updated book collection
  res.redirect("/");
}

// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS
// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS
// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS

/**
 * Export all controller functions to make them available to the router
 */
module.exports = {
  getAllBooks,
  showAddForm,
  addBook,
  getBook,
  showEditForm,
  updateBook,
  deleteBook,
};