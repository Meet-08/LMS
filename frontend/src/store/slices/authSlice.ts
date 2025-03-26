import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthState, User } from "../../interfaces/userInterface";

const initialState: AuthState = {
  loading: false,
  error: null,
  message: null,
  user: null,
  isAuthenticated: false,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      console.log("registerSuccess", action);
      state.loading = false;
      state.message = action.payload.data;
      state.error = null;
    },
    registerFailed: (state, action) => {
      console.log("registerFailed", action);
      console.log(action);
      state.loading = false;
      state.error = action.payload.errorResponse.message;
    },

    otpVerificationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess: (state, action) => {
      console.log("otpVerificationSuccess", action);
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.message = "Account verified";
    },
    otpVerificationFailed: (state, action) => {
      console.log("otpVerificationFailed", action);
      state.loading = false;
      state.error = action.payload.errorResponse.message;
    },

    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      console.log("Login success", action);
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.message = "User login successful";
    },
    loginFailed: (state, action) => {
      console.log("Login failed", action);
      state.loading = false;
      state.error = action.payload.errorResponse.message;
      state.message = null;
    },

    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess: (state, action) => {
      console.log("Logout success", action);
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload.data;
    },
    logoutFailed: (state, action) => {
      console.log("Logout failed", action);
      state.loading = false;
      state.error = action.payload.errorResponse.message;
      state.message = null;
    },

    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.authChecked = false;
    },
    getUserSuccess: (state, action) => {
      console.log("getUser success", action);
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.message = action.payload.message;
      state.authChecked = true;
    },
    getUserFailed: (state, action) => {
      console.log("getUser failed", action);
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.authChecked = true;
    },

    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess: (state, action) => {
      console.log("forgotPassword success", action);
      state.loading = false;
      state.message = action.payload.data;
    },
    forgotPasswordFailed: (state, action) => {
      console.log("forgotPassword failed", action);
      state.loading = false;
      state.error = action.payload.errorResponse.message;
    },

    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      console.log("resetPassword success", action);
      state.loading = false;
      state.message = action.payload;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailed: (state, action) => {
      console.log("resetPassword failed", action);
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess: (state, action) => {
      console.log("updatePassword success", action);
      state.loading = false;
      state.message = action.payload.data;
    },
    updatePasswordFailed: (state, action) => {
      console.log("updatePassword failed", action);
      state.loading = false;
      state.error = action.payload;
    },

    resetAuthSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.user = state.user;
      state.isAuthenticated = false;
    },
  },
});

type passwordType = {
  user?: User | null;
  newPassword?: string;
  password: string;
  confirmPassword: string;
};
export const resetAuthSlice = () => (dispatch: Dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};
export const register = (user: User) => async (dispatch: Dispatch) => {
  dispatch(authSlice.actions.registerRequest());

  await axios
    .post("auth/register", user)
    .then((res) => {
      dispatch(authSlice.actions.registerSuccess(res.data));
    })
    .catch((err: AxiosError) => {
      dispatch(authSlice.actions.registerFailed(err.response?.data));
    });
};

export const otpVerification =
  (email: string, otp: string) => async (dispatch: Dispatch) => {
    dispatch(authSlice.actions.otpVerificationRequest());

    await axios
      .post("auth/verify-otp", { email, otp })
      .then((res) => {
        dispatch(authSlice.actions.otpVerificationSuccess(res.data));
      })
      .catch((err: AxiosError) => {
        dispatch(authSlice.actions.otpVerificationFailed(err.response?.data));
      });
  };

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(authSlice.actions.loginRequest());

    await axios
      .post("auth/login", { email, password })
      .then((res) => {
        dispatch(authSlice.actions.loginSuccess(res.data));
      })
      .catch((err: AxiosError) => {
        dispatch(authSlice.actions.loginFailed(err.response?.data));
      });
  };

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(authSlice.actions.logoutRequest());

  await axios
    .get("auth/logout")
    .then((res) => {
      dispatch(authSlice.actions.logoutSuccess(res.data));
    })
    .catch((err: AxiosError) => {
      dispatch(authSlice.actions.logoutFailed(err.response?.data));
    });
};

export const getUser = () => async (dispatch: Dispatch) => {
  dispatch(authSlice.actions.getUserRequest());

  await axios
    .get("auth/me")
    .then((res) => {
      dispatch(authSlice.actions.getUserSuccess(res.data));
    })
    .catch((err: AxiosError) => {
      dispatch(authSlice.actions.getUserFailed(err.response?.data));
    });
};

export const forgotPassword = (email: string) => async (dispatch: Dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());

  await axios
    .post("auth/password/forgot", { email })
    .then((res) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data));
    })
    .catch((err: AxiosError) => {
      dispatch(authSlice.actions.forgotPasswordFailed(err.response?.data));
    });
};

export const resetPassword =
  (data: passwordType, token: string) => async (dispatch: Dispatch) => {
    dispatch(authSlice.actions.resetPasswordRequest());

    await axios
      .put(`auth/password/reset/${token}`, data)
      .then((res) => {
        dispatch(authSlice.actions.resetPasswordSuccess(res.data));
      })
      .catch((err: AxiosError) => {
        dispatch(authSlice.actions.resetPasswordFailed(err.response?.data));
      });
  };

export const updatePassword =
  (data: passwordType) => async (dispatch: Dispatch) => {
    dispatch(authSlice.actions.updatePasswordRequest());

    await axios
      .put(`auth/password/update`, data)
      .then((res) => {
        dispatch(authSlice.actions.updatePasswordSuccess(res.data));
      })
      .catch((err: AxiosError) => {
        dispatch(authSlice.actions.updatePasswordFailed(err.response?.data));
      });
  };

export default authSlice.reducer;
