import { useState } from 'react'
import { Todos } from './components/Todos'
import { type TodoId, type Todo as TodoType } from './types'

const mockTodos = [
  {
    id: 1,
    title: 'title 1',
    completed: false
  },
  {
    id: 2,
    title: 'title 2',
    completed: true
  },
  {
    id: 3,
    title: 'title 3',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)

    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <h1>ToDo App</h1>
      <div>
        <Todos
          onToggleCompleted={handleCompleted}
          onRemoveTodo={handleRemove}
          todos={todos}
        />
      </div>
    </div>
  )
}

export default App
