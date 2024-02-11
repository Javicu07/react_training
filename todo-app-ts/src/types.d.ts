// 'interface' es más fácil de extender, ya que es un contrato de un objeto, es mejor
// usarla en vez emplear 'type'
export interface Todo {
  id: number
  title: string
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]
