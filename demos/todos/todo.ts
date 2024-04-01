import regie from 'regie'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

let nextTodoId = 0

const { observe, actions, state } = regie({
  initialState: {
    todos: [] as Todo[]
  },
  actions: {
    addTodo({ state }, text: string) {
      state.todos.push({
        id: `${nextTodoId++}`,
        text,
        completed: false
      })
    },
    toggleTodo({ state }, id: string) {
      const todo = state.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo({ state }, id: string) {
      state.todos = state.todos.filter(todo => todo.id !== id)
    }
  }
})

export { observe, actions, state }
