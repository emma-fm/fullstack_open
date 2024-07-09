const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(cors(), express.json(), morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
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
  const person = phonebook.find(p => p.id === id)

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})