"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const refreshAuth = () => {
    const cToken = Cookies.get("token");
    const cUser = Cookies.get("user");
    // console.log("TOken from hook", token);
    // Simulate token verification. In a real app, you might want
    // to verify the token against your backend or decode it if it's a JWT
    if (cToken) {
      // Assuming the token is valid and contains user info.
      // You might want to decode the token to get user details.
      setUser(JSON.parse(cUser));
      setToken(cToken);
    } else {
      setUser(null);
      setToken(null);
    }
  };
  useEffect(() => {
    refreshAuth();
  }, []);
  return { user, token, isAuthenticated: !!token, refreshAuth };
};

export default useUser;
