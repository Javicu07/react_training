import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {
  
  return(
    <section className='App'>
      <TwitterFollowCard userName="midudev" name="Miguel A. Duran" />
      <TwitterFollowCard userName="pheralb" name="Pablo Hernandez" />
    </section>
  )
}