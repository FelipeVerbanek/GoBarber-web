
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

//Cria os dados no local storage do auth e user
export default reducers =>{
    const persistedReducer = persistReducer({
        key: 'root',
        storage,
        whitelist: ['auth', 'user']
    }, reducers)

    return persistedReducer
}