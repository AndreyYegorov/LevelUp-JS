const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

let rootPath = './public';  

app.use(express.static(rootPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let id = 2;

const books = [
  { id: 0, title: 'Book1', description: 'Some description', author: 'Stephen King', published: '2016' },
  { id: 1, title: 'Book2', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, autem.', author: 'Stephen King', published: '2010' }
];

app.get('/api/books', (req, res) => {
  res.send(books);
});

app.get('/api/book/get/:bookId', (req, res) => {
  let id = parseFloat(req.params.bookId, 10),
      book = books.find(book => book.id === id);

  res.send(book);
});

app.post('/api/add-new-book', (req, res) => {
  const book = req.body;

  book.id = id++;
  books.push(book);

  res.send(book);
});

app.delete('/api/book/delete/:bookId', (req, res) => {
  let id = parseFloat(req.params.bookId, 10),
      index = books.findIndex(book => book.id === id);

  books.splice(index, 1);

  res.send(books);
});

app.listen(3000, () => {
  console.log("Listen 3000");
});