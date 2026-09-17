import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email address is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setServerError(err.message || "Registration failed.");
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
              Join Shoply Today
            </span>
            <h2 className="text-3xl font-extrabold leading-tight">
              Start Shopping With Exclusive Member Benefits
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Create an account in seconds to save delivery addresses, view real-time order tracking, and receive member discount alerts.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800 text-xs text-slate-400">
            ✓ 100% Free Account Registration
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold text-slate-800">Create New Account</h1>
            <p className="text-xs text-slate-500">Fill in your details below to register.</p>
          </div>

          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-100 flex items-center gap-2">
              <span>⚠️</span>
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <CustomInput
              id="name"
              name="name"
              label="Full Name"
              placeholder="e.g. Daim Ali"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            <CustomInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="e.g. daimx1214@gmail.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div className="relative">
              <CustomInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 mt-2"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-emerald-600 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
