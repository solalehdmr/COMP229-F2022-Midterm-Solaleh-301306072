
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let book = require('../models/books');


router.get('/', (req, res, next) => {
 
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});


router.get('/add', (req, res, next) => {

  
    res.render('books/details',{
      title: "Add a Book",
      books:''
    });
});
router.post('/add', (req, res, next) => {
    console.log("data req", req);
    console.log("data res", res);
     book.create({
      Title:req.body.title,
      Description:"",
      Price:req.body.price,
      Author:req.body.author,
      Genre:req.body.genre 
    });
    res.redirect('/books'); 

});

router.get('/:id', (req, res, next) => {
     book.findById(req.params.id,function (err,bookData){
      res.render('books/details',{
        title:" Edit " + bookData.Title,
        books:bookData 
      });
    });
});


router.post('/:id', (req, res, next) => {
     book.findByIdAndUpdate({
      "_id":req.params.id
      },
      {
        Title:req.body.title,
        Description:"",
        Price:req.body.price,
        Author:req.body.author,
        Genre:req.body.genre
      },function(){
        res.redirect('/books');
      });

});


router.get('/delete/:id', (req, res, next) => {
     book.findByIdAndDelete({
      _id:req.params.id
    },function(){
      res.redirect('/books');
    });
});


module.exports = router;
