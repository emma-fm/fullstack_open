import { useState } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = (user) => {
    setUser(user)
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
        <BlogList user={user}/>
        </div>
    }
    </div>
  )
}

export default App