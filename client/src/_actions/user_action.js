import axios from 'axios'

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/user/login', dataToSubmit)
                        .then(res => res.data)

    console.log(request)
    
    return {
        type: "LOGIN_USER",
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/user/register', dataToSubmit)
        .then(res => res.data)

    return {
        type: "REGISTER_USER",
        payload: request
    }
}