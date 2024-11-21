import Input from "../UI/Input";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { usersActions, registerActions } from "../store/user";
import { NavLink, Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerState = useSelector((state) => state.myUser.registerState);
  const { loading, error, errorMsg, successMsg, status } = registerState;

  function handleCloseErrorModal() {
    dispatch(usersActions.register({ type: "REGISTER_USER_RESET" }));
    navigate("../500");
  }

  function handleCloseSuccessModal() {
    dispatch(usersActions.register({ type: "REGISTER_USER_RESET" }));
    navigate("../login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputData = Object.fromEntries(formData);
    if (inputData.password !== inputData.confirmPassword) {
      dispatch(
        usersActions.register({
          type: "REGISTER_USER_FAIL",
          status: 422,
          errors: [{ msg: "Passwords are not matching" }],
        })
      );

      return;
    }
    dispatch(registerActions(inputData));
  }

  function handleCancel() {
    dispatch(usersActions.register({ type: "REGISTER_USER_RESET" }));
    navigate("../");
  }

  if (loading) {
    return <p>Sumbitting...</p>;
  }

  return (
    <>
      <SuccessModal
        openModal={successMsg}
        message={successMsg}
        handleCloseModal={handleCloseSuccessModal}
      />
      <ErrorModal
        openModal={error && status !== 422}
        handleCloseModal={handleCloseErrorModal}
      />
      <Form method="POST" onSubmit={handleSubmit}>
        {error && status === 422 && (
          <ul>
            {errorMsg.map((e) => (
              <li key={e.msg}>{e.msg}</li>
            ))}
          </ul>
        )}
        <Input label="Name" name="name" type="text" required />
        <Input label="URN" name="urn" type="text" required />
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
        />
        <div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Signup</button>
        </div>
      </Form>
      <p>
        Already user? <NavLink to="/login">Login</NavLink>
      </p>
    </>
  );
}
