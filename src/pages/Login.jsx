import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-2xl border border-ink-200/90 shadow-md overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        {/* Left Side Panel */}
        <div className="bg-brand-50 text-ink-900 p-8 sm:p-12 flex flex-col justify-between hidden md:flex border-r border-brand-100">
          <div>
            <Logo size="lg" showSubtitle />
          </div>

          <div className="space-y-4 my-auto py-8">
            <h2 className="text-3xl font-bold leading-tight font-heading text-ink-900">
              Welcome back
            </h2>
            <p className="text-ink-600 text-sm leading-relaxed">
              Log in to track existing orders, review past purchases, manage your shipping profile, or access store management tools.
            </p>
          </div>

          <div className="pt-4 border-t border-brand-100 text-xs text-ink-500">
            Secure store authentication
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold text-ink-900 font-heading">Sign in</h1>
            <p className="text-xs text-ink-500">Enter your email and password below.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 text-rose-600 text-xs font-medium border border-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <CustomInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="e.g. daimx1214@gmail.com"
              value={form.email}
              onChange={handleChange}
            />

            <div className="relative">
              <CustomInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-xs text-ink-400 hover:text-ink-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-ink-600 cursor-pointer">
                <input type="checkbox" className="rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
                <span>Remember me</span>
              </label>
              <Link to="/faq" className="text-brand-600 font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 text-white font-semibold py-3 rounded-lg hover:bg-brand-700 transition-colors shadow-xs disabled:opacity-50 mt-2 text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-ink-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-brand-600 hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
