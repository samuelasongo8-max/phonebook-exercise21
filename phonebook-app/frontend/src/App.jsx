import { useEffect, useState } from 'react'

import personService from '../services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      alert('Please provide both a name and a number')
      return
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        const message = error.response?.data?.error || 'Failed to save person'
        alert(message)
      })
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) {
      return
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
      .catch(() => {
        alert(`${name} could not be deleted`)
      })
  }

  return (
    <div className="app">
      <h1>Phonebook</h1>

      <section className="panel search-panel">
        <label className="field-row">
          <span className="field-label">Search</span>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Filter by name"
          />
        </label>
      </section>

      <section className="panel">
        <h2>Add A Contact</h2>

        <form onSubmit={addPerson} className="person-form">
          <label className="field-row">
            <span className="field-label">Name</span>
            <input value={newName} onChange={(event) => setNewName(event.target.value)} />
          </label>

          <label className="field-row">
            <span className="field-label">Number</span>
            <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
          </label>

          <button type="submit">Add Person</button>
        </form>
      </section>

      <section className="panel">
        <h2>Numbers</h2>

        <ul className="person-list">
          {filteredPersons.map((person) => (
            <li key={person.id} className="person-item">
              <div className="person-entry">
                <span className="person-name">{person.name}</span>
                <span className="person-number">{person.number}</span>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deletePerson(person.id, person.name)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
