import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import ErrorModal from "./ErrorModal";
import { leaderboardActions, loadStudentsActions } from "../store/leaderboard";
import { useNavigate } from "react-router-dom";
import styles from "./Leaderboard.module.css";

export default function LeaderBoard() {
  let loginLoader = false;
  function GoogleAuthWrapper() {
    return (
      <GoogleOAuthProvider clientId="586203942024-okrtupb8i4mja23nmidi5jmkgee300ca.apps.googleusercontent.com">
        <Login loginLoader/>
      </GoogleOAuthProvider>
    );
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coder = useSelector((state) => state.myLeaderboard.coder);
  const showCoderState = useSelector(
    (state) => state.myLeaderboard.showCoderState
  );
  const { loading, error, successMsg, errorMsg, status } = showCoderState;

  function handleCloseErrorModal() {
    if(status === 499){dispatch(leaderboardActions.showLeaderboard({ type: "LEADERBOARD_RESET" }));
    navigate("/question");}
    else{dispatch(leaderboardActions.showLeaderboard({ type: "LEADERBOARD_RESET" }));
    navigate("/500");}
    
  }

  function handleRefreshClick() {
    dispatch(loadStudentsActions());
  }

  if (loading) {
    return <p className={styles.loading}>Loading....</p>;
  }

  // if(loginLoader){
  //   return <p className={styles.loading}>Loading....</p>;
  // }

  return (
    <div className={styles.leaderboardContainer}>
      <h1 className={styles.title}>Leaderboard</h1>
      <div className={styles.authWrapper}>
        <GoogleAuthWrapper />
      </div>
      <div className={styles.listContainer}>
        <ErrorModal
          openModal={error}
          message={errorMsg ? errorMsg[0] : "An error occurred"}
          handleCloseModal={handleCloseErrorModal}
          block={status === 499}
        />
        {error ? null : coder && coder.length > 0 ? (
          <table className={styles.leaderboardTable}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {coder.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>No Data....</p>
        )}
      </div>
      <button
        onClick={handleRefreshClick}
        className={styles.refreshButton}
        disabled={loading}
      >
        Refresh
      </button>
    </div>
  );
}
