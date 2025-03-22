import { useEffect, useState } from "react";
import { useAuth } from "../hooks/hooks";

const Header = () => {
  const { user } = useAuth();

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = date.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
      setCurrentDate(
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    const intervalId = setInterval(() => {
      updateDateTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <></>;
};
export default Header;
