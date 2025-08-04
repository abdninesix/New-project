import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/profile");
  }, [navigate]);
};
