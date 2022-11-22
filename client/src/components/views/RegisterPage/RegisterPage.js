import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'

function RegisterPage(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [Name, setName] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Password, setPassword] = useState(null)
  const [PassConfirm, setPassConfirm] = useState(null)

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onPassConfirmHandler= (event) => {
    setPassConfirm(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if(Password != PassConfirm) {
      alert("암호가 다릅니다.")
      return
    }

    var body = {
      name : Name,
      email: Email,
      password: Password
    }

    dispatch(registerUser(body)) // Action
      .then(res => {
        if (res.payload.register) {
          navigate('/') // 페이지 이동
        }
        else {
          alert("Error")
        }
      }
      )
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>

      <form onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input type="name" value={Name} onChange={onNameHandler} />
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Password</label>
        <input type="password" value={PassConfirm} onChange={onPassConfirmHandler} />
        <br />
        <button>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
