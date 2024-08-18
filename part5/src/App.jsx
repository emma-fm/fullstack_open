import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
    {user === null ?
        <div>
        <LoginForm onLogin={handleLogin}/>
        </div>
        :
        <div>
        <BlogList user={user} onLogout={handleLogout}/>
        </div>
    }
    </div>
  )
}

export default App