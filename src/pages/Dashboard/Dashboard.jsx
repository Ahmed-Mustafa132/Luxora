import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { roomsApi, api } from "../../api/api";

export default function Dashboard() {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    rooms: 0,
    users: 0,
    bookings: 0,
  });

  useEffect(() => {
    if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) {
      // not allowed
      setLoading(false);
      return;
    }

    async function loadStats() {
      setLoading(true);
      try {
        const roomsRes = await roomsApi.getRooms({ page: 1, limit: 1 });
        const totalRooms = roomsRes?.data?.totalRooms ?? 0;

        // try fetch users count (if server provides)
        let totalUsers = 0;
        try {
          const usersRes = await api.get("/user"); // adjust if endpoint differs
          totalUsers =
            usersRes?.data?.totalUsers ??
            (Array.isArray(usersRes?.data) ? usersRes.data.length : 0);
        } catch (e) {
          // ignore if endpoint is protected / not present
        }

        // placeholder bookings count (replace with real endpoint if available)
        let bookingsCount = 0;
        try {
          const bookingsRes = await api.get("/booking"); // adjust if you have booking route
          bookingsCount =
            bookingsRes?.data?.total ??
            (Array.isArray(bookingsRes?.data) ? bookingsRes.data.length : 0);
        } catch (e) {
          // ignore
        }

        setStats({
          rooms: totalRooms,
          users: totalUsers,
          bookings: bookingsCount,
        });
      } catch (err) {
        console.error("Dashboard stats load failed", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [isLogin, user]);

  // if not admin show message and a link back
  if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
            accsess denied
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
            this section is restricted to administrators only.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-coffee text-white rounded"
            >
              Login
            </button>
            <Link to="/" className="px-4 py-2 border rounded">
              Home page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Hotal Dahsboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              welcome {user?.name || user?.email || "المدير"} take a look at the
              latest stats and manage your hotel content.
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Quick actions</div>
            <div className="flex gap-2 mt-2">
              <Link
                to="/dashboard/rooms"
                className="px-3 py-2 bg-coffee text-white rounded"
              >
                Rooms
              </Link>
              <Link to="/dashboard/users" className="px-3 py-2 border rounded">
                Users
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Total Rooms
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {loading ? "..." : stats.rooms}
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Manage and edit room inventory
          </div>
          <div className="mt-4">
            <Link to="/dashboard/rooms" className="text-sm text-coffee">
              Open Rooms section →
            </Link>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <div className="text-sm text-gray-500 dark:text-gray-300">Users</div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {loading ? "..." : stats.users}
          </div>
          <div className="mt-3 text-xs text-gray-400">
            View and manage registered users
          </div>
          <div className="mt-4">
            <Link to="/dashboard/users" className="text-sm text-coffee">
              Open Users section →
            </Link>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Bookings
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {loading ? "..." : stats.bookings}
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Monitor bookings and availability
          </div>
          <div className="mt-4">
            <Link to="/dashboard/bookings" className="text-sm text-coffee">
              Open Bookings →
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Quick links
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link to="/dashboard/rooms" className="text-coffee">
                Manage Rooms
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users" className="text-coffee">
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/dashboard/bookings" className="text-coffee">
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings" className="text-coffee">
                Site Settings
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Recent rooms
          </h3>
          <div className="mt-3">
            {/* small preview list */}
            <RecentRooms />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
          <h3 className="font-semibold text-gray-800 dark:text-white">Notes</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            just take look  and dont change anything without permission.
          </p>
        </div>
      </section>
    </div>
  );
}

/* small helper component to show recent rooms */
function RecentRooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    let mounted = true;
    async function loadRecent() {
      try {
        const res = await roomsApi.getRooms({ page: 1, limit: 5 });
        if (mounted) setRooms(res?.data?.data || []);
      } catch (e) {
        console.error("Failed recent rooms", e);
      }
    }
    loadRecent();
    return () => {
      mounted = false;
    };
  }, []);

  if (!rooms.length)
    return <div className="text-sm text-gray-400">No rooms found</div>;

  return (
    <ul className="space-y-2 text-sm">
      {rooms.map((r) => (
        <li key={r._id} className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800 dark:text-white">
              {r.roomNumber || "—"}
            </div>
            <div className="text-xs text-gray-400">{r.roomType || "—"}</div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            ${r.price}
          </div>
        </li>
      ))}
    </ul>
  );
}
