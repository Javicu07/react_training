import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Angel Duran',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo Hernandez',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hernandez',
    isFollowing: false
  },
  {
    userName: 'TMChein',
    name: 'Tomas Chang',
    isFollowing: true
  }
]

export function App () {
  
  return(
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing}) => {
            <TwitterFollowCard
              key={userName}
              userName={userName} 
              name={name} 
              initialIsFollowing={isFollowing} />
        })
      }
    </section>
  )
}