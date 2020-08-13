const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

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
  }
]

app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.status(403).send("Not allowed")
})

// /movies
app.get('/movies', (req, res) => {
  let category = req.query.category
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
    hits = hits.slice(0,Number(limit))
  }
  res.send(hits)
})

// /movies/1
app.get('/movies/:id', (req, res) => {
  let id = Number(req.params.id); 
  let mymovie = movies.find(movie => movie.id === id)
  if (mymovie !== undefined) {
    res.send(mymovie)
  } else {
    res.status(404).send('not found')
  }
  
})

app.delete('/movies/:id', (req, res) => {
  let id = Number(req.params.id); 
  let index = movies.findIndex(movie => movie.id === id)
  movies.splice(index,1)
  res.send("ok")
})