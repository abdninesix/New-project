import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRedirect = () => {
  const navigate = useNavigate();
  const toastShown = useRef(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && !toastShown.current) {
      toastShown.current = true;
      toast.info("Already logged in!");
      navigate("/profile");
    }
  }, [navigate]);
};
