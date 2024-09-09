import larry from '../src/assets/logos/larry.png'
import github from '../src/assets/logos/github.png'
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
        Don't Have an account<a>Sign up</a>
      </p>
    </div>
  )
}

export default App
