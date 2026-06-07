import { Router } from "express";
import { borrowBook, returnBook, allBorrowBooks, getAllBorrowBooks, getUserBorrows } from "../controllers/borrowController.controller.js"


const borrowRouter = Router();


// Borrow APIs
// POST /borrow/:bookId
// PATCH /borrow/:borrowId/return
// GET /my-books

borrowRouter.route("/").post(borrowBook)
borrowRouter.route("/allBorrows").get(getAllBorrowBooks)
borrowRouter.route("/return/:borrowId").patch(returnBook);
borrowRouter.route("/my-books").get(allBorrowBooks);
borrowRouter.route("/user/:id").get(getUserBorrows);

export { borrowRouter }