import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";
import Root from "./components/Root";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import Question from "./components/Question";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  function GoogleAuthWrapper() {
    return (
      <GoogleOAuthProvider clientId="586203942024-okrtupb8i4mja23nmidi5jmkgee300ca.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    );
  }
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
          element: <GoogleAuthWrapper />,
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
