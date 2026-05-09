import { BorrowBook } from "../models/borrowRecords.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"
import { Book } from "../models/books.models.js"


const borrowBook = asyncHandler( async (req, res) => {
    const {userId, bookId} = req.body

    const user = User.findById(userId)
    if(!user) {
        throw new ApiError(400, "User not found");
    }
    const book = await Book.findById(bookId)
    if(!book) {
        throw new ApiError(400, "Book not found")
    }
    if(book.availableCopies < 1) {
        throw new ApiError(400, "Book not available")
    }
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 7)

    const borrowCreate = await BorrowBook.create({
        userId,
        bookId,
        dueDate
    })
    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(
        new ApiResponse(201, borrowRecord, "Book issued successfully")
    );

})

const returnBook = asyncHandler(async (req, res) => {
    const { borrowId } = req.params

    const borrowBook = await BorrowBook.findById(borrowId);

    if(!borrowBook) {
        throw new ApiError(400, "Borrow record not found")
    }
    if(borrowBook.status === "returned") {
        throw new ApiError(400, "Book already returned")
    }
    borrowBook.returnDate = new Date()
    borrowBook.status = "returned"

    await borrowBook.save();

    const book = await Book.findById(borrowBook.bookId);

    if(book) {
        book.availableCopies += 1
        await book.save()
    }
    res.status(200).json(
        new ApiResponse(200, borrowBook, "Book return successfully")
    )

})


const allBorrowBooks = asyncHandler(async (req, res) => {
    const allBorrows = await BorrowBook.find()
    
    res.status(200).json(new ApiResponse(200, allBorrows, "All borrows records"))
})


export {borrowBook, returnBook, allBorrowBooks}