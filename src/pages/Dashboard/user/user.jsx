import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { api, bookApi } from "../../../api/api";
import { FaTrash, FaUserShield, FaEye } from "react-icons/fa";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: me, isLogin } = useAuth();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLogin || !(me?.role === "admin" || me?.isAdmin)) {
      setError("Access denied");
      setLoading(false);
      return;
    }
    load();
    // eslint-disable-next-line
  }, [id, isLogin, me]);

  async function load() {
    setLoading(true);
    setError("");
    try {
      // user details
      let uRes = await api.get(`/user/${id}`);
      const u = uRes?.data?.data;
      setUserData(u);
      let bRes;
      try {
        bRes = await api.get("/book", { params: { userId: id } });
        console.log("bookings by user", bRes);
      } catch (e) {
        bRes = null;
      }
      const blist = bRes?.data?.data ?? bRes?.data ?? [];
      setBookings(Array.isArray(blist) ? blist : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load user or bookings.");
      setUserData(null);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }


  async function deleteUser() {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    try {
      await api.delete(`/user/${id}`);
      navigate("/dashboard/users");
    } catch (e) {
      console.error(e);
      alert("Failed to delete user.");
    }
  }

  async function cancelBooking(b) {
    if (!confirm("Cancel this booking?")) return;
    try {
      if (bookApi && typeof bookApi.cancelBooking === "function") {
        await bookApi.cancelBooking(b._id || b.id);
      } else {
        // try mark cancelled
        await api.put(`/booking/${b._id || b.id}`, { status: "cancelled" });
      }
      await load();
    } catch (e) {
      console.error(e);
      alert("Failed to cancel booking.");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error)
    return (
      <div className="p-6">
        <div className="text-red-600">{error}</div>
        <div className="mt-3">
          <Link to="/dashboard/users" className="text-coffee">
            Back to users
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center gap-4">
          <div>
            <img
              src={
                userData?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userData?.name || userData?.email || "User"
                )}`
              }
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{userData?.name || "—"}</h2>
            <div className="text-sm text-gray-600">{userData?.email}</div>
            <div className="text-sm text-gray-600">
              Role: {userData?.role || (userData?.isAdmin ? "admin" : "user")}
            </div>
          </div>
          <div className="flex flex-col gap-2">

            <button
              onClick={deleteUser}
              className="px-3 py-2 bg-red-600 text-white rounded flex items-center gap-2"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Booking History</h3>
            <Link to="/dashboard/bookings" className="text-sm text-coffee">
              All bookings
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-sm text-gray-500">
              No bookings found for this user.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Room</th>
                    <th className="p-2">Check-in</th>
                    <th className="p-2">Check-out</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Status</th>
                    <th className="p-2 text-right">Actions</th>
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
                        {b.checkIn
                          ? new Date(b.checkIn).toLocaleString()
                          : b.startDate
                          ? new Date(b.startDate).toLocaleString()
                          : "—"}
                      </td>
                      <td className="p-2">
                        {b.checkOut
                          ? new Date(b.checkOut).toLocaleString()
                          : b.endDate
                          ? new Date(b.endDate).toLocaleString()
                          : "—"}
                      </td>
                      <td className="p-2">${b.room.price || "—"}</td>
                      <td className="p-2">{b.status || "—"}</td>
                      <td className="p-2 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/dashboard/bookings/${b._id || b.id}`)
                            }
                            className="px-2 py-1 border rounded text-sm"
                          >
                            <FaEye />
                          </button>
                          {(!b.status ||
                            b.status === "confirmed" ||
                            b.status === "pending") && (
                            <button
                              onClick={() => cancelBooking(b)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Link to="/dashboard/users" className="px-3 py-2 border rounded">
            Back to users
          </Link>
        </div>
      </div>
    </div>
  );
}
