import larry from "../assets/logos/larry.png";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const clickHandler = async () => {
  const result = await fetch("http://localhost:3000/api/v1/users", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: document.getElementById("userName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  }).then(async (res) => {
    const a = await res.json();
    return a;
  });

  return result;
};

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="logo-box">
      <img src={larry} alt="apple" className="logo" />
      <h2>Sign Up to Twitter</h2>
      <hr></hr>
      <span>Or</span>
      <form>
        <input type="text" id="userName" placeholder="Username" />
        <input type="email" id="email" placeholder="Email" />
        <input type="password" id="password" placeholder="Password" />
        <button>Next</button>
      </form>
      <button
        onClick={async () => {
          const result = await clickHandler();
          if (result === true) navigate("/");
        }}
      >
        Forget Password
      </button>
      <p>
        Have an account? <Link to="/">log-in</Link>
      </p>
    </div>
  );
}

export default SignUp;
