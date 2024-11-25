import { createSlice } from "@reduxjs/toolkit";
import { leaderboardActions, leaderboarSlice } from "./leaderboard";

const userDataFromStorage =
  JSON.parse(localStorage.getItem("userData")) || null;

const initialUsersState = {
  userData: userDataFromStorage,

  registerState: {
    loading: false,
    error: false,
    errorMsg: [],
    status: null,
    successMsg: null,
  },

  loginState: {
    loading: false,
    error: false,
    errorMsg: [],
    status: null,
    successMsg: null,
  },

  codeState: {
    loading: false,
    error: false,
    errorMsg: [],
    status: null,
    successMsg: null,
  },

  showUserDataState: {
    loading: false,
    error: false,
    errorMsg: [],
    status: null,
    successMsg: null,
  },
};

export const usersSlice = createSlice({
  name: "Users",
  initialState: initialUsersState,
  reducers: {
    register(state, actions) {
      switch (actions.payload.type) {
        case "REGISTER_USER_REQ":
          {
            state.registerState = {
              loading: true,
              error: false,
              errorMsg: [],
              successMsg: null,
              status: null,
            };
          }
          break;
        case "REGISTER_USER_SUCCESS":
          {
            state.registerState = {
              loading: false,
              error: false,
              errorMsg: [],
              successMsg: actions.payload.message,
              status: null,
            };
          }
          break;
        case "REGISTER_USER_FAIL":
          {
            state.registerState = {
              loading: false,
              error: true,
              errorMsg: actions.payload.errors,
              successMsg: null,
              status: actions.payload.status,
            };
          }
          break;
        case "REGISTER_USER_RESET": {
          state.registerState = {
            loading: false,
            error: false,
            errorMsg: [],
            successMsg: null,
            status: null,
          };
        }
      }
    },

    login(state, actions) {
      switch (actions.payload.type) {
        case "LOGIN_USER_REQ":
          {
            state.loginState = {
              loading: true,
              error: false,
              errorMsg: [],
              status: null,
              successMsg: null,
            };
          }
          break;
        case "LOGIN_USER_SUCCESS":
          {
            state.loginState = {
              loading: false,
              error: false,
              errorMsg: [],
              status: null,
              successMsg: actions.payload.message,
            };

            state.userData = actions.payload.userData;
          }
          break;
        case "LOGIN_USER_FAIL":
          {
            state.loginState = {
              loading: false,
              error: true,
              errorMsg: actions.payload.errors,
              status: actions.payload.status,
              successMsg: null,
            };
          }
          break;
        case "LOGIN_USER_RESET": {
          state.loginState = {
            loading: false,
            error: false,
            errorMsg: [],
            status: null,
            successMsg: null,
          };
        }
      }
    },

    logout(state, actions) {
      state.userData = null;
    },

    code(state, actions) {
      switch (actions.payload.type) {
        case "CODE_SAVE_REQ":
          {
            state.codeState = {
              loading: true,
              error: false,
              errorMsg: [],
              status: null,
              successMsg: null,
            };
          }
          break;
        case "CODE_SAVE_SUCCESS":
          {
            state.codeState = {
              loading: false,
              error: false,
              errorMsg: [],
              status: null,
              successMsg: actions.payload.message,
            };
          }
          break;
        case "CODE_SAVE_FAIL":
          {
            state.codeState = {
              loading: false,
              error: true,
              errorMsg: actions.payload.errors,
              status: actions.payload.status,
              successMsg: null,
            };
          }
          break;
        case "CODE_SAVE_RESET": {
          state.codeState = {
            loading: false,
            error: false,
            errorMsg: [],
            status: null,
            successMsg: null,
          };
        }
      }
    },
  },
});

export const usersActions = usersSlice.actions;

export const registerActions = (formData) => {
  return async (dispatch) => {
    try {
      console.log(formData);
      dispatch(usersActions.register({ type: "REGISTER_USER_REQ" }));

      const response = await fetch("https://simulator-dev-backend.onrender.com/user/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          urn: formData.urn,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.status === 422) {
        const errors = await response.json();
        dispatch(
          usersActions.register({
            type: "REGISTER_USER_FAIL",
            errors: errors.data,
            status: 422,
          })
        );

        return;
      }

      if (!response.ok) {
        throw new Error("could not get response");
      }

      const resData = await response.json();
      if (!resData) {
        throw new Error("could not register user!");
      }

      dispatch(
        usersActions.register({
          type: "REGISTER_USER_SUCCESS",
          message: resData.message,
        })
      );

      // go to login
    } catch (err) {
      dispatch(
        usersActions.register({
          type: "REGISTER_USER_FAIL",
          errors: [err.message],
        })
      );
    }
  };
};

export const loginActions = (authResult) => {
  return async (dispatch) => {
    // try {
    //   dispatch(usersActions.login({ type: "LOGIN_USER_REQ" }));
    //   const response = await fetch("https://simulator-dev-backend.onrender.com/user/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: formData.email,
    //       password: formData.password,
    //     }),
    //   });
    //   if (response.status === 422 || response.status === 401) {
    //     const errors = await response.json();
    //     dispatch(
    //       usersActions.login({
    //         type: "LOGIN_USER_FAIL",
    //         status: response.status,
    //         errors: errors.data,
    //       })
    //     );
    //     return;
    //   }
    //   const resData = await response.json();
    //   if (!resData) {
    //     throw new Error("could not login user");
    //   }
    //   dispatch(
    //     usersActions.login({
    //       type: "LOGIN_USER_SUCCESS",
    //       message: resData.message,
    //       userData: resData.userData,
    //     })
    //   );
    //   localStorage.setItem("userData", JSON.stringify(resData.userData));
    // } catch (err) {
    //   dispatch(
    //     usersActions.login({
    //       type: "LOGIN_USER_FAIL",
    //       errors: [err.message],
    //     })
    //   );
    // }
    try {
      if (!authResult["code"]) {
        throw new Error("Could not login with google");
      }

      const response = await fetch("https://simulator-dev-frontend.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: authResult["code"],
        }),
      });

      if (response.status === 422 || response.status === 401) {
        const errors = await response.json();
        dispatch(
          usersActions.login({
            type: "LOGIN_USER_FAIL",
            status: response.status,
            errors: errors.data,
          })
        );
        return;
      }
      if (!response.ok) {
        throw new Error("Please Login With ADYPU Email-Id");
      }

      const resData = await response.json();
      if (!resData) {
        throw new Error("could not login user");
      }

      dispatch(
        usersActions.login({
          type: "LOGIN_USER_SUCCESS",
          message: resData.message,
          userData: resData.userData,
        })
      );
      localStorage.setItem("userData", JSON.stringify(resData.userData));
    } catch (err) {
      dispatch(
        usersActions.login({
          type: "LOGIN_USER_FAIL",
          errors: [err.message],
        })
      );
    }
  };
};

export const logoutActions = () => {
  return (dispatch) => {
    localStorage.removeItem("userData");
    dispatch(usersActions.logout());
  };
};

export const codeActions = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(usersActions.code({ type: "CODE_SAVE_REQ" }));
      const state = getState();
      const response = await fetch("https://simulator-dev-backend.onrender.com/user/save-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.myUser.userData?.token,
        },
        body: JSON.stringify({
          code: formData.py,
        }),
      });

      if (response.status === 401) {
        // yet to display a message telling user that he has done
        // some malicious activity so we are logging him out
        const errors = await response.json();
        dispatch(
          usersActions.code({
            type: "CODE_SAVE_FAIL",
            errors: [errors.message],
            status: response.status,
          })
        );
        dispatch(logoutActions());
        return;
      }

      if (response.status === 422) {
        const errors = await response.json();
        dispatch(
          usersActions.code({
            type: "CODE_SAVE_FAIL",
            errors: errors.data,
            status: 422,
          })
        );
        return;
      }

      if (!response.ok) {
        // error handling
        throw new Error("could not get response");
      }

      const resData = await response.json();

      dispatch(
        usersActions.code({
          type: "CODE_SAVE_SUCCESS",
          message: resData.message,
        })
      );
      dispatch(
        leaderboardActions.addLeaderBoard({
          individualCoder: resData.individualCoder,
        })
      );
    } catch (err) {
      dispatch(
        usersActions.code({
          type: "CODE_SAVE_FAIL",
          errors: [err.message],
        })
      );
    }
  };
};
