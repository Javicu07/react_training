import { FILTERS_BUTTONS } from '../consts.ts'
import { type FilterValue } from '../types.d'

interface Props {
  handleFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
}

export const Filters: React.FC<Props> = ({ filterSelected, handleFilterChange }) => {
  return (
    <ul className="filters">
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = key === filterSelected
          const filterClassName = isSelected ? 'selected' : ''

          const handleClick = (filter: FilterValue) => (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            handleFilterChange(filter)
          }

          return (
            <li key={key}>
              <a
                href={href}
                className={filterClassName}
                onClick={handleClick(key as FilterValue)}
              >
                {literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
