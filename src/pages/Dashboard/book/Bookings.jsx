import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
import { bookApi, roomsApi, api } from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaTrash, FaTimes, FaCheck } from "react-icons/fa";

export default function BookingsAdmin() {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({ status: "", q: "" });
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    userId: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  useEffect(() => {
    if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) return;
    load();
    loadRooms();
    // eslint-disable-next-line
  }, [page, filter]);

  async function load() {
    setLoading(true);
    try {
      const params = { page, limit, ...filter };
      const res = await bookApi.getBookings(params);
      const data = res?.data;
      setBookings(data?.data ?? data ?? []);
      setTotal(data?.total ?? data?.data?.length ?? 0);
    } catch (e) {
      console.error(e);
      setBookings([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  async function loadRooms() {
    try {
      const r = await roomsApi.getRooms({ page: 1, limit: 100 }); // small list for admin assign
      setRooms(r?.data?.data ?? []);
    } catch (e) {
      console.error(e);
      setRooms([]);
    }
  }

  function onChangeCreate(e) {
    const { name, value } = e.target;
    setCreateForm((s) => ({
      ...s,
      [name]: name === "guests" ? Number(value) : value,
    }));
  }

  async function submitCreate(e) {
    e.preventDefault();
    setCreating(true);

    try {
      // basic validation
      if (!createForm.checkIn || !createForm.checkOut) {
        throw new Error("Please provide check-in and check-out dates.");
      }
      if (new Date(createForm.checkIn) >= new Date(createForm.checkOut)) {
        throw new Error("Check-out must be after check-in.");
      }
      if (!createForm.guests || createForm.guests < 1) {
        throw new Error("Guests must be at least 1.");
      }

      // resolve userId if an email was provided
      let targetUserId = createForm.userId;
      if (targetUserId && targetUserId.includes("@")) {
        try {
          // Admin can fetch users and match by email
          const ures = await api
            .get("/user", { params: { q: targetUserId } })
            .catch(() => null);
          if (ures?.data) {
            // try to find exact email in returned list or object
            const list = Array.isArray(ures.data)
              ? ures.data
              : ures.data.data || [];
            const found = list.find(
              (u) =>
                (u.email || "").toLowerCase() === targetUserId.toLowerCase()
            );
            if (found) targetUserId = found._id || found.id;
          }
        } catch (err) {
          // ignore - fallback to sending email in payload (server may accept)
        }
      }

      const payload = {
        userId: targetUserId || undefined,
        roomId: createForm.roomId || undefined,
        checkIn: createForm.checkIn,
        checkOut: createForm.checkOut,
        guests: createForm.guests,
      };

      // Try admin create endpoint first (expects auth + admin)
      let created;
      try {
        const res = await api.post("/book/admin-create", payload);
        created = res?.data?.booking ?? res?.data;
      } catch (err) {
        // If admin endpoint not available or fails, try public create (bookApi)
        const res2 = await bookApi.createBooking({
          checkIn: payload.checkIn,
          checkOut: payload.checkOut,
          guests: payload.guests,
        });
        created = res2?.data?.booking ?? res2?.data;
      }

      alert("Booking created.");
      setCreateForm({
        userId: "",
        roomId: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
      });

      // reload list and navigate to created booking details if available
      await load();
      if (created && (created._id || created.id)) {
        navigate(`/dashboard/bookings/${created._id || created.id}`);
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create booking";
      alert(msg);
    } finally {
      setCreating(false);
    }
  }

  async function cancel(b) {
    if (!confirm("Cancel booking?")) return;
    try {
      await bookApi.cancelBooking(b._id || b.id);
      await load();
    } catch (e) {
      console.error(e);
      alert("Cancel failed");
    }
  }

  async function remove(b) {
    if (!confirm("Delete booking?")) return;
    try {
      await bookApi.deleteBooking(b._id || b.id);
      await load();
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  }

  if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) {
    return (
      <div className="p-6">
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded p-6 text-center">
          <h2 className="text-xl font-semibold">Access denied</h2>
          <p className="text-sm text-gray-500">Admin only.</p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-2 bg-coffee text-white rounded"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bookings</h1>
            <p className="text-sm text-gray-500">
              View and manage site bookings.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filter.status}
              onChange={(e) =>
                setFilter((f) => ({ ...f, status: e.target.value }))
              }
              className="px-2 py-1 border rounded"
            >
              <option value="">All statuses</option>
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="cancelled">cancelled</option>
            </select>
            <input
              placeholder="Search"
              value={filter.q}
              onChange={(e) => setFilter((f) => ({ ...f, q: e.target.value }))}
              className="px-2 py-1 border rounded"
            />
            <button
              onClick={() => {
                setPage(1);
                load();
              }}
              className="px-3 py-1 border rounded"
            >
              Filter
            </button>
            <button
              onClick={() =>
                setCreateForm({
                  userId: "",
                  roomId: "",
                  checkIn: "",
                  checkOut: "",
                  guests: 1,
                })
              }
              className="px-3 py-1 bg-coffee text-white rounded"
            >
              New booking
            </button>
          </div>
        </header>

        {/* Create form */}
        <section className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <form
            onSubmit={submitCreate}
            className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
          >
            <div className="md:col-span-1">
              <label className="text-xs">User ID / email</label>
              <input
                name="userId"
                value={createForm.userId}
                onChange={onChangeCreate}
                className="w-full p-2 border rounded"
                placeholder="user id or email"
              />
            </div>
            <div className="md:col-span-1">
              <label className="text-xs">Room</label>
              <select
                name="roomId"
                value={createForm.roomId}
                onChange={onChangeCreate}
                className="w-full p-2 border rounded"
              >
                <option value="">Auto assign</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.roomNumber} — {r.roomType}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs">Check-in</label>
              <input
                name="checkIn"
                type="date"
                value={createForm.checkIn}
                onChange={onChangeCreate}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-xs">Check-out</label>
              <input
                name="checkOut"
                type="date"
                value={createForm.checkOut}
                onChange={onChangeCreate}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-xs">Guests</label>
              <input
                name="guests"
                type="number"
                min={1}
                max={4}
                value={createForm.guests}
                onChange={onChangeCreate}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-5 flex justify-end gap-2">
              <button
                type="submit"
                disabled={creating}
                className="px-3 py-2 bg-coffee text-white rounded"
              >
                {creating ? "Creating..." : "Create booking"}
              </button>
            </div>
          </form>
        </section>

        {/* list */}
        <section className="bg-white dark:bg-gray-800 rounded shadow p-4">
          {loading ? (
            <div>Loading...</div>
          ) : bookings.length === 0 ? (
            <div>No bookings</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">User</th>
                    <th className="p-2">Room</th>
                    <th className="p-2">Check-in</th>
                    <th className="p-2">Check-out</th>
                    <th className="p-2">Guests</th>
                    <th className="p-2">Status</th>
                    <th className="p-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b._id || b.id} className="border-t">
                      <td className="p-2">{(page - 1) * limit + i + 1}</td>
                      <td className="p-2">{b.user?.email ?? b.user}</td>
                      <td className="p-2">
                        {b.room?.roomNumber ?? b.room?.roomNumber ?? b.room}
                      </td>
                      <td className="p-2">
                        {b.checkIn ? new Date(b.checkIn).toLocaleString() : "—"}
                      </td>
                      <td className="p-2">
                        {b.checkOut
                          ? new Date(b.checkOut).toLocaleString()
                          : "—"}
                      </td>
                      <td className="p-2">
                        {b.maxOccupancy ?? b.guests ?? "—"}
                      </td>
                      <td className="p-2">{b.status ?? "—"}</td>
                      <td className="p-2 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            title="View"
                            onClick={() =>
                              navigate(`/dashboard/bookings/${b._id || b.id}`)
                            }
                            className="px-2 py-1 border rounded"
                          >
                            <FaEye />
                          </button>
                          <button
                            title="Cancel"
                            onClick={() => cancel(b)}
                            className="px-2 py-1 bg-yellow-500 text-white rounded"
                          >
                            <FaTimes />
                          </button>
                          <button
                            title="Delete"
                            onClick={() => remove(b)}
                            className="px-2 py-1 bg-red-600 text-white rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">Total: {total}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-2 py-1 border rounded"
                  >
                    Prev
                  </button>
                  <div className="px-3 py-1 border rounded">{page}</div>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={bookings.length < limit}
                    className="px-2 py-1 border rounded"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
