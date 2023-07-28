import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

const App = () => {

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
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

    } catch (error) {
      console.log(error)
      console.log('handlesubmit error')
    }
  }

  return (
      <>
        <SignUpForm />
        <Authenticate />
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
      </>
  )
}

export default App
