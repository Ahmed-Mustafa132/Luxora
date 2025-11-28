import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import authApi from "../api/api";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, isLogin, updateUser } = useAuth();

  // بيانات افتراضية لو مفيش user
  const fake = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+20 100 000 0000",
    bio: "مثال: مطوّر ويب من القاهرة",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
  };

  const initial = user
    ? {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      }
    : fake;

  const [form, setForm] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setMsg("");
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!isLogin) {
      setMsg("يجب تسجيل الدخول لتعديل البيانات.");
      return;
    }
    setLoading(true);
    try {
      // يفترض وجود endpoint PUT /user/me لإجراء التحديث
      const res = await authApi.put("/user/me", form);
      // لو الخادم رجع البيانات المحدثة، حدّث السياق
      updateUser(res?.data || form);
      setMsg("تم حفظ التعديلات بنجاح");
      setEditing(false);
    } catch (err) {
      setMsg("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-6">
          <img
            src={form.avatar || fake.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {form.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">{form.bio}</p>
          </div>
          <div className="ml-auto">
            {!isLogin ? (
              <Link to="/login" className="px-4 py-2 bg-coffee text-white rounded">
                سجل دخول
              </Link>
            ) : (
              <button
                onClick={() => setEditing((s) => !s)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                {editing ? "إلغاء" : "تعديل"}
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">الاسم</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editing}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">البريد الإلكتروني</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">الهاتف</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editing}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">رابط الصورة</label>
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              disabled={!editing}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">نبذة</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!editing}
              rows={4}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-3">
            {msg && <span className="text-sm text-green-600 dark:text-green-400">{msg}</span>}
            {editing && (
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-coffee text-white rounded"
              >
                {loading ? "جار الحفظ..." : "حفظ"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}