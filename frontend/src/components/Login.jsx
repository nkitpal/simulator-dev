import Input from "../UI/Input";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { Form, useNavigate, NavLink } from "react-router-dom";
import { loginActions, usersActions } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.myUser.loginState);
  const { loading, error, errorMsg, successMsg, status } = loginState;

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputData = Object.fromEntries(formData);
    dispatch(loginActions(inputData));
  }

  function handleCancel() {
    dispatch(usersActions.login({ type: "LOGIN_USER_RESET" }));
    navigate("../");
  }

  function handleCloseSuccessModal() {
    dispatch(usersActions.login({ type: "LOGIN_USER_RESET" }));
    navigate("../question");
  }

  function handleCloseErrorModal() {
    dispatch(usersActions.login({ type: "LOGIN_USER_RESET" }));
    navigate("../500");
  }

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const res = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: authResult["code"],
          }),
        });
        console.log(res);
      }
    } catch (err) {
      console.error("Error while taking response from Google", err);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

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
      <button onClick={googleLogin}>Login with Google</button>
      <p>
        New user? <NavLink to="/signup">Signup</NavLink>
      </p>
    </>
  );
}
