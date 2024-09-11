import larry from '../assets/logos/larry.png'
import '../App.css'
import { Link } from 'react-router-dom'
function SignUp() {

  return (
    <div className="logo-box">
      <img src={larry} alt="apple" className="logo" />
      <h2>Sign Up to Twitter</h2>
      <hr></hr>
      <span>Or</span>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Next</button>
      </form>
      <button>Forget Password</button>
      <p>
        Have an account? <Link to="/">log-in</Link>
      </p>
    </div>
  )
}

export default SignUp
