/**
 * File Purpose:
 * This file implements the Book model which provides a data access layer for
 * all book-related operations. It handles the persistence of book data by
 * reading from and writing to a JSON file on the server's filesystem.
 *
 * Model Purpose:
 * The Book model encloses all the data access logic for book entities in the
 * application. It provides methods for retrieving, creating, updating, and
 * deleting book records. The model "abstracts away" the details of how book data
 * is stored (in this case, in a JSON file) from the rest of the application.
 * This separation allows the data storage mechanism to be changed in the future
 * without affecting other parts of the application.
 */

// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES
// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES
// DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES -- DEPENDENCIES

/**
 * fs - Node.js built-in File System module that provides methods for interacting
 * with the file system, including reading from and writing to files
 */
const fs = require("fs");

/**
 * path - Node.js built-in module that provides utilities for working with file
 * and directory paths in a platform-independent manner
 */
const path = require("path");

// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS
// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS
// CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS -- CONSTANTS

/**
 * booksFilePath - The absolute path to the JSON file where book data is stored.
 * The path is constructed relative to the current directory (__dirname) to
 * ensure consistent file access regardless of where the application is started from.
 */
const booksFilePath = path.join(__dirname, "..", "data", "books.json");

// HELPER FUNCTIONS -- HELPER FUNCTIONS -- HELPER FUNCTIONS -- HELPER FUNCTIONS
// HELPER FUNCTIONS -- HELPER FUNCTIONS -- HELPER FUNCTIONS -- HELPER FUNCTIONS
// HELPER FUNCTIONS -- HELPER FUNCTIONS -- HELPER FUNCTIONS -- HELPER FUNCTIONS

/**
 * This helper function reads the books data from the JSON file and parses it
 * into a JavaScript array.
 * 
 * The function reads the file synchronously, which blocks the event loop until
 * the operation completes. This is acceptable for small files and infrequent
 * operations, but for larger datasets or high-traffic applications, an
 * asynchronous approach would be preferred.
 * 
 * @returns {Array} - An array of book objects parsed from the JSON file
 */
function readBooks() {
  // Read the raw JSON data from the file using UTF-8 encoding
  const data = fs.readFileSync(booksFilePath, "utf-8");
  
  // Parse the JSON string into a JavaScript array of objects
  return JSON.parse(data);
}

/**
 * This helper function writes the books array back to the JSON file.
 * 
 * The function converts the JavaScript array to a formatted JSON string and
 * writes it synchronously to the file. The 'null' and '2' parameters in
 * JSON.stringify are used to format the JSON with indentation for better
 * readability.
 * 
 * @param {Array} books - The array of book objects to be written to the JSON file
 */
function writeBooks(books) {
  // Convert the books array to a formatted JSON string with 2-space indentation
  const jsonData = JSON.stringify(books, null, 2);
  
  // Write the JSON string to the file, overwriting any existing content
  fs.writeFileSync(booksFilePath, jsonData);
}

// PUBLIC METHODS -- PUBLIC METHODS -- PUBLIC METHODS -- PUBLIC METHODS
// PUBLIC METHODS -- PUBLIC METHODS -- PUBLIC METHODS -- PUBLIC METHODS
// PUBLIC METHODS -- PUBLIC METHODS -- PUBLIC METHODS -- PUBLIC METHODS

/**
 * This function retrieves all books from the data store.
 * 
 * It uses the readBooks helper function to get the complete collection of
 * books from the JSON file.
 * 
 * @returns {Array} - An array containing all book objects in the data store
 */
function getAllBooks() {
  // Return all books from the data store
  return readBooks();
}

/**
 * This function adds a new book to the data store with the provided details.
 * 
 * A unique ID for the new book is generated using the current timestamp.
 * This approach provides a simple way to generate unique IDs without external
 * dependencies, though it has limitations in high-concurrency environments.
 * 
 * @param {String} title - The title of the book
 * @param {String} author - The author of the book
 * @param {Number|String} cost - The cost of the book
 * @param {String} shoppingUrl - The URL where the book can be purchased
 * @returns {Object} - The newly created book object including its generated ID
 */
function addBook(title, author, cost, shoppingUrl) {
  // Get the current collection of books
  const books = readBooks();
  
  // Create a new book object with a timestamp-based ID and the provided details
  const newBook = { 
    id: Date.now(), // Using timestamp as a simple unique ID
    title, 
    author, 
    cost, 
    shoppingUrl 
  };
  
  // Add the new book to the collection
  books.push(newBook);
  
  // Save the updated collection back to the data store
  writeBooks(books);
  
  // Return the newly created book object
  return newBook;
}

/**
 * This function retrieves a specific book from the data store by its ID.
 * 
 * It searches the collection for a book with a matching ID and returns it
 * if found, or undefined if no match is found.
 * 
 * @param {Number} id - The unique identifier of the book to retrieve
 * @returns {Object|undefined} - The matching book object, or undefined if no match is found
 */
function getBookById(id) {
  // Get the current collection of books
  const books = readBooks();
  
  // Find and return the book with the matching ID
  return books.find((book) => book.id === id);
}

/**
 * This function updates an existing book in the data store with new details.
 * 
 * It finds the book with the specified ID, replaces its details with the
 * provided values, and saves the updated collection back to the data store.
 * 
 * @param {Number} id - The unique identifier of the book to update
 * @param {String} title - The new title for the book
 * @param {String} author - The new author for the book
 * @param {Number|String} cost - The new cost for the book
 * @param {String} shoppingUrl - The new shopping URL for the book
 * @returns {Object|null} - The updated book object, or null if no book with the specified ID was found
 */
function updateBook(id, title, author, cost, shoppingUrl) {
  // Get the current collection of books
  const books = readBooks();
  
  // Find the index of the book with the specified ID
  const bookIndex = books.findIndex((book) => book.id === id);
  
  // If no matching book was found, return null
  if (bookIndex === -1) return null;
  
  // Create an updated book object, preserving the original ID
  books[bookIndex] = { id, title, author, cost, shoppingUrl };
  
  // Save the updated collection back to the data store
  writeBooks(books);
  
  // Return the updated book object
  return books[bookIndex];
}

/**
 * This function removes a book from the data store by its ID.
 * 
 * It finds the book with the specified ID, removes it from the collection,
 * and saves the updated collection back to the data store.
 * 
 * @param {Number} id - The unique identifier of the book to delete
 * @returns {Object|null} - The deleted book object, or null if no book with the specified ID was found
 */
function deleteBook(id) {
  // Get the current collection of books
  const books = readBooks();
  
  // Find the index of the book with the specified ID
  const bookIndex = books.findIndex((book) => book.id === id);
  
  // If no matching book was found, return null
  if (bookIndex === -1) return null;
  
  // Remove the book from the collection and capture the removed book
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  // Save the updated collection back to the data store
  writeBooks(books);
  
  // Return the deleted book object
  return deletedBook;
}

// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS
// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS
// MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS -- MODULE EXPORTS

/**
 * Export all model functions to make them available to controllers and other modules
 */
module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
};