import { Router } from "express";
import {borrowBook, returnBook, allBorrowBooks} from "../controllers/borrowController.controller.js"


const borrowRouter = Router();


// Borrow APIs
// POST /borrow/:bookId
// PATCH /borrow/:borrowId/return
// GET /my-books

borrowRouter.route("/borrow/:bookId").post(borrowBook)
borrowRouter.route("/borrow/:borrowId/return").patch(returnBook);
borrowRouter.route("/my-books").get(allBorrowBooks);

export { borrowRouter }