import React, { useEffect } from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'

function LoginPage(props) {

    // useState는 react 라이브러리에서 가져온다
    // useState("여기")에서 '여기'부분은 처음값에 대한 설정이다.
    const [Email, setEmail] = useState(null)
    const [Password, setPassword] = useState(null)

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        var body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)) // Action
            .then(res => {
                if(res.payload.loginSuccess) {
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
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage