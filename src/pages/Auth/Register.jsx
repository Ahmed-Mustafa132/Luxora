import Visible from "../../components/Visible/Visible";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const { name, email, password, confirmPassword } = form;
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await register({ name, email, password });
      // If your register returns an error shape, handle it:
      if (res?.error) {
        setError(res?.message || "Registration failed");
        setSubmitting(false);
        return;
      }
      // success -> go home (or previous page)
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Registration failed"
      );
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      <Visible direction="right" duration={700} delay={1}>
        <div className="min-h-screen bg-lightGray dark:bg-darkChocolate transition-colors duration-300">
          <div className="container mx-auto px-6 py-12">
            <div className="bg-white dark:bg-DarkCoffee bg-opacity-95 rounded-xl shadow-xl p-8 max-w-md mx-auto">
              <h2 className="text-4xl font-bold text-chocolate dark:text-offWhite text-center mb-8">
                Create Account
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-chocolate dark:text-coffee"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-lightGray dark:bg-chocolate border border-coffee/30 text-chocolate dark:text-offWhite placeholder-chocolate/70 dark:placeholder-coffee/70 focus:outline-none focus:ring-2 focus:ring-coffee"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-chocolate dark:text-coffee"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-lightGray dark:bg-chocolate border border-coffee/30 text-chocolate dark:text-offWhite placeholder-chocolate/70 dark:placeholder-coffee/70 focus:outline-none focus:ring-2 focus:ring-coffee"
                    placeholder="Enter your email"
                    onChange={handleChange}
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
                    required
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-lightGray dark:bg-chocolate border border-coffee/30 text-chocolate dark:text-offWhite placeholder-chocolate/70 dark:placeholder-coffee/70 focus:outline-none focus:ring-2 focus:ring-coffee"
                    placeholder="Create a password"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-chocolate dark:text-coffee"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-lightGray dark:bg-chocolate border border-coffee/30 text-chocolate dark:text-offWhite placeholder-chocolate/70 dark:placeholder-coffee/70 focus:outline-none focus:ring-2 focus:ring-coffee"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-coffee text-darkChocolate dark:text-offWhite rounded-lg font-medium hover:bg-coffee/90 transition-all duration-200 transform hover:scale-105"
                >
                  {submitting ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="mt-6 text-center text-chocolate dark:text-coffee">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium underline hover:text-coffee dark:hover:text-offWhite"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Visible>
    </>
  );
}
