import React, { useEffect } from "react";
import setAuthToken from "../../utils/setAuthToken";
import { useLocation } from "react-router-dom";
function ScrollToTop() {
  const { pathname } = useLocation();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      setAuthToken(token);
    }
  }, [pathname]);
  return null;
}

export default ScrollToTop;
