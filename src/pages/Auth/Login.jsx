import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Visible from "../../components/Visible/Visible";
import { useAuth } from "../../context/Auth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { email, password } = form;
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await login({ email, password });
      if (res?.error || res?.message === "Invalid credentials") {
        setError(res?.message || "Login failed");
        setSubmitting(false);
        return;
      }
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(error)
      setError(err?.response?.data?.message || err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Visible direction="right" duration={700} delay={1}>
      <div className="min-h-screen bg-lightGray dark:bg-darkChocolate transition-colors duration-300 flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="bg-white dark:bg-DarkCoffee rounded-xl shadow-xl p-8 max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-chocolate dark:text-offWhite text-center mb-6">
              Welcome back
            </h2>
            <p className="text-sm text-chocolate dark:text-coffee text-center mb-6">
              Sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-chocolate dark:text-coffee"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-lightGray dark:bg-chocolate border border-coffee/30 text-chocolate dark:text-offWhite placeholder-chocolate/70 dark:placeholder-coffee/70 focus:outline-none focus:ring-2 focus:ring-coffee"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-chocolate dark:text-coffee"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-lightGray dark:bg-chocolate border border-coffee/30 text-chocolate dark:text-offWhite placeholder-chocolate/70 dark:placeholder-coffee/70 focus:outline-none focus:ring-2 focus:ring-coffee"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-chocolate dark:text-coffee">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-coffee rounded"
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot" className="text-coffee hover:underline">
                  Forgot?
                </Link>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-coffee text-darkChocolate dark:text-offWhite rounded-lg font-medium hover:bg-coffee/90 transition-all duration-200 transform hover:scale-102 disabled:opacity-60"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-chocolate dark:text-coffee">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium underline hover:text-coffee dark:hover:text-offWhite"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Visible>
  );
}
