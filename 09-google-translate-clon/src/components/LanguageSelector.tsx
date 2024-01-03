import { Form } from 'react-bootstrap'
import { SUPPORTED_LANGUAGES } from '../constants'
import { type FC } from 'react'
import { type Language } from '../types'

interface Props {
  onChange: (language: Language) => void
}

export const LanguageSelector: FC<Props> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language) // Forzar el evento string que lo trate como Language
  }

  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange}>
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
        {literal}
      </option>
      ))}
    </Form.Select>
  )
}
