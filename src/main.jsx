import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/login/LoginPage.jsx";
import RegisterPage from "./components/register/RegisterPage.jsx";
import Home from "./components/Home.jsx";
import Search from "./components/searchpage/SearchPage.jsx";
import Anime from "./components/anime/Anime.jsx";
import Play from "./components/playpage/PlayPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:name",
        element: <Search />,
      },
      {
        path: "/anime/:id",
        element: <Anime />,
      },
      {
        path: "/play/:title",
        element: <Play />,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
