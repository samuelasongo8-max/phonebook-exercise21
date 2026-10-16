require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001
const distPath = path.join(__dirname, 'dist')

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-34-567890' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
]

const generateId = () => Math.max(...persons.map((person) => person.id)) + 1

app.use(cors())
app.use(express.json())
app.use(express.static(distPath))

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson)

  return response.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id)

  persons = persons.filter((person) => person.id !== personId)

  return response.status(204).end()
})

app.get('/{*path}', (request, response) => {
  response.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})