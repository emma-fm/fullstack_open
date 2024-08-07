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

const Notification = ({message, error}) => {
  const st = {
    color: (error === true) ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') return null

  return(
    <div style={st}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [shownPersons, setShownPersons] = useState(persons)
  const [filter, setFilter] = useState('')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [bannerMsg, setBannerMsg] = useState('')
  const [bannerError, setBannerError] = useState(false)

  const handleAddContact = (ev) => {
    ev.preventDefault()

    if (newNumber.length == 0) {
      alert("No number set")
      return
    }

    // Update existing contact
    const existingContact = persons.find((p) => p.name === newName)
    if (existingContact) {
      if (!window.confirm(`${existingContact.name} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }

      personsService.update(existingContact.id, {...existingContact, number: newNumber})
      .then(data => {
        setBannerMsg(
          `Updated ${existingContact.name} contact information.`
        )
        setTimeout(() => {
          setBannerMsg('')
        }, 5000)

        setPersons(persons.map((p) => p.id === data.id ? data: p))
        setShownPersons(persons.map((p) => p.id === data.id ? data: p).filter(p => p.name.toLowerCase().includes(filter)))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setBannerError(true)
        setBannerMsg(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setBannerError(false)
          setBannerMsg('')
        }, 5000)
        
      })

      return
    }

    // Create new contact
    personsService.create({name: newName, number: newNumber})
    .then(data => {
      setBannerMsg(
        `Added ${data.name} to the phonebook.`
      )
      setTimeout(() => {
        setBannerMsg('')
      }, 5000)

      setPersons(persons.concat(data))
      setShownPersons(persons.concat(data).filter(p => p.name.toLowerCase().includes(filter)))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      setBannerError(true)
      setBannerMsg(
        `${error.response.data.error}`
      )
      setTimeout(() => {
        setBannerError(false)
        setBannerMsg('')
      }, 5000)
    })
  }

  const handleFilterChange = (ev) => {
    setFilter(ev.target.value.toLowerCase())

    setShownPersons(persons.filter(p => p.name.toLowerCase().includes(ev.target.value.toLowerCase())))
  }

  const handleRemove = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id)
      .then(data => {
        setPersons(persons.filter(p => p.id !== person.id))
        setShownPersons(shownPersons.filter(p => p.id !== person.id))
  
        setBannerMsg(
          `Removed ${person.name} contact information.`
        )
        setTimeout(() => {
          setBannerMsg('')
        }, 5000)
      })
      .catch(error => {
        setBannerError(true)
        setBannerMsg(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setBannerError(false)
          setBannerMsg('')
        }, 5000)
        
      })

    }
  }

  // Triggers on first rendering
  useEffect(() => {
    personsService.getAll().then(data => {
      setPersons(data)
      setShownPersons(data)
    })
  }, [])

  return (
    <div>
      <Notification message={bannerMsg} error={bannerError}/>
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