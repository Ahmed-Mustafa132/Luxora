import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { bookApi, api } from "../api/api";
import { useAuth } from "../context/Auth";
import Visible from "../components/Visible/Visible";

export default function Book() {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type, text }
  const [booking, setBooking] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({
      ...s,
      [name]: name === "guests" ? Number(value) : value,
    }));
    setStatus(null);
  }

  function validate() {
    const { checkIn, checkOut, guests } = form;
    if (!checkIn || !checkOut || !guests) return "Please fill all fields.";
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (inDate >= outDate) return "Check-out must be after check-in.";
    if (inDate <= today) return "Check-in must be a future date.";
    if (guests < 1 || guests > 3) return "Guests must be between 1 and 3.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isLogin) {
      navigate("/login");
      return;
    }
    const err = validate();
    if (err) {
      setStatus({ type: "error", text: err });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    setBooking(null);

    try {
      const res = await bookApi.createBooking({
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
      });
      const created = res?.data?.booking ?? res?.data;
      setBooking(created || null);
      setStatus({ type: "success", text: "Booking created successfully." });
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to create booking.";
      setStatus({ type: "error", text: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto space-y-6">
        <Visible>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Book a room
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Choose dates and number of guests. The system will allocate an
              available room of the matching type.
            </p>
          </div>
        </Visible>

        <Visible>
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="sm:col-span-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Check-in
              </label>
              <input
                type="date"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Check-out
              </label>
              <input
                type="date"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Guests
              </label>
              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
              >
                <option value={1}>1 — Single</option>
                <option value={2}>2 — Double</option>
                <option value={3}>3 — Suite</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex items-center justify-between mt-2">
              <div>
                {status && (
                  <span
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {status.text}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Link to="/rooms" className="px-3 py-2 border rounded text-sm">
                  Browse rooms
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-coffee text-white rounded disabled:opacity-60"
                >
                  {submitting ? "Booking..." : "Book now"}
                </button>
              </div>
            </div>
          </form>
        </Visible>

        {booking && (
          <Visible>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Booking confirmation
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <div>
                  <strong>ID:</strong> {booking._id ?? booking.id ?? "—"}
                </div>
                <div>
                  <strong>Room:</strong>{" "}
                  {booking.roomNumber ??
                    booking.room?.roomNumber ??
                    booking.room ??
                    "Assigned on server"}
                </div>
                <div>
                  <strong>Guests:</strong>{" "}
                  {booking.maxOccupancy ?? booking.guests ?? form.guests}
                </div>
                <div>
                  <strong>Check-in:</strong>{" "}
                  {booking.checkIn
                    ? new Date(booking.checkIn).toLocaleString()
                    : form.checkIn}
                </div>
                <div>
                  <strong>Check-out:</strong>{" "}
                  {booking.checkOut
                    ? new Date(booking.checkOut).toLocaleString()
                    : form.checkOut}
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Link
                  to={`/bookings/${booking._id ?? booking.id}`}
                  className="px-3 py-2 border rounded text-sm"
                >
                  View booking
                </Link>
                <Link
                  to="/user"
                  className="px-3 py-2 bg-coffee text-white rounded text-sm"
                >
                  My account
                </Link>
              </div>
            </div>
          </Visible>
        )}
      </div>
    </div>
  );
}
