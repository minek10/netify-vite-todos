import { Dispatch } from "react"

type Context ={state:State,dispatch:Dispatch<Action>}

interface State {
    todos:Todo[],
    tags:Tag[]
}
interface Todo {
    id:any,
    title:string,
    tag:{name:string}
}

interface Tag{
    id:any,
    name:string
}

type Action = 
    | SetTodos
    | FetchTodos
    | AddTodo
    | DeleteTodo
    | FetchTags
    | SetTags


interface AddTodo{
    type:'ADDTODO',
    payload:any
}

interface DeleteTodo{
    type:'DELETETODO',
    payload:any
}

interface SetTodos{
    type:'SET_TODOS',
    payload:Todo[]
}

interface SetTags{
    type:'SET_TAGS',
    payload:Tag[]
}

interface FetchTodos{
    type:'FETCHTODOS'
    payload:any
}

interface FetchTags{
    type:'FETCHTAGS'
    payload:any
}