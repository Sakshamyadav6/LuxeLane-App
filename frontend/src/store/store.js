import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slice/loginslice'

export const store = configureStore({
    reducer: {
        auth:loginReducer,
    },
})
 