// preState={} : 처음 값은 비어있음
export default function(preState={}, action) {

    console.log(action)
    
    switch (action.type) {
        case "LOGIN_USER":
            return { ...preState, loginSuccess: action.payload}
        case "REGISTER_USER":
            return {...preState, register: action.payload}
        default:
            return preState;
    }

}

