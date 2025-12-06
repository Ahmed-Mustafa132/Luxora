import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { bookApi } from "../../../api/api";
import Visible from "../../../components/Visible/Visible";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLogin } = useAuth();

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await bookApi.getBooking(id);
        setBooking(res?.data?.data ?? res?.data);
      } catch (e) {
        console.error(e);
        setError(e?.response?.data?.message || "Failed to load booking");
      } finally { setLoading(false); }
    }
    load();
  }, [id]);

  async function onCancel() {
    if (!confirm("Cancel this booking?")) return;
    try {
      await bookApi.cancelBooking(id);
      alert("Booking cancelled");
      const res = await bookApi.getBooking(id);
      setBooking(res?.data?.data ?? res?.data);
    } catch (e) {
      console.error(e);
      alert("Cancel failed");
    }
  }

  async function onDelete() {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    try {
      await bookApi.deleteBooking(id);
      alert("Booking deleted");
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!booking) return <div className="p-6">Booking not found</div>;

  const isAdmin = user?.role === "admin" || user?.isAdmin;
  const isOwner = String(booking.user?._id ?? booking.user) === String(user?._id);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto space-y-6">
        <Visible>
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border dark:border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Booking #{booking._id}</h1>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  Room: {booking.room?.roomNumber ?? booking.room} — {booking.room?.roomType}
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  Guest: {booking.user?.name ?? booking.user?.email ?? booking.user}
                </p>
              </div>

              <div className="text-right space-y-2">
                <div className="text-sm text-gray-700 dark:text-slate-300">Status</div>
                <div className={`px-3 py-1 rounded font-semibold ${booking.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  {booking.status}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-slate-300">
              <div>
                <div className="text-xs text-gray-500">Check-in</div>
                <div>{booking.checkIn ? new Date(booking.checkIn).toLocaleString() : "—"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Check-out</div>
                <div>{booking.checkOut ? new Date(booking.checkOut).toLocaleString() : "—"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Guests</div>
                <div>{booking.maxOccupancy ?? booking.guests}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Link to="/dashboard/bookings" className="px-3 py-2 border rounded">Back to bookings</Link>
              {(isOwner || isAdmin) && booking.status !== "cancelled" && (
                <button onClick={onCancel} className="px-3 py-2 bg-yellow-500 text-white rounded">Cancel</button>
              )}
              {isAdmin && (
                <button onClick={onDelete} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
              )}
            </div>
          </div>
        </Visible>

        <Visible>
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border dark:border-slate-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">Related Info</h3>
            <div className="text-sm text-gray-600 dark:text-slate-400">
              <div><strong>Price:</strong> ${booking.room?.price ?? "—"}</div>
              <div className="mt-2"><strong>Amenities:</strong> {(booking.room?.amenities || []).join(", ")}</div>
            </div>
          </div>
        </Visible>
      </div>
    </div>
  );
}