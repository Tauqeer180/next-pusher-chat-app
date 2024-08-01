"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
//     {
//   isAuthenticated: false,
//   login: "",
//   logout: "",
//   user: null,
// }
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(
    Cookies.get("user") && JSON.parse(Cookies.get("user"))
  );
  const [token, setToken] = useState(Cookies.get("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );

  const login = (token, user) => {
    // debugger;
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
    router.replace("/");
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
