const express = require('express')
const app = express()
const port = 3000

let movies = [
  {
    id: 1,
    title: "Medici - The Magnificent",
    category: "show"
  },
  {
    id: 2,
    title: "Inception",
    category: "movie"
  },
  {
    id: 3,
    title: "The Martian",
    category: "movie"
  },
  {
    id: 4,
    title: "Extraction",
    category: "movie"
  },
  {
    id: 5,
    title: "Money Heist",
    category: "show"
  },


]

app.get('/movies', (req, res) => {
  res.send(movies)
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