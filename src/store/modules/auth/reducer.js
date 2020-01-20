import produce from 'immer'

const INITIAL_STATE = {
    token: null,
    signed: false,
    loading: false
}

export default function auth(state = INITIAL_STATE, action){
    //Propriedades setadas para controle das actions
    return produce(state, draft => {
        switch(action.type){
            case '@auth/SIGN_IN_REQUEST': {
                draft.token = action.payload.token
                draft.signed = false
                draft.loading = true
                break
            }

            case '@auth/SIGN_IN_SUCCESS':{
                draft.token = action.payload.token
                draft.signed = true
                draft.loading = false
                break
            }
            case '@auth/SIGN_IN_FAILURE':{
                draft.loading = false
                break
            }
            case '@auth/SIGN_OUT':{
                draft.token = null;
                draft.signed = null;
                break
            }
            default:
                
        }
    });
}