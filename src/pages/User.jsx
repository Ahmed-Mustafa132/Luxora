import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { api, bookApi } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { user, isLogin, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [user]);

  useEffect(() => {
    if (!isLogin) {
      setLoading(false);
      setBookings([]);
      return;
    }
    loadBookings();
  }, [isLogin]);

  async function loadBookings() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/book/my");
      const data = res?.data?.data ?? res?.data ?? [];
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load bookings", err);
      setError("Unable to load booking history.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(d) {
    if (!d) return "—";
    const dt = new Date(d);
    return dt.toLocaleString();
  }

  async function cancelBooking(booking) {
    if (!confirm(`Cancel booking ${booking._id || booking.id}?`)) return;
    try {
      if (bookApi && typeof bookApi.cancelBooking === "function") {
        await bookApi.cancelBooking(booking._id || booking.id);
      } else {
        await api.put(`/booking/${booking._id || booking.id}/cancel`);
      }
      await loadBookings();
    } catch (err) {
      console.error("Cancel failed", err);
      alert("Failed to cancel booking.");
    }
  }

  async function saveProfile(e) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await api.put("/user/me", profile);
      const updated = res?.data?.user ?? res?.data ?? profile;
      if (updateUser) updateUser(updated);
      setEditing(false);
    } catch (err) {
      console.error("Profile save failed", err);
      alert("Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  function handleLogout() {
    if (logout) logout();
    navigate("/");
  }

  if (!isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Sign in required</h2>
          <p className="text-sm text-gray-500 mb-4">
            Please sign in to view your dashboard and booking history.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-coffee text-white rounded"
            >
              Sign in
            </button>
            <Link to="/" className="px-4 py-2 border rounded">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-6">
            <div>
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || user?.email || "User"
                  )}&background=0D8ABC&color=fff`
                }
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {user?.name || user?.email}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {user?.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Member since:{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setEditing((s) => !s)}
                className="px-3 py-2 border rounded"
              >
                {editing ? "Cancel" : "Edit profile"}
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 border rounded text-red-600"
              >
                Logout
              </button>
              <button
                onClick={() => navigate("/book")}
                className="px-3 py-2 bg-coffee text-white rounded"
              >
                New Booking
              </button>
            </div>
          </div>

          {editing && (
            <form
              onSubmit={saveProfile}
              className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              <input
                name="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="p-2 border rounded"
                placeholder="Name"
              />
              <input
                name="email"
                value={profile.email}
                disabled
                className="p-2 border rounded bg-gray-100 dark:bg-gray-700"
                placeholder="Email"
              />
              <input
                name="phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="p-2 border rounded"
                placeholder="Phone"
              />
              <div className="md:col-span-3 flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-4 py-2 bg-coffee text-white rounded"
                >
                  {savingProfile ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 border rounded"
                >
                  Close
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Booking history */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Booking History
          </h3>
          {loading ? (
            <div>Loading bookings...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : bookings.length === 0 ? (
            <div className="text-sm text-gray-500">
              No bookings found.{" "}
              <Link to="/rooms" className="text-coffee">
                Book a room
              </Link>
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Room</th>
                    <th className="p-2">Check-in</th>
                    <th className="p-2">Check-out</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b._id || b.id} className="border-t">
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2">
                        {b.roomNumber ||
                          b.room?.roomNumber ||
                          b.room?.name ||
                          "—"}
                      </td>
                      <td className="p-2">
                        {formatDate(b.checkIn || b.startDate)}
                      </td>
                      <td className="p-2">
                        {formatDate(b.checkOut || b.endDate)}
                      </td>
                      <td className="p-2">${b.total || b.price || "—"}</td>
                      <td className="p-2">{b.status || "—"}</td>
                      <td className="p-2 text-right">
                     
                        {(b.status === "confirmed" ||
                          b.status === "pending") && (
                          <button
                            onClick={() => cancelBooking(b)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* More: quick links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col md:flex-row gap-4">
          

          <div className="w-full md:w-1/3">
            <h4 className="font-semibold text-gray-800 dark:text-white">
              Need help?
            </h4>
            <p className="text-sm text-gray-500">
              Contact support for booking changes or special requests.
            </p>
            <div className="mt-3">
              <a
                href="mailto:info@luxora.example"
                className="px-3 py-2 bg-coffee text-white rounded inline-block"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
