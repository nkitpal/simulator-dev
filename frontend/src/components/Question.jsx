import { Form } from "react-router-dom";
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { codeActions, usersActions } from "../store/user";
import { useSelector } from "react-redux";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import "./Question.css";

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

    // Dispatch action to run code against test cases
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
    <div className="questionArea">
      <h1>Prisoner's  Dilemma</h1>
     <hr></hr>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, numquam, sit labore ipsum id, nobis quo eveniet dicta pariatur harum mollitia iste. Neque aspernatur eius sint perspiciatis voluptas maiores ipsa? Architecto quibusdam obcaecati ex ut illo maxime quis fuga laudantium, nobis dolores iste reiciendis ab esse eum aliquid ad a? Quae, quas. Nesciunt ratione vel earum voluptas consequatur quas rerum et quibusdam eius laudantium porro non aut accusantium doloribus, atque iure soluta natus laborum possimus quos aliquid cupiditate voluptatum, sapiente repudiandae! Ad inventore sit impedit alias sint doloribus deleniti voluptatum harum, tempora eveniet cumque omnis doloremque asperiores, corrupti sed aliquid.</p>
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
        <label htmlFor="python">Python Code</label>
        <textarea name="py" id="python" required placeholder="def make_move(moves):"/>
        <div className="buttonContainer">
          <button
            type="button"
            onClick={handleCancel}
            disabled={onSubmitting}
            className="cancelButton"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={onSubmitting}
            className="submitButton"
          >
            Upload
          </button>
        </div>
      </Form>
    </div>
  );
}
