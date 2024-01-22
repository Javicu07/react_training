import { Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'

export function CreateNewUser () {
  const { addUser } = useUserActions()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string
    addUser({ name, email, github })
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>Create new user</Title>

      <form onSubmit={handleSubmit} className=''>
        <TextInput
          name='name'
          placeholder='Aquí el nombre'
        />
        <TextInput
          name='email'
          placeholder='Aquí el email'
        />
        <TextInput
          name='github'
          placeholder='Aquí el usuario de GitHub'
        />

        <div>
          <Button
            type='submit'
            style={{ marginTop: '16px' }}
          >
            Crear usuario
          </Button>
        </div>
      </form>
    </Card>
  )
}
