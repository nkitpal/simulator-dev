import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { Form, useNavigate, NavLink } from "react-router-dom";
import { loginActions, usersActions } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
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
    <p>Submitting....</p>;
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
            <button type="submit">Login with Google</button>
          </div>
        </Form>
      )}
      {/* <button onClick={googleLogin}>Login with Google</button> */}
    </>
  );
}
