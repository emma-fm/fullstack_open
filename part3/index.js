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

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(phonebook => {
      response.json(phonebook)
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const pers = new Person({
    name: body.name,
    number: body.number
  })

  pers.save().then(result => {
    response.json(pers)
  })
  .catch(error => {
    next(error)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const pers = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, pers, {updated: true, runValidators: true, context: 'query'})
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
  .then(pers => {
    if (pers) {
      response.json(pers) 
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => {
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => {
    next(error)
  })
})

app.get('/info', (request, response, next) => {
  const today = new Date(Date.now())

  Person.find({}).then(phonebook => {
    response.send(`
      <p>Phonebook has info for ${phonebook.length} people</p>
      <p>${today.toUTCString()}</p>
    `)
  })
  .catch(error => {
    next(error)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


