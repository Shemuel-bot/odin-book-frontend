import larry from "./assets/logos/larry.png";
import github from "./assets/logos/github.png";
import "./App.css";

const clientID = "Ov23lihsmc3VBpj2YIWc"
const redirectURI = "https://vigilant-giggle-jjjvjvg4wpr92j7q7-5173.app.github.dev/feed"

function App() {

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
    </div>
  );
}

export default App;
