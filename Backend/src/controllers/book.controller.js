import { Book } from "../models/books.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";


const getBooks = asyncHandler (async (req, res) => {

    const books = await Book.find()

    res.status(200).json(
        new ApiResponse(200, books)
    )
})

const newBookAdd = asyncHandler(async (req, res) => {
    const {title, author, isbn, totalCopies, description, coverImage} = req.body
    console.log(title)

    if(!title || !author || !isbn || !totalCopies ) {
        throw new ApiError(400, "All field required")
    }
    const existed = await Book.findOne({ isbn: isbn});
    if(existed) {
        throw new ApiError("Book already in database")
    }

    const entryBook = await Book.create({
        title: title,
        author: author,
        isbn: isbn,
        totalCopies: totalCopies,
        description: description
    })
    
    res.status(200).json(
        new ApiResponse(200, entryBook)
    );
})

const getBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if(!book) {
        throw new ApiError(400, "Book not found")
    }
    res.status(200).json(
        new ApiResponse(200, book)
    )
})

const updateBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    } )
})

const deleteBook = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const deleteBook = await Book.findByIdAndDelete(id);
    if(!deleteBook) {
        throw new ApiError(400, "Book not found")
    }
    res.status(200).json(
        new ApiResponse(200, deleteBook, "Book deleted successfully")
    )
})

export { getBooks, newBookAdd, getBook, updateBook, deleteBook }