import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { Form, useNavigate, NavLink } from "react-router-dom";
import { loginActions, usersActions } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "./Login.module.css";
export default function Login({loginLoader}) {
  const userData = useSelector((state) => state.myUser.userData);
  const token = userData?.token;
  const googleLogin = useGoogleLogin({
    onSuccess: (authResult) => dispatch(loginActions(authResult)),
    onError: (authResult) => dispatch(loginActions(authResult)),
    flow: "auth-code",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.myUser.loginState);
  const { loading, error, errorMsg, successMsg, status } = loginState;

  function handleSubmit(e) {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const inputData = Object.fromEntries(formData);
    googleLogin();
  }

  // function handleCancel() {
  //   dispatch(usersActions.login({ type: "LOGIN_USER_RESET" }));
  //   navigate("../");
  // }

  function handleCloseSuccessModal() {
    dispatch(usersActions.login({ type: "LOGIN_USER_RESET" }));
    navigate("../question");
  }

  function handleCloseErrorModal() {
    dispatch(usersActions.login({ type: "LOGIN_USER_RESET" }));
    navigate("../");
  }

  // const googleLogin = useGoogleLogin({
  //   onSuccess: responseGoogle,
  //   onError: responseGoogle,
  //   flow: "auth-code",
  // });

  if (loading) {
    loginLoader = true;
    return <p>Submitting....</p>
  }

  return (
    <>
      <SuccessModal
        openModal={successMsg}
        message={successMsg}
        handleCloseModal={handleCloseSuccessModal}
      />
      <ErrorModal
        openModal={error && status !== 422 && status !== 401}
        message={errorMsg[0]}
        handleCloseModal={handleCloseErrorModal}
        block
      />
      {/* <Form onSubmit={handleSubmit}>
        {error && (status === 422 || status === 401) && (
          <ul>
            {errorMsg.map((e) => (
              <li key={e.msg}>{e.msg}</li>
            ))}
          </ul>
        )}
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required />
        <div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Login</button>
        </div>
      </Form> */}
      {!token && (
        <Form onSubmit={handleSubmit}>
          {error && (status === 422 || status === 401) && (
            <ul>
              {errorMsg.map((e) => (
                <li key={e.msg}>{e.msg}</li>
              ))}
            </ul>
          )}
          {/* <Input label="URN" name="urn" type="text" required /> */}
          <div>
          <button type="submit" className={styles.googleButton}>
  <span className={styles.googleIcon}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.32 0 6.14 1.14 8.46 3.02l6.36-6.36C34.24 3.16 29.36 1 24 1 14.06 1 5.64 6.65 2.18 15h7.64c2.26-4.17 6.87-7 12.18-7z"/>
      <path fill="#4285F4" d="M46.5 24c0-1.34-.12-2.64-.34-3.9H24v7.4h12.76c-.56 2.98-2.28 5.5-4.82 7.2v6.04h7.78C44.16 36.15 46.5 30.57 46.5 24z"/>
      <path fill="#FBBC05" d="M10.5 28.9c-.84-2.5-.84-5.3 0-7.8v-6.04H2.18c-2.06 3.75-2.06 8.15 0 11.9l8.32-3.6z"/>
      <path fill="#34A853" d="M24 46.5c5.76 0 10.62-2.3 14.18-6.06l-7.78-6.04c-2.08 1.42-4.8 2.26-7.82 2.26-5.32 0-9.92-3.07-12.18-7.2H2.18l-8.32 3.6c3.46 8.35 11.88 14 21.82 14z"/>
    </svg>
  </span>
  Login with Google
</button>



          </div>
        </Form>
      )}
      {/* <button onClick={googleLogin}>Login with Google</button> */}
    </>
  );
}
