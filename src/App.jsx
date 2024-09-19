import larry from "./assets/logos/larry.png";
import github from "./assets/logos/github.png";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const clientID = "Ov23lihsmc3VBpj2YIWc"
const redirectURI = "http://localhost:5173/feed"

const clickHandler = async () => {
  const result = fetch("http://localhost:3000/api/v1/users/username", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: document.getElementById("userName").value,
      password: document.getElementById("password").value,
    }),
  }).then(async (res) => {
    const a = await res.json();
    return a;
  });
  return result;
};

function App() {
  const navigate = useNavigate();

  return (
    <div className="logo-box">
      <img src={larry} alt="apple" className="logo" />
      <h2>Sign In to Twitter</h2>
      <a href={`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`}>
      <button >
        <img src={github} alt="apple" />
        Sign in with Github
      </button>
      </a>
      <hr></hr>
      <span>Or</span>
      <form>
        <input type="text" placeholder="Username" id="userName" />
        <input type="password" placeholder="Password" id="password" />
        <button
          onClick={async () => {
            const result = await clickHandler();
            if (result) navigate("feed");
          }}
        >
          Log In
        </button>
      </form>
      <button>Forget Password</button>
      <p>
        Don't Have an account? <Link to="sign-up">sign_up</Link>
      </p>
    </div>
  );
}

export default App;
