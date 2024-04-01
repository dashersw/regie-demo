import on from '../../lib/on'
import { actions, observe, state, type Todo } from './todo'

const newTodoInput = document.getElementById('new-todo') as HTMLInputElement
const todoList = document.getElementById('todo-list')!
const todoCountLabel = document.getElementById('todo-count')!

function addTodo() {
  const text = newTodoInput.value.trim()

  if (!text) return

  actions.addTodo(text)
  newTodoInput.value = ''
}

on('#add-todo', 'click', addTodo)

newTodoInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') addTodo()
})

on(todoList, 'li button', 'click', function () {
  actions.removeTodo(this.dataset.id)
})

on(todoList, 'li span', 'click', function () {
  actions.toggleTodo(this.dataset.id)
})

observe('todos', (todos: Todo[]) => {
  todoList.innerHTML = todos
    .map(
      todo => `
<li class="${todo.completed ? 'completed' : ''}">
  <div>
    <span data-id="${todo.id}">${todo.text}</span>
    <button data-id="${todo.id}">✗</button>
  </div>
</li>`
    )
    .join('')
})

observe('todos.length', count => {
  todoCountLabel.textContent = `Todo count: ${count}`
})

observe('todos.4.completed', completed => {
  todoCountLabel.textContent = completed
    ? 'You completed the 5th todo!'
    : `Todo count: ${state.todos.length}`
})
