import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { roomsApi } from "../../api/api";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function RoomsDashboard() {
  const navigate = useNavigate();
  const { isLogin, user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    roomNumber: "",
    price: "",
    amenities: "",
    roomType: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    price: "",
    amenities: "",
    roomType: "",
  });
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await roomsApi.getRooms({ page, limit });
      const data = res?.data;
      setRooms(data?.data ?? []);
      setTotal(data?.totalRooms ?? data?.total ?? 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) return;
    load();
    // eslint-disable-next-line
  }, [page, isLogin]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setError("");
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((s) => ({ ...s, [name]: value }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.roomNumber || !form.price || !form.roomType) {
      setError("Please fill all required fields");
      return;
    }
    setCreating(true);
    try {
      await roomsApi.createRoom({
        roomNumber: form.roomNumber,
        price: parseFloat(form.price),
        amenities: form.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        roomType: form.roomType,
      });
      setForm({ roomNumber: "", price: "", amenities: "", roomType: "" });
      setPage(1);
      await load();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create room");
    } finally {
      setCreating(false);
    }
  }

  function startEdit(room) {
    setEditingId(room._id);
    setEditForm({
      price: room.price || "",
      amenities: (room.amenities || []).join(", "),
      roomType: room.roomType || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ price: "", amenities: "", roomType: "" });
  }

  async function saveEdit(id) {
    try {
      await roomsApi.updateRoom(id, {
        price: parseFloat(editForm.price),
        amenities: editForm.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        roomType: editForm.roomType,
      });
      cancelEdit();
      await load();
    } catch (err) {
      console.error(err);
      setError("Failed to save changes");
    }
  }

  async function handleDelete(room) {
    if (!confirm(`Delete room ${room.roomNumber}?`)) return;
    try {
      await roomsApi.deleteRoom(room._id);
      await load();
    } catch (err) {
      console.error(err);
      setError("Failed to delete room");
    }
  }

  if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 text-center border dark:border-slate-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">
            Access Denied
          </h2>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
            Admin only area.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white rounded transition"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
              Rooms Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Create, edit and delete hotel rooms.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              Refresh
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded">
            {error}
          </div>
        )}

        {/* Create form */}
        <section className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 border dark:border-slate-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">
            Create new room
          </h3>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 sm:grid-cols-5 gap-3"
          >
            <input
              name="roomNumber"
              placeholder="Room #"
              value={form.roomNumber}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price $"
              value={form.price}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
              required
            />
            <select
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
              required
            >
              <option value="">Select type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
            </select>
            <input
              name="amenities"
              placeholder="Amenities (comma separated)"
              value={form.amenities}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white rounded disabled:opacity-60 transition"
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </form>
        </section>

        {/* Rooms list */}
        <section className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 border dark:border-slate-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">
            Rooms ({total})
          </h3>

          {loading ? (
            <div className="text-gray-600 dark:text-slate-400">Loading...</div>
          ) : rooms.length === 0 ? (
            <div className="text-gray-600 dark:text-slate-400">
              No rooms found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-700 dark:text-slate-300 border-b border-gray-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Room</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Amenities</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, i) => (
                    <tr
                      key={room._id}
                      className="border-b border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                    >
                      <td className="p-3 text-gray-900 dark:text-slate-100">
                        {(page - 1) * limit + i + 1}
                      </td>
                      <td className="p-3">
                        {editingId === room._id ? (
                          <input
                            value={editForm.roomType}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                roomType: e.target.value,
                              })
                            }
                            className="w-20 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
                          />
                        ) : (
                          <span className="font-medium text-gray-900 dark:text-slate-100">
                            {room.roomNumber}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {editingId === room._id ? (
                          <select
                            value={editForm.roomType}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                roomType: e.target.value,
                              })
                            }
                            className="px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
                          >
                            <option value="single">Single</option>
                            <option value="double">Double</option>
                            <option value="suite">Suite</option>
                            <option value="deluxe">Deluxe</option>
                          </select>
                        ) : (
                          <span className="text-gray-700 dark:text-slate-300">
                            {room.roomType}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {editingId === room._id ? (
                          <input
                            type="number"
                            value={editForm.price}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                price: e.target.value,
                              })
                            }
                            className="w-20 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
                          />
                        ) : (
                          <span className="text-gray-900 dark:text-slate-100">
                            ${room.price}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {editingId === room._id ? (
                          <input
                            value={editForm.amenities}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                amenities: e.target.value,
                              })
                            }
                            className="w-32 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 text-xs"
                          />
                        ) : (
                          <span className="text-gray-600 dark:text-slate-400 text-xs">
                            {(room.amenities || []).slice(0, 2).join(", ")}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            room.status === "available"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {room.status || "Available"}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex gap-2">
                          {editingId === room._id ? (
                            <>
                              <button
                                onClick={() => saveEdit(room._id)}
                                className="px-2 py-1 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white rounded text-xs transition"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-2 py-1 bg-gray-400 dark:bg-slate-600 hover:bg-gray-500 dark:hover:bg-slate-700 text-white rounded text-xs transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  navigate(`/rooms/${room.roomNumber}`)
                                }
                                title="View"
                                className="px-2 py-1 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                              >
                                <FaEye />
                              </button>
                              <button
                                onClick={() => startEdit(room)}
                                title="Edit"
                                className="px-2 py-1 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(room)}
                                title="Delete"
                                className="px-2 py-1 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white rounded text-xs transition"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-slate-400">
              Page {page} of {Math.ceil(total / limit)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50 transition"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={rooms.length < limit}
                className="px-3 py-1 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
