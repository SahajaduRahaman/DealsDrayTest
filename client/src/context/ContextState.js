import React, { useReducer } from 'react'
import AuthContext from './ContextApi'

const initialState = {
    authToken : localStorage.getItem("authToken"),
}

const ReducerFunction = (state, action) => {
    switch (action.type) {
        case "login" :
            return { authToken : localStorage.getItem("authToken") }
        case "logout" :
            return { authToken : "" }
        default : {
            return state;
        }
    }
}


const ContextState = (props) => {
    const [state, dispatch] = useReducer(ReducerFunction, initialState)

    return (
        <AuthContext.Provider value={{state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default ContextState