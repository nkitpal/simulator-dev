import { createSlice } from "@reduxjs/toolkit";

const initialCoderState = {
  coder: [],

  showCoderState: {
    loading: false,
    error: false,
    successMsg: "",
    errorMsg: [],
  },
};

export const leaderboarSlice = createSlice({
  name: "leaderboard",
  initialState: initialCoderState,
  reducers: {
    showLeaderboard(state, actions) {
      switch (actions.payload.type) {
        case "LEADERBOARD_REQUEST": {
          state.showCoderState = {
            loading: true,
            error: false,
            errorMsg: [],
            successMsg: "",
          };
          break;
        }
        case "LEADERBOARD_SUCCESS": {
          state.coder = actions.payload.coder;
          state.showCoderState = {
            loading: false,
            error: false,
            errorMsg: [],
            successMsg: actions.payload.msg,
          };
          break;
        }
        case "LEADERBOARD_FAIL": {
          state.showCoderState = {
            loading: false,
            error: true,
            errorMsg: actions.payload.errors,
            successMsg: "",
          };
          break;
        }

        case "LEADERBOARD_RESET": {
          state.showCoderState = {
            loading: false,
            error: false,
            errorMsg: [],
            successMsg: "",
          };
        }
      }
    },
    addLeaderBoard(state, actions) {
      state.coder.push(actions.payload.individualCoder);
    },
  },
});

export const leaderboardActions = leaderboarSlice.actions;

export const loadStudentsActions = () => {
  return async (dispatch) => {
    try {
      dispatch(
        leaderboardActions.showLeaderboard({ type: "LEADERBOARD_REQUEST" })
      );

      const response = await fetch( process.env.REACT_APP_FRONTEND_URL +"/user/leaderboard", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("could not get response");
      }

      const resData = await response.json();

      if (!resData) {
        throw new Error("could not load products");
      }

      dispatch(
        leaderboardActions.showLeaderboard({
          type: "LEADERBOARD_SUCCESS",
          coder: resData.coder,
          msg: resData.message,
        })
      );
    } catch (err) {
      // error handling
      dispatch(
        leaderboardActions.showLeaderboard({
          type: "LEADERBOARD_FAIL",
          errors: [err.message],
        })
      );
    }
  };
};
