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
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        {/* Left Side Aesthetic Showcase */}
        <div className="bg-gradient-to-tr from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="relative z-10">
            <Logo size="lg" light showSubtitle />
          </div>

          <div className="space-y-4 relative z-10 my-auto py-8">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              Welcome Back
            </span>
            <h2 className="text-3xl font-extrabold leading-tight">
              Access Your Personal Orders & Wishlist
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Log in to track existing orders, review past purchases, manage your shipping profile, or manage the store catalog.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800 text-xs text-slate-400">
            ✓ Secure Store Authentication
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold text-slate-800">Sign In to Your Account</h1>
            <p className="text-xs text-slate-500">Enter your email and password below.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-100 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
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
                className="absolute right-3 top-9 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span>Remember me</span>
              </label>
              <Link to="/faq" className="text-emerald-600 font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-emerald-600 hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
