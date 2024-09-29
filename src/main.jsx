import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignUp from "./modules/SignUp";
import Home from "./modules/Home";
import HomeDisplay from "./modules/displays/modules/HomeDisplay";
import ExplorerDisplay from "./modules/displays/modules/ExplorerDisplay";
import Notifications from "./modules/displays/modules/Notifications";
import "./index.css";
import TweetPage from "./modules/TweetPage";
import PostCommentsDisplay from "./modules/PostCommentsDisplay";
import ProfilePage from "./modules/ProfilePage";
import UsersProfilePage from "./modules/UsersProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "feed",
    element: <Home />,
    children: [
      { path: "home", element: <HomeDisplay /> },
      {
        path: "explore",
        element: <ExplorerDisplay />,
      },
      { path: "notifications", element: <Notifications /> },
      { path: "comments", element: <PostCommentsDisplay /> },
      { path:  "myprofile", element: <ProfilePage />},
      { path: "profile-page", element: <UsersProfilePage />}
    ],
  },
  {
    path: "post",
    element: <TweetPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
