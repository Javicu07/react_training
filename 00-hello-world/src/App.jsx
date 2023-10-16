import './App.css'

export function App () {
  return(
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar' 
          alt="squirrel avatar" 
          src="https://cdn.pixabay.com/photo/2016/03/31/20/31/amazed-1295833_1280.png" />
        <div className='tw-followCard-info'>
          <strong>Squirrel Mike</strong>
          <span className='tw-followCard-infoUserName'>@sq_mike</span>
        </div>
      </header>

      <aside>
        <button className='tw-followCard-button'>
          Seguir
        </button>
      </aside>
  </article>
  )
}