import { createSlice } from "@reduxjs/toolkit";

const initialCoderState = {
  coder: [],

  showCoderState: {
    loading: false,
    error: false,
    successMsg: "",
    errorMsg: [],
    status: null,
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
            status: null,
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
            status: null,
          };
          break;
        }
        case "LEADERBOARD_FAIL": {
          state.showCoderState = {
            loading: false,
            error: true,
            errorMsg: actions.payload.errors,
            successMsg: "",
            status: actions.payload.status || 500,
          };
          break;
        }

        case "LEADERBOARD_RESET": {
          state.showCoderState = {
            loading: false,
            error: false,
            errorMsg: [],
            successMsg: "",
            status: null
          };
        }
      }
    },

    addLeaderBoard(state, actions) {
      const searchCoder = state.coder.find(c => c._id === actions.payload.individualCoder._id)
      if(!searchCoder){
        state.coder.push(actions.payload.individualCoder)
      }
      
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

      const response = await fetch("http://localhost:8080/user/leaderboard", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("could not get response");
      }

      const resData = await response.json();

      if (!resData) {
        throw new Error("could not load products");
      }
      
      const studentIdx = resData.coder.findIndex(c => c._id === JSON.parse(localStorage.getItem("userData"))?.id)

      if(resData.coder[studentIdx]?.error){
        dispatch(
          leaderboardActions.showLeaderboard({
            type: "LEADERBOARD_FAIL",
            status: 499,
            errors: [resData.coder[studentIdx]?.error],
          })
        );
        return
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
