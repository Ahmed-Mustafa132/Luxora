import React, { useEffect, useState } from "react";
import { roomsApi } from "../../api/api";
import { useAuth } from "../../context/Auth";

export default function RoomsDashboard() {
  const { isLogin } = useAuth();
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

  async function load() {
    setLoading(true);
    try {
      const res = await roomsApi.getRooms({ page, limit });
      setRooms(res.data.data || []);
      setTotal(res.data.totalRooms || 0);
    } catch (err) {
      console.error("Failed to load rooms", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [page]);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    try {
      await roomsApi.createRoom({
        roomNumber: form.roomNumber,
        price: Number(form.price),
        amenities: form.amenities.split(",").map((s) => s.trim()),
        roomType: form.roomType,
      });
      setForm({ roomNumber: "", price: "", amenities: "", roomType: "" });
      await load();
    } catch (err) {
      console.error("create room failed", err);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Rooms Dashboard</h1>

      <div className="mb-6">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input name="roomNumber" value={form.roomNumber} onChange={handleChange} placeholder="Room number" className="p-2 border" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="p-2 border" />
          <input name="amenities" value={form.amenities} onChange={handleChange} placeholder="amen1, amen2" className="p-2 border" />
          <div className="flex gap-2">
            <input name="roomType" value={form.roomType} onChange={handleChange} placeholder="Type" className="p-2 border flex-1" />
            <button type="submit" disabled={creating || !isLogin} className="px-4 bg-coffee text-white rounded">
              {creating ? "Creating..." : isLogin ? "Create" : "Login required"}
            </button>
          </div>
        </form>
      </div>

      <div>
        {loading ? (
          <div>Loading rooms...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((r) => (
              <div key={r._id} className="p-4 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{r.roomNumber || "—"}</div>
                    <div className="text-sm text-gray-500">{r.roomType}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${r.price}</div>
                    <div className="text-xs text-gray-400">{r.status || "available"}</div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Amenities: {(r.amenities || []).join(", ")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>{`Total: ${total}`}</div>
        <div className="flex gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="px-3 py-1 border rounded">Prev</button>
          <div className="px-3 py-1 border rounded">{page}</div>
          <button onClick={() => setPage(p => p + 1)} disabled={rooms.length < limit} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}