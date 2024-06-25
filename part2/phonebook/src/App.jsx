import { useState } from 'react'

const Filter = ({onChange}) => {
  return(
    <div>
      filter shown with <input onChange={onChange} />
    </div>
  )
}

const PersonForm = ({name, number, onChangeName, onChangeNumber, onClick}) => {
  return(
    <div>
      <form>
        <div>
          name: <input onChange={onChangeName} value={name} />
        </div>
        <div>
          number: <input onChange={onChangeNumber} value={number} />
        </div>
        <div>
          <button type="submit" onClick={onClick}>add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({persons}) => {
  return(
    <div>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  )
}

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
      <Filter onChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <PersonForm 
        name={newName}
        number={newNumber}
        onChangeName={(ev) => setNewName(ev.target.value)}
        onChangeNumber={(ev) => setNewNumber(ev.target.value)}
        onClick={handleAddContact}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App