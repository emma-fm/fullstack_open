import { useState, useEffect } from 'react'
import loginService from '../services/login'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with ', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      onLogin(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      onLogin(null)
      console.log('Error logging in')
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )


}

export default LoginForm