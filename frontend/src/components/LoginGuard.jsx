import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function LoginGuard({ children }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.myUser.userData);
  const token = userData?.token;

  useEffect(() => {
    if (!token) {
      navigate("../500");
    }
  }, []);
  return children;
}
