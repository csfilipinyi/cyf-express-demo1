const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function Movie(id, title, category) {
  this.title = title
  this.id = id
  this.category = category
}

let movies = [
  new Movie(1,"Medici - The Magnificent","movie"),
  new Movie(2,"Inception","movie"),
  new Movie(3,"The Martian","movie"),
  new Movie(4,"Extraction","show"),
  new Movie(5,"Money Heist","show")
]

app.get('/movies', (req, res) => {
  res.send(movies)
})

app.get('/movies/search', (req, res) => {
  let category = req.query.cat
  let title = req.query.title
  let limit = req.query.limit
  let hits = movies
  if (category !== undefined) {
    hits = hits.filter(element => element.category === category)
  }
  if (title !== undefined) {
    hits = hits.filter(element => element.title.includes(title))
  }
  if (limit !== undefined) {
    hits= hits.slice(0,Number(limit))
  }
  res.send(hits)
})

app.get('/movies/:id', (req, res) => {
  let id = Number(req.params.id); 
  let mymovie = movies.find(movie => movie.id === id)
 // let mymovie = movies.find(findMovie(id))
  res.send(mymovie)
})

app.delete('/movies/:id', (req, res) => {
  let id = Number(req.params.id); 
  let index = movies.findIndex(movie => movie.id === id)
  movies.splice(index,1)
  res.send("ok")
})

app.post('/movies', (req, res) => {
  let newMovie = req.body;
  movies.push(newMovie);
  res.send("ok")
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


let findMovie = function(id) {
  return function(movie) {
    return movie.id === id
  }
}



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})