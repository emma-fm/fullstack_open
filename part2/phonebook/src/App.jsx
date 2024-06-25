import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddContact = (ev) => {
    ev.preventDefault()
    setPersons(persons.concat({id: persons.length, name: newName}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={(ev) => setNewName(ev.target.value)} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick={handleAddContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(p => <p key={p.id}>{p.name}</p>)}
      </div>
    </div>
  )
}

export default App