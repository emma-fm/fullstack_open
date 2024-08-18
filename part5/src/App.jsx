import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [bannerMsg, setBannerMsg] = useState('')
  const [bannerError, setBannerError] = useState(false)

  const createBannerMsg = (msg) => {
    setBannerError(false)
    setBannerMsg(msg)
    setTimeout(() => {
      setBannerMsg('')
    }, 5000)
  }

  const createBannerError = (msg) => {
    setBannerError(true)
    setBannerMsg(msg)
    setTimeout(() => {
      setBannerMsg('')
    }, 5000)
  }

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (user) => {
    if (user === null) {
      createBannerError(`Wrong credentials`)
    }
    else {
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      createBannerMsg(`Successfully logged in as ${user.name}`)
    }

  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    createBannerMsg(`Successfully logged out`)
  }

  const handleCreate = (blog) => {
    if (blog === null) {
      createBannerError(`Error creating the blog`)
    }
    else {
      createBannerMsg(`Blog ${blog.title} successfully created`)
    }
  }

  return (
    <div>
    <Notification message={bannerMsg} error={bannerError}/>
    {user === null ?
        <div>
        <LoginForm onLogin={handleLogin}/>
        </div>
        :
        <div>
        <BlogList user={user} onLogout={handleLogout} onCreate={(handleCreate)}/>
        </div>
    }
    </div>
  )
}

export default App