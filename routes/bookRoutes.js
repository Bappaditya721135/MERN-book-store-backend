import express from "express";
import { BookModel } from "../models/bookModel.js";

const router = express.Router();

// router.get("/", (req, res) => {
//     res.status(222).send("wellcome to mern stact")
// })


// post books 
router.post("/", async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            res.status(400).send("send all required feilds: title author publishYear")
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await BookModel.create(newBook)
        res.status(201).send(book)
    }
    catch(err) {
        console.log(err)
        res.status(500).send({message: err.message})
    }
})


// // get all books 
router.get("/", async (req, res) => {
    try {
        const books = await BookModel.find({})
        if(!books) {
            res.status(500).json({message: "can not find books"})
        }
        res.status(201).json({
            books: books
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message})
    }
})

// // get single book 
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const book = await BookModel.findById(id);
        res.status(201).json({book});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// // update book 
router.put("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(500).send({message: "send all the required fields"});
        }

        const savedBook = await BookModel.findByIdAndUpdate(id, req.body);
        if(!savedBook) {
            res.status(500).json({message: "Book not found"})
        }
        res.status(200).json({success: true, book: savedBook})
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

// // delete book 
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).json({success: false, message: "Book not found"})
        }
        res.status(200).json({success: true, book: deletedBook})
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

export default router;