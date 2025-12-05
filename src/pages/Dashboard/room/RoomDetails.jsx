import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import api from "../../../api/api";
import Visible from "../../../components/Visible/Visible";
import { FaUndo, FaCalendarAlt } from "react-icons/fa";

export default function RoomDetailsAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLogin } = useAuth();

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) {
      setError("Access denied");
      setLoading(false);
      return;
    }
    load();
  }, [id, isLogin, user]);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [rRes, bRes] = await Promise.all([
        api.get(`/room/id/${id}`),
        api.get(`/book/room/${id}`),
      ]);
      console.log(bRes);
      setRoom(rRes?.data?.room ?? null);
      setBookings(bRes?.data?.data ?? []);
    } catch (e) {
      console.error(e);
      setError("Failed to load room or bookings.");
      setRoom(null);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  async function restore() {
    if (!confirm("Restore this room (set status to available)?")) return;
    try {
      await api.post(`/room/${id}/restore`);
      await load();
      alert("Room restored.");
    } catch (e) {
      console.error(e);
      alert("Failed to restore room.");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error)
    return (
      <div className="p-6">
        <div className="text-red-600">{error}</div>
        <div className="mt-3">
          <Link to="/dashboard/rooms" className="text-amber-600">
            Back
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto space-y-6">
        <Visible>
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border dark:border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                  {room?.roomNumber} — {room?.roomType}
                </h2>
                <div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  ${room?.price} / night · Status:{" "}
                  <span className="font-semibold">{room?.status}</span>
                </div>
                <div className="mt-3 text-sm text-gray-700 dark:text-slate-300">
                  {(room?.amenities || []).join(", ")}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate(`/dashboard/rooms`)}
                  className="px-3 py-2 border rounded text-sm"
                >
                  Back
                </button>
                <button
                  onClick={restore}
                  className="px-3 py-2 bg-amber-600 text-white rounded text-sm flex items-center gap-2"
                >
                  <FaUndo /> Restore
                </button>
              </div>
            </div>
          </div>
        </Visible>

        <Visible>
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                <FaCalendarAlt className="mr-2 inline" /> Booking History
              </h3>
            </div>

            {bookings.length === 0 ? (
              <div className="text-gray-500 dark:text-slate-400">
                No bookings for this room.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-600 dark:text-slate-300">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">User</th>
                      <th className="p-2">Check-in</th>
                      <th className="p-2">Check-out</th>
                      <th className="p-2">Status</th>
                      <th className="p-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr key={b._id || b.id} className="border-t">
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{b.user?.email ?? b.user}</td>
                        <td className="p-2">
                          {b.checkIn
                            ? new Date(b.checkIn).toLocaleString()
                            : "—"}
                        </td>
                        <td className="p-2">
                          {b.checkOut
                            ? new Date(b.checkOut).toLocaleString()
                            : "—"}
                        </td>
                        <td className="p-2">{b.status ?? "—"}</td>
                        <td className="p-2 text-right">
                          <div className="inline-flex gap-2">
                            <Link
                              to={`/dashboard/bookings/${b._id || b.id}`}
                              className="px-2 py-1 border rounded text-xs"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Visible>
      </div>
    </div>
  );
}
