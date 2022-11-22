import React, {useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function LandingPage() {
    useEffect(() => {
        axios.get('/api/hello')
            .then(res => console.log(res.data))
    }, [])

    const navigate = useNavigate()

    const onLogoutHandler = (event) => {
        axios.get('/api/users/logout')
            .then(res => {
                if(res.data.success)
                    navigate('/login')
                else
                    alert('Logout Error')
            })


        
    }

    return (
        <div>
            LandingPage 랜딩페이지
            <button onClick={onLogoutHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage;