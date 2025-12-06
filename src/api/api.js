import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token") || ""
  }
});

function setAuthTokenFromCookie() {
  const token = Cookies.get("token");
  if (token) api.defaults.headers.common.Authorization = token;
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
  async dashboard() {
    try {

      const res = await api.get("/user/dashboard");
      return res.data;
    } catch (e) {
      console.error("Failed to load dashboard data", e);
      return null;
    }
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
  deleteRoom(id) { return api.put(`/room/${id}`, { status: "deleted" }); },
};
const bookApi = {
  createBooking(payload) { return api.post("/book/book", payload); }, // POST /api/book/book
  getBookings(params = {}) { return api.get("/book", { params }); },   // GET /api/book
  getBooking(id) { return api.get(`/book/${id}`); },                   // GET /api/book/:id
  updateBooking(id, payload) { return api.put(`/book/${id}`, payload); },
  cancelBooking(id) { return api.put(`/book/${id}/cancel`); },
  deleteBooking(id) { return api.delete(`/book/${id}`); }
};

api.authApi = authApi;
api.roomsApi = roomsApi;
api.bookApi = bookApi;


api.login = authApi.login;
api.register = authApi.register;
api.dashboard = authApi.dashboard;
api.logout = authApi.logout;

export default api;
export { api, setAuthTokenFromCookie, authApi, roomsApi, bookApi };