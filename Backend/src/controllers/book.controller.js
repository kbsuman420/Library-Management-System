import { Book } from "../models/books.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";


const getBooks = asyncHandler(async (req, res) => {

    const books = await Book.find()

    if (!books) {
        throw new ApiError(400, "Books not found")
    }

    res.status(200).json(
        new ApiResponse(200, books, "Books fetched successfully")
    )
})

const newBookAdd = asyncHandler(async (req, res) => {
    const { title, author, isbn, category, totalCopies, description } = req.body
    console.log(title)

    if (!title || !author || !isbn || !totalCopies || !category) {
        console.log(title, author, isbn, category, totalCopies, description)
        throw new ApiError(400, "All field required")
    }
    const existed = await Book.findOne({ isbn: isbn });
    if (existed) {
        throw new ApiError("Book already in database")
    }

    const entryBook = await Book.create({
        title: title,
        author: author,
        isbn: isbn,
        totalCopies: totalCopies,
        description: description,
        availableCopies: totalCopies,
        status: "Available",
    })

    res.status(200).json(
        new ApiResponse(200, entryBook)
    );
})

const getBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        throw new ApiError(400, "Book not found")
    }
    res.status(200).json(
        new ApiResponse(200, book)
    )
})

const updateBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    console.log(id)

    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json(
        new ApiResponse(200, updateBook, "Book updated successfully")
    )
})

const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
        throw new ApiError(400, "Book not found")
    }
    res.status(200).json(
        new ApiResponse(200, deleteBook, "Book deleted successfully")
    )
})

export { getBooks, newBookAdd, getBook, updateBook, deleteBook }