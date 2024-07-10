const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()

app.use(
  cors(),
  express.static('frontend/dist'),
  express.json(),
  morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(phonebook => {
      response.json(phonebook)
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Incorrect JSON format'
    })
  }

  if (phonebook.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'Name already found at phonebook'
    })
  }

  const person = {
    id: `${Math.floor(Math.random() * 10000)}`,
    name: body.name,
    number: body.number
  }

  phonebook = phonebook.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.find({_id: id})
  .then(pers => {
    if (pers.length > 0) {
      response.json(pers) 
    }
    else {
      response.status(404).end()
    }
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phonebook = phonebook.filter(p => p.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const today = new Date(Date.now())
  response.send(`
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${today.toUTCString()}</p>
    `)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})