import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './home.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div className='navBar'>
          <img src="img\logo.png" className="logo" alt="logov1" />
          <ul>
            <li>
              <a href="./home.jsx">Home</a>
            </li>
            <li>
              <a href="./home.jsx" target="_blank">Pricing</a>
            </li>
            <li>
              <a href="./home.jsx" target="_blank">Movies</a>
            </li>
            <li>
              <a href="./home.jsx" target="_blank">Sign in</a>
            </li>
          </ul>
        </div>
        
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
