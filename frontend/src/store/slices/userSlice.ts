import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { User, userState } from "../../interfaces/userInterface";

const initialState: userState = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchAllUsersRequest: (state) => {
      state.loading = true;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    },
    fetchAllUsersFailed: (state) => {
      state.loading = false;
    },
    addNewAdminRequest: (state) => {
      state.loading = true;
    },
    addNewAdminSuccess: (state) => {
      state.loading = false;
    },
    addNewAdminFailed: (state) => {
      state.loading = false;
    },
  },
});

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
  dispatch(userSlice.actions.fetchAllUsersRequest());
  await axios
    .get("/user/all")
    .then((res) => dispatch(userSlice.actions.fetchAllUsersSuccess(res.data)))
    .catch((err) => {
      console.error(err);
      dispatch(userSlice.actions.fetchAllUsersFailed());
    });
};

export const addNewAdmin = (data: FormData) => async (dispatch: Dispatch) => {
  dispatch(userSlice.actions.addNewAdminRequest());
  await axios
    .post("/user/add/new-admin", data)
    .then((res) => {
      dispatch(userSlice.actions.addNewAdminSuccess());
      toast.success(res.data.data);
    })
    .catch((err: AxiosError) => {
      dispatch(userSlice.actions.addNewAdminFailed());
      const errorData = err.response?.data as {
        errorResponse: { message: string };
      };
      toast.error(errorData?.errorResponse.message);
    });
};

export default userSlice.reducer;
