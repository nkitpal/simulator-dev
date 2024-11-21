import { Form } from "react-router-dom";
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { codeActions } from "../store/user";

export default function Question() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigation = useNavigation();
  const onSubmitting = navigation.state === "submitting";

  const codeState = useSelector((state) => state.myUser.codeState);
  const { loading, error, errorMsg, successMsg, status } = codeState;

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputData = Object.fromEntries(formData);

    // send to external api to run it against test cases

    dispatch(codeActions(inputData));
  }

  function handleCloseSuccessModal() {
    dispatch(usersActions.code({ type: "CODE_SAVE_RESET" }));
    navigate("../");
  }

  function handleCloseErrorModal() {
    dispatch(usersActions.code({ type: "CODE_SAVE_RESET" }));
    navigate("../500");
  }

  function handleCancel() {
    navigate("../");
  }
  return (
    <div>
      <p>Question Text</p>
      <SuccessModal
        openModal={successMsg}
        message={successMsg}
        handleCloseModal={handleCloseSuccessModal}
      />
      <ErrorModal
        openModal={error && status !== 422}
        message={errorMsg[0]}
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
        <label id="python">Python Code</label>
        <textarea name="py" type="text" id="python" required />
        <div>
          <button type="button" onClick={handleCancel} disabled={onSubmitting}>
            Cancel
          </button>
          <button disabled={onSubmitting}>upload</button>
        </div>
      </Form>
    </div>
  );
}
