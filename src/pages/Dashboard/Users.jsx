import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaUserShield, FaUserAlt, FaSearch } from "react-icons/fa";

export default function UsersAdminPage() {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) {
      setLoading(false);
      return;
    }
    load();
    // eslint-disable-next-line
  }, [isLogin, user, page]);

  async function load(q) {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit };
      if ((q ?? search).trim()) params.q = q ?? search;
      const res = await api.get("/user", { params });
      console.log(res)
      // adapt to server response shape
      const data = res?.data.users;
      const list = data?.data ?? (Array.isArray(data) ? data : []);
      setUsers(list);
      setTotal(data?.totalUsers ?? data?.total ?? list.length);
    } catch (e) {
      console.error(e);
      setError("Failed to load users");
      setUsers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  async function toggleAdmin(u) {
    const makeAdmin = !(u.role === "admin" || u.isAdmin);
    if (!confirm(`${makeAdmin ? "Promote" : "Demote"} ${u.email}?`)) return;
    try {
      await api.put(`/user/${u._id}`, { role: makeAdmin ? "admin" : "user" });
      await load();
    } catch (e) {
      console.error(e);
      alert("Failed to update role.");
    }
  }

  async function removeUser(u) {
    if (!confirm(`Delete user ${u.email}? This cannot be undone.`)) return;
    try {
      await api.delete(`/user/${u._id}`);
      await load();
    } catch (e) {
      console.error(e);
      alert("Failed to delete user.");
    }
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
    load(search);
  }

  if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Access denied</h2>
          <p className="text-sm text-gray-500 mb-4">Admin only area.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => navigate("/login")} className="px-4 py-2 bg-coffee text-white rounded">Sign in</button>
            <Link to="/" className="px-4 py-2 border rounded">Home</Link>
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Users Management</h1>
            <p className="text-sm text-gray-500">View, search, promote and remove users.</p>
          </div>
          <div className="flex items-center gap-2">
            <form onSubmit={onSearchSubmit} className="flex items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
                className="px-3 py-2 border rounded-l bg-white dark:bg-gray-700 text-sm"
              />
              <button type="submit" className="px-3 py-2 bg-coffee text-white rounded-r">
                <FaSearch />
              </button>
            </form>
            <Link to="/register" className="px-3 py-2 border rounded text-sm">New user</Link>
          </div>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded shadow p-4">
          {loading ? (
            <div>Loading users...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-sm text-gray-500">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Joined</th>
                    <th className="p-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u._id} className="border-t">
                      <td className="p-2">{(page - 1) * limit + i + 1}</td>
                      <td className="p-2">{u.name || <span className="text-gray-400">—</span>}</td>
                      <td className="p-2">{u.email}</td>
                      <td className="p-2">{u.role || (u.isAdmin ? "admin" : "user")}</td>
                      <td className="p-2">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
                      <td className="p-2 text-right">
                        <div className="inline-flex gap-2">
                          <button title="View profile" onClick={() => navigate(`/dashboard/users/${u._id}`)} className="px-2 py-1 border rounded text-sm"><FaUserAlt /></button>
                          <button title={u.role === "admin" ? "Demote" : "Promote to admin"} onClick={() => toggleAdmin(u)} className="px-2 py-1 border rounded text-sm"><FaUserShield /></button>
                          <button title="Delete" onClick={() => removeUser(u)} className="px-2 py-1 bg-red-600 text-white rounded text-sm"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Total users: {total}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded">Prev</button>
            <div className="px-3 py-1 border rounded">{page}</div>
            <button onClick={() => setPage((p) => p + 1)} disabled={users.length < limit} className="px-3 py-1 border rounded">Next</button>
          </div>
        </footer>
      </div>
    </div>
  );
}