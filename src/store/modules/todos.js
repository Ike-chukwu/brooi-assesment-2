const state = {
    todos:[
    ]
}

const getters = {
    allTodos:(state) => state.todos
}

const actions = {

    //adds new todoItem
    addTodo({commit}, task){
         commit('newTodo', task)
    }, 
    
    //deletes todoItem with id passed in
    deleteTodos({commit}, id){
         commit('removeTodo', id)
    },

    //edits todoItem with object passed in
    updateTodos({commit}, updatedTodo){
         commit('replaceTodo', updatedTodo)
    }, 

    //updates todoItem with object passed in
    updateCompletionStatus({commit}, updatedTodoList){
         commit('fullArrayUpdate', updatedTodoList)
    }, 

}


const mutations = {

    newTodo:(state, task) => (
state.todos.push(task)
    ),

    removeTodo:(state, id) => (
state.todos = state.todos.filter(todo => todo.id !== id)
    ),

    replaceTodo:(state, updatedTodo) => {
        const listOfTasksCopy = [...state.todos]
        const actualTaskObj = listOfTasksCopy.find(
            (task) => task.id == updatedTodo.id
            );
            actualTaskObj.taskValue = updatedTodo.taskValue;
            state.todos = listOfTasksCopy;
        },

    fullArrayUpdate:(state, updatedArray) => (
    state.todos = updatedArray
        ),
    }

export default {
    state,
    getters,
    actions,
    mutations
}