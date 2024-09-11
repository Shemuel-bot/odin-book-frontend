
import App from "./App.jsx";
import SignUp from "./modules/SignUp.jsx";

const routes = [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },
];
  
export default routes