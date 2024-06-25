import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: '040-1234567'}
  ]) 
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

    setPersons(persons.concat({id: persons.length, name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
      </div>
    </div>
  )
}

export default App