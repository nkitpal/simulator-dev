import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";
import Root from "./components/Root";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import Question from "./components/Question";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <LeaderBoard />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "question",
          element: <Question />,
        },
      ],
    },
    {
      path: "/500",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
