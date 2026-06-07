import { BorrowBook } from "../models/borrowRecords.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"
import { Book } from "../models/books.models.js"


const borrowBook = asyncHandler(async (req, res) => {
    const { bookId, student_id } = req.body

    const user = await User.findOne({
        student_id: student_id
    })
    if (!user) {
        console.log("user not found")
        throw new ApiError(400, "User not found");
    }
    const book = await Book.findById(bookId)
    if (!book) {
        console.log("book not found")
        throw new ApiError(400, "Book not found")
    }
    if (book.availableCopies < 1) {
        throw new ApiError(400, "Book not available")
    }
    const record = await BorrowBook.findOne({
        userId: user._id,
        bookId: book._id,
    })
    console.log(typeof (record))

    if (record && record.status != "Returned") {
        throw new ApiError(400, "Book already borrowed")
    }
    const dueDate = Date.now() + 15 * 24 * 60 * 60 * 1000;
    console.log(user.email, bookId, dueDate)
    const borrowCreate = await BorrowBook.create({
        userId: user._id,
        bookId: bookId,
        dueDate: dueDate
    })
    book.availableCopies -= 1;
    await book.save();

    res.status(200).json(
        new ApiResponse(200, borrowCreate, "Book issued successfully")
    );

})

const getUserBorrows = asyncHandler(async (req, res) => {
    console.log(req.params)
    const { id } = req.params;

    const userBorrows = await BorrowBook.find({
        userId: id
    }).populate("bookId", "title author")

    if (userBorrows.length === 0) {
        console.log("No borrows found")
        throw new ApiError(400, "No borrows found")
    }
    console.log(userBorrows)
    res.status(200).json(
        new ApiResponse(200, userBorrows, "All borrows records")
    )
})

const getAllBorrowBooks = asyncHandler(async (req, res) => {
    const allBorrows = await BorrowBook.find()
        .populate("userId", "fullName student_id")
        .populate("bookId", "title")

    if (allBorrows.length === 0) {
        console.log(allBorrowBooks.length)
        console.log("No borrows found")
        throw new ApiError(400, "No borrows found")
    }

    res.status(200).json(
        new ApiResponse(200, allBorrows, "All borrows records")
    )



})

const returnBook = asyncHandler(async (req, res) => {
    console.log("borrow")
    const { borrowId } = req.params
    console.log(borrowId)

    const borrowBook = await BorrowBook.findById(borrowId);

    if (!borrowBook) {
        throw new ApiError(400, "Borrow record not found")
    }
    if (borrowBook.status === "Returned") {
        throw new ApiError(400, "Book already returned")
    }
    borrowBook.returnDate = Date.now()
    console.log(Date.now())
    borrowBook.status = "Returned"

    await borrowBook.save();

    const book = await Book.findById(borrowBook.bookId);

    if (book) {
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


export { borrowBook, returnBook, allBorrowBooks, getAllBorrowBooks, getUserBorrows }