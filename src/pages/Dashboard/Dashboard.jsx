import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { roomsApi, api, authApi } from "../../api/api";
import Visible from "../../components/Visible/Visible";
import {
  FaChartBar,
  FaUsers,
  FaCalendarAlt,
  FaCog,
  FaArrowRight,
} from "react-icons/fa";

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
      setLoading(false);
      return;
    }

    async function loadStats() {
      setLoading(true);
      try {
        const res = await authApi
          .dashboard()
          .then((res) => {
            setStats({
              rooms: res.data.rooms,
              users: res.data.users,
              bookings: res.data.bookings,
            });
          })
          .catch((e) => {
            return null;
          });
      } catch (err) {
        console.error("Dashboard stats load failed", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [isLogin, user]);

  if (!isLogin || !(user?.role === "admin" || user?.isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900">
        <Visible direction="up" duration={600}>
          <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-8 text-center border dark:border-slate-800">
            <div className="text-5xl mb-4 text-amber-600">🔒</div>
            <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-slate-100">
              Access Denied
            </h2>
            <p className="text-base text-gray-600 dark:text-slate-400 mb-6">
              This section is restricted to administrators only.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-700 dark:to-amber-800 dark:hover:from-amber-800 dark:hover:to-amber-900 text-white rounded-lg font-medium shadow-lg transition transform hover:scale-105"
              >
                Sign In
              </button>
              <Link
                to="/"
                className="px-6 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition"
              >
                Go Home
              </Link>
            </div>
          </div>
        </Visible>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <Visible direction="down" duration={500}>
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-2">
                Hotel Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-slate-400">
                Welcome back,{" "}
                <span className="font-semibold text-amber-600">
                  {user?.name || user?.email}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/dashboard/rooms"
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg font-medium shadow-md transition transform hover:scale-105"
              >
                <div className="inline mr-2" /> Manage Rooms
              </Link>
              <Link
                to="/dashboard/users"
                className="px-4 py-2 border-2 border-amber-600 dark:border-amber-700 text-amber-600 dark:text-amber-500 rounded-lg font-medium hover:bg-amber-50 dark:hover:bg-slate-800 transition"
              >
                <FaUsers className="inline mr-2" /> Users
              </Link>
            </div>
          </header>
        </Visible>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Visible direction="up" duration={600} delay={100}>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/50 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Total Rooms
                  </p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-slate-100 mt-2">
                    {loading ? "..." : stats.rooms}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-600 dark:bg-blue-700 rounded-lg flex items-center justify-center text-white text-xl">
                  <div />
                </div>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                Manage and edit inventory
              </p>
              <Link
                to="/dashboard/rooms"
                className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
              >
                View Details <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </Visible>

          <Visible direction="up" duration={600} delay={200}>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/50 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Registered Users
                  </p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-slate-100 mt-2">
                    {loading ? "..." : stats.users}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-600 dark:bg-green-700 rounded-lg flex items-center justify-center text-white text-xl">
                  <FaUsers />
                </div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mb-3">
                View and manage users
              </p>
              <Link
                to="/dashboard/users"
                className="inline-flex items-center text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition"
              >
                View Details <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </Visible>

          <Visible direction="up" duration={600} delay={300}>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/50 rounded-xl shadow-lg p-6 border border-purple-200 dark:border-purple-800 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    Total Bookings
                  </p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-slate-100 mt-2">
                    {loading ? "..." : stats.bookings}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600 dark:bg-purple-700 rounded-lg flex items-center justify-center text-white text-xl">
                  <FaCalendarAlt />
                </div>
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mb-3">
                Monitor bookings
              </p>
              <Link
                to="/dashboard/bookings"
                className="inline-flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"
              >
                View Details <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </Visible>
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Links */}
          <Visible direction="left" duration={600} delay={400}>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border dark:border-slate-800 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center">
                <FaChartBar className="mr-2 text-amber-600" /> Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/dashboard/rooms"
                    className="flex items-center text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 font-medium transition"
                  >
                    <span className="mr-2">📦</span> Manage Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/users"
                    className="flex items-center text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 font-medium transition"
                  >
                    <span className="mr-2">👥</span> Manage Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/bookings"
                    className="flex items-center text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 font-medium transition"
                  >
                    <span className="mr-2">📅</span> Manage Bookings
                  </Link>
                </li>
              </ul>
            </div>
          </Visible>

          {/* Recent Rooms */}
          <Visible
            direction="up"
            duration={600}
            delay={500}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border dark:border-slate-800 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center">
                <div className="mr-2 text-amber-600" /> Recent Rooms
              </h3>
              <RecentRooms />
            </div>
          </Visible>
        </section>

        {/* Info Section */}
        <Visible direction="up" duration={600} delay={600}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl shadow-lg p-6 border border-amber-200 dark:border-amber-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
              📌 Important Notice
            </h3>
            <p className="text-gray-700 dark:text-slate-300">
              Please review all changes carefully before saving. Make sure to
              keep backups of important data. Contact support for any
              assistance.
            </p>
          </div>
        </Visible>
      </div>
    </div>
  );
}

/* Recent Rooms Component */
function RecentRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadRecent() {
      try {
        const res = await roomsApi.getRooms({ page: 1, limit: 5 });
        if (mounted) setRooms(res?.data?.data || []);
      } catch (e) {
        console.error("Failed to load recent rooms", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadRecent();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-slate-400 py-8">
        Loading rooms...
      </div>
    );
  }

  if (!rooms.length) {
    return (
      <div className="text-center text-gray-400 dark:text-slate-500 py-8">
        No rooms found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rooms.map((r, idx) => (
        <Visible key={r._id} direction="right" duration={500} delay={idx * 100}>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition border border-gray-200 dark:border-slate-700">
            <div>
              <p className="font-semibold text-gray-900 dark:text-slate-100">
                {r.roomNumber || "—"}
              </p>
              <p className="text-xs text-gray-600 dark:text-slate-400">
                {r.roomType || "—"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-amber-600 dark:text-amber-500">
                ${r.price}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {r.status || "Available"}
              </p>
            </div>
          </div>
        </Visible>
      ))}
    </div>
  );
}
