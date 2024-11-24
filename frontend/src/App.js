import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import Question from "./components/Question";
import { loadStudentsActions } from "./store/leaderboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginGuard from "./components/LoginGuard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudentsActions());
  }, []);
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
          path: "question",
          element: (
            <LoginGuard>
              <Question />
            </LoginGuard>
          ),
        },
      ],
    },
    {
      path: "/500",
      element: <ErrorPage />,
    },
    { path: "*", element: <ErrorPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
