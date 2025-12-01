import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": Cookies.get("token"),
  }
});

function setAuthTokenFromCookie() {
  const token = Cookies.get("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else { delete api.defaults.headers.common["Authorization"]; }
}
setAuthTokenFromCookie();

const authApi = {
  async login({ email, password }) {
    const res = await api.post("/user/login", { email, password });
    const token = res.data?.token;
    if (token) {
      Cookies.set("token", token, { expires: 7, sameSite: "lax" });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return res.data;
  },

  async register(payload) {
    const res = await api.post("/user/register", payload);
    const token = res.data?.token;
    if (token) {
      Cookies.set("token", token, { expires: 7, sameSite: "lax" });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return res.data;
  },

  async logout() {
    Cookies.remove("token");
    delete api.defaults.headers.common["Authorization"];
  },

  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};

const roomsApi = {
  getRooms(params = {}) { return api.get("/room", { params }); },
  getRoom(roomNumber) { return api.get(`/room/${roomNumber}`); },
  createRoom(payload) { return api.post("/room/create", payload); },
  updateRoom(id, payload) { return api.put(`/room/${id}`, payload); },
  // mark as deleted (server uses update route) — safe delete without adding new model/route
  deleteRoom(id) { return api.put(`/room/${id}`, { status: "deleted" }); },
};
const bookApi = {
  createBooking(payload) { return api.post("/book/book", payload); },
}

export default authApi;
export { api, setAuthTokenFromCookie, roomsApi ,bookApi};