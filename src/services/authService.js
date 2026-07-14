import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (username, password) => {
  try {
    const response = await authClient.post("token/", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "password",
      username: username,
      password: password,
    });

    localStorage.setItem("access_token", response.data.access_token);
    
    return response.data;
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};
export const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null;
};
export const logout = async () => {
    if (!isLoggedIn()) {
        return;
    }

    const token = localStorage.getItem("access_token");

    try {
        await authClient.post("/remove_token", {
            token: token,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });
    } catch (error) {
        console.error("Error al cerrar sesión: " + error.message);
    }

    localStorage.removeItem("access_token");
};