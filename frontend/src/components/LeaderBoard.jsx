import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
import Profiles from "./Profiles";
import { useSelector, useDispatch } from "react-redux";
import ErrorModal from "./ErrorModal";
import { leaderboardActions } from "../store/leaderboard";
import { useNavigate } from "react-router-dom";
export default function LeaderBoard() {
  function GoogleAuthWrapper() {
    return (
      <GoogleOAuthProvider clientId="586203942024-okrtupb8i4mja23nmidi5jmkgee300ca.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    );
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coder = useSelector((state) => state.myLeaderboard.coder);

  const showCoderState = useSelector(
    (state) => state.myLeaderboard.showCoderState
  );

  const { loading, error, successMsg, errorMsg } = showCoderState;

  function handleCloseErrorModal() {
    dispatch(leaderboardActions.showLeaderboard({ type: "LEADERBOARD_RESET" }));
    navigate("/500");
  }

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <GoogleAuthWrapper />
      <div>
        <ErrorModal
          openModal={error}
          message={errorMsg[0]}
          handleCloseModal={handleCloseErrorModal}
        />
        {error ? null : coder.length > 0 ? (
          <ul>
            {coder.map((c) => (
              <li key={c._id}>
                <Profiles student={c} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No Data....</p>
        )}
      </div>
    </div>
  );
}
