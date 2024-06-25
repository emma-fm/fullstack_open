import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [shownPersons, setShownPersons] = useState(persons)
  const [filter, setFilter] = useState('')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleAddContact = (ev) => {
    ev.preventDefault()

    if (persons.find((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    if (newNumber.length == 0) {
      alert("No number set")
      return
    }

    const newpersons = persons.concat({id: persons.length + 1, name: newName, number: newNumber})

    setPersons(newpersons)
    setShownPersons(newpersons.filter(p => p.name.toLowerCase().includes(filter)))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (ev) => {
    setFilter(ev.target.value.toLowerCase())

    setShownPersons(persons.filter(p => p.name.toLowerCase().includes(ev.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} />
      </div>
      <h2>Add a new number</h2>
      <form>
        <div>
          name: <input onChange={(ev) => setNewName(ev.target.value)} value={newName}/>
        </div>
        <div>
          number: <input onChange={(ev) => setNewNumber(ev.target.value)} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleAddContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {shownPersons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
      </div>
    </div>
  )
}

export default App