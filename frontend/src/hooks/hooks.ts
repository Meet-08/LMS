import { store } from "../store/store";
import { useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAuth = () => useSelector((state: RootState) => state.auth);
