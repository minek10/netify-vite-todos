import React, { createContext, PropsWithChildren, useReducer } from "react";
import { useReducerAsync } from "use-reducer-async";
import {Action, Context, State} from './types'

const initialStoreContext:Context = {
    state:{
        todos:[],
        tags:[]
    },
    dispatch:(_a:any)=>{}
}

//Reducer
const reducer = (state:State, action:Action) =>{
    switch(action.type){
        case 'SET_TODOS': 
            console.log('set_todos')
            console.log(action.payload)
            return {...state, todos:action.payload}
        case 'SET_TAGS':
            console.log('SET_TAGS')
            return {...state, tags: action.payload}
        default:return state;
    }
}

const baseHeaders = {
    Accept:'application/json',
    'Content-Type':'application/json'
}
const asyncActionHandler:any={
    FETCHTAGS: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
            console.log('FETCHTODOS')
            const fetchSettings = {
                method:'GET',
                headers:baseHeaders
            }
            try{
                const response = await fetch('http://localhost:8000/tags', fetchSettings)
                const tags = await response.json();
                dispatch({type:'SET_TAGS', payload:tags})
                console.log(tags)
            }catch(e){
                console.log(e)
            }
    },
    FETCHTODOS: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('FETCHTODOS')
        const fetchSettings = {
            method:'GET',
            headers:baseHeaders
        }
        try{
            const response = await fetch('http://localhost:8000/todos?_expand=tag', fetchSettings)
            const todos = await response.json();
            dispatch({type:'SET_TODOS', payload:todos})
            console.log(todos)
        }catch(e){
            console.log(e)
        }
    },
    ADDTODO : ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('FETCHTODOS')
        console.log(action.payload)
        const fetchSettings = {
            method:'POST',
            headers:baseHeaders,
            body:JSON.stringify(action.payload.values)
        }
        try{
            const response = await fetch('http://localhost:8000/todos?_expand=tag', fetchSettings)
            if(!response.ok){
                console.log('error')
            }else{
                try{
                    const fetchSettings = {
                        method:'GET',
                        headers:baseHeaders
                    }
                    const response = await fetch('http://localhost:8000/todos?_expand=tag', fetchSettings)
                    const todos = await response.json();
                    dispatch({type:'SET_TODOS', payload:todos})
                    console.log(todos)
                }catch(e){
                    console.log(e)
                }
            }
            
            //dispatch({type:'SET_TODOS', payload:todos})
            //console.log(todos)
        }catch(e){
            console.log(e)
        }
    },
    DELETETODO : ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('DELETE TODOS')
        console.log(action.payload.id)
        const fetchSettings = {
            method:'DELETE',
            headers:baseHeaders,
        }
        try{
            const response = await fetch(`http://localhost:8000/todos/${action.payload.id}`, fetchSettings)
            if(!response.ok){
                console.log('error')
            }else{
                try{
                    const fetchSettings = {
                        method:'GET',
                        headers:baseHeaders
                    }
                    const response = await fetch('http://localhost:8000/todos?_expand=tag', fetchSettings)
                    const todos = await response.json();
                    dispatch({type:'SET_TODOS', payload:todos})
                    console.log(todos)
                }catch(e){
                    console.log(e)
                }
            }
            
        }catch(e){
            console.log(e)
        }
    }
}
//Context

const storeContext = createContext(initialStoreContext);
const {Provider} = storeContext;
const StateProvider = ({children}:PropsWithChildren<any>) => {
    const [state, dispatch] = useReducerAsync(reducer, initialStoreContext.state, asyncActionHandler);
    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {storeContext, StateProvider}