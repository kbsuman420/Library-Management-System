import { Router } from "express";
import { getBooks, newBookAdd, getBook, updateBook, deleteBook } from "../controllers/book.controller.js"

const bookrouter = Router();


bookrouter.route("/").get(getBooks)

bookrouter.route("/").post(newBookAdd)

bookrouter.route("/:id").get(getBook)

bookrouter.route("/:id").patch(updateBook)

bookrouter.route("/:id").delete(deleteBook)


// Reservation APIs
// POST /reserve/:bookId
// GET /my-reservations
// bookrouter.route("/reserve/:bookId").post(bookReservation)
// bookrouter.route("/my-reservations").get(allReservations)


export { bookrouter}