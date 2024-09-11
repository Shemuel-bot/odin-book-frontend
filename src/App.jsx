import larry from './assets/logos/larry.png'
import github from './assets/logos/github.png'
import { Link } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className="logo-box">
      <img src={larry} alt="apple" className="logo" />
      <h2>Sign In to Twitter</h2>
      <button>
        <img src={github} alt="apple" />
        Sign in with Github
      </button>
      <hr></hr>
      <span>Or</span>
      <form>
        <input type="text" placeholder="Phone email or username" />
        <input type="password" placeholder="Password" />
        <button>Next</button>
      </form>
      <button>Forget Password</button>
      <p>
        Don't Have an account? <Link to='sign-up'>sign_up</Link>
      </p>
    </div>
  )
}

export default App
