import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import authApi, { setAuthTokenFromCookie } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false); // renamed from setIsLoin

  useEffect(() => {
    setAuthTokenFromCookie();
    const t = Cookies.get("token");
    setToken(t || null);
    setIsLogin(Boolean(t));

    // if we have a token, try to fetch current user
    async function fetchMe() {
      if (!t) {
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.get("/user/me");
        setUser(res?.data.data || null);
      } catch (err) {
        setUser(null);
        setToken(null);
        Cookies.remove("token");
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  async function login({ email, password }) {
    const res = await authApi.login({ email, password });
    const t = res?.token;
    setToken(t || null);
    setUser(res?.user || null);
    setIsLogin(Boolean(t));
    return res;
  }

  async function register(payload) {
    const res = await authApi.register(payload);
    const t = res?.token;
    setToken(t || null);
    setUser(res?.user || null);
    setIsLogin(Boolean(t));
    return res;
  }

  async function logout() {
    setToken(null);
    setUser(null);
    await authApi.logout();
    setIsLogin(false);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isLogin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
