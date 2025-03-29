import { useEffect, useState } from "react";
import { store } from "../store/store";
import { useSelector } from "react-redux";
import { User } from "../interfaces/userInterface";
import axios from "axios";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAuth = () => useSelector((state: RootState) => state.auth);

export const useUser = (id: number | string) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`user/admin/${id}`);
        setUser(response.data);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  return { user, error, loading };
};
