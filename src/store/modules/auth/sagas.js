import {takeLatest, call, put, all} from 'redux-saga/effects'
import {toast} from 'react-toastify'

import api from '~/services/api'
import history from '~/services/history'

import { signInSuccess, signFailure} from './actions'

/*
    Function signIn
    Responsável por realizar a quesição na api, verificar se o as credenciais de login
    estão corretas, e envia os dados do usuário e token para a action signInSuccess
*/
export function* signIn({payload}){
    try {
        const {email, password} = payload

        const response = yield call(api.post, 'sessions', {
            email,
            password
        })
    
        const { token, user} = response.data
    
        if(!user.provider){
            
            toast.error('Usuário não é prestador')
            return
        }


        yield put(signInSuccess(token, user))
        history.push('/dashboard')
    }catch(err){
        toast.error('Falha na autenticação, verifique seus dados!')
        yield put(signFailure())
    }

}
/*
    Function signUp
    Responsável por realizar a requisição de cadastramento de usuário
*/
export function* signUp({payload}){
    try{
        const {name, email, password} = payload


        yield call(api.post, 'users', {
            name, email, password, provider: true
        })
        toast.success('Cadastro realizado com sucesso!')
        history.push('/')
    }catch(err){
        toast.error('Falha no cadastro, verifique seus dados!')
        yield put(signFailure())
    }
    
}
// Verifica se tem token de autorização e seta no header do axios para realizar as operações na api
export function setToken({payload}){
    if(!payload)return 

    const {token} = payload.auth
    if(token){
        ///Setando propriedade authorization no axios para realização de requisição  autenticada
        api.defaults.headers.Authorization = `Bearer ${token}`
    }
}

export function signOut(){
    history.push('/')
}

//Responsavel por ouvir  as sagas disparadas nas actions
export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut)
]);