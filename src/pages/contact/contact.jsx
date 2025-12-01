import React, { useState } from "react";
import { api } from "../../api/api";
import { Link } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: string }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "Please fill required fields (name, email, message)." });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      // expects server route POST /api/contact
      await api.post("/contact", form);
      setStatus({ type: "success", text: "Message sent. We will contact you soon." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("contact submit failed", err);
      const msg = err?.response?.data?.message || "Failed to send message. Try again later.";
      setStatus({ type: "error", text: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Contact Us</h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Have a question or need help? Send us a message and we will reply shortly.
            </p>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 text-right">
            <div><span className="font-medium">Address: </span> Corniche St., Alexandria</div>
            <div><span className="font-medium">Email: </span> info@luxora.example</div>
            <div><span className="font-medium">Phone: </span> +20 100 000 0000</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
              disabled={submitting}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
              disabled={submitting}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
              disabled={submitting}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">Message *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="mt-1 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700"
              disabled={submitting}
              required
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between">
            <div>
              {status && (
                <span
                  className={`text-sm ${
                    status.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.text}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Link to="/about" className="px-3 py-2 border rounded text-sm">About</Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-coffee text-white rounded disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Visit us</h3>
          <div className="mt-3">
            <iframe
              title="hotel-location"
              src={`https://www.google.com/maps?q=${encodeURIComponent("Corniche St., Alexandria")}&output=embed`}
              className="w-full h-48 rounded"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}