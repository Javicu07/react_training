import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  filterSelected,
  onClearCompleted,
  handleFilterChange
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> tareas pendientes
      </span>

      <Filters
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />
    </footer>
  )
}
