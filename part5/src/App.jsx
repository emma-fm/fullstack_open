import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
    {user === null ?
        <div>
        <h2>log in to application</h2>
        <LoginForm onLogin={handleLogin}/>
        </div>
        :
        <div>
        <h2>blogs</h2>
        <BlogList user={user} onLogout={handleLogout}/>
        </div>
    }
    </div>
  )
}

export default App