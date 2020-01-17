
//Action disparada no momento do login
export function signInRequest(email, password){
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: {
            email,
            password
        }
    }
}
//Action disparado ao obter sucesso no login
export function signInSuccess(token, user){
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: {token, user}
    }
}
//Action disparada ao criar um novo usuário
export function signUpRequest(name, email, password){
    return {
        type: '@auth/SIGN_UP_REQUEST',
        payload: {name, email, password}
    }
}

//Action disparada quando ocorre falha no processo
export function signFailure(){
    console.log('failed')
    return {
        type: '@auth/SIGN_IN_FAILURE'
    }
}