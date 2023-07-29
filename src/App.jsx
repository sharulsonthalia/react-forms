import { useState, useEffect } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

const App = () => {

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [token, setToken] = useState(null)
const [error, setError] = useState(null)


const usernameInputChange = (event) => {
  console.log(event.target.value);
  setUsername(event.target.value);
  }

const passwordInputChange = (event) => {
  console.log(event.target.value);
  setPassword(event.target.value);
  }

  const handlesubmit = async(event) => {
    try{
    event.preventDefault()
    const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
      method: 'POST',
      body: JSON.stringify(
        {
          "username":username,
          "password":password,
      }),
      headers: {'Content-Type':'application/json'}
    })

    const data = await response.json()
    console.log(data)
    setToken(data.token)
    return token

    } catch (error) {
      console.log(error)
      console.log('handlesubmit error')
    }
  }

  useEffect(() => {
    console.log(token) 
  }, [token])
  
  return (
      <>
        <SignUpForm setToken = {setToken} token = {token} />
        <form onSubmit = {handlesubmit}>
          <label>
            Username: <input 
              placeholder='Enter Username'
              value = {username}
              onChange = {usernameInputChange}
            ></input>
          </label>

          <br/><br/>

          <label>
            Password: <input  
              placeholder='Enter Password'
              value = {password}
              onChange = {passwordInputChange}
            ></input>
          </label>
          
          <br/><br/>

          <button type="submit">Submit</button>
        </form>

        <Authenticate setToken = {setToken} token = {token} />

      </>
  )
}

export default App
