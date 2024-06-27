import { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Person = ({person, onRemove}) => {

  return(
    <div>
      <p>
        {person.name} {person.number}
        <button type="submit" onClick={() => onRemove(person)}>delete</button>
      </p>
    </div>
  )
}

const PersonsList = ({persons, onRemove}) => {
  return(
    <div>
      {persons.map(p => <Person key={p.id} person={p} onRemove={onRemove}/>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

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

    personsService.create({name: newName, number: newNumber})
    .then(data => {
      console.log(data)
      setPersons(persons.concat(data))
      setShownPersons(persons.concat(data).filter(p => p.name.toLowerCase().includes(filter)))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleFilterChange = (ev) => {
    setFilter(ev.target.value.toLowerCase())

    setShownPersons(persons.filter(p => p.name.toLowerCase().includes(ev.target.value.toLowerCase())))
  }

  const handleRemove = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id)

      setPersons(persons.filter(p => p.id !== person.id))
      setShownPersons(shownPersons.filter(p => p.id !== person.id))
    }
  }

  useEffect(() => {
    personsService.getAll().then(data => {
      setPersons(data)
      setShownPersons(data)
    })
  }, [])

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
      <PersonsList persons={shownPersons} onRemove={handleRemove}/>
    </div>
  )
}

export default App