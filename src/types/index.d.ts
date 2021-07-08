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
    type:'ADDTODOS',
    payload:any
}

interface DeleteTodo{
    type:'DELETETODOS',
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
    payload:Todo[]
}

interface FetchTags{
    type:'FETCHTAGS'
    payload:any
}