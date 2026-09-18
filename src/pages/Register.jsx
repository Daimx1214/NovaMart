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
      <div className="bg-white rounded-2xl border border-ink-200/90 shadow-md overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        {/* Left Side Panel */}
        <div className="bg-brand-50 text-ink-900 p-8 sm:p-12 flex flex-col justify-between hidden md:flex border-r border-brand-100">
          <div>
            <Logo size="lg" showSubtitle />
          </div>

          <div className="space-y-4 my-auto py-8">
            <h2 className="text-3xl font-bold leading-tight font-heading text-ink-900">
              Join NoveMart
            </h2>
            <p className="text-ink-600 text-sm leading-relaxed">
              Create an account to save delivery addresses, track orders in real time, and hear about member discounts first.
            </p>
          </div>

          <div className="pt-4 border-t border-brand-100 text-xs text-ink-500">
            Free to join, no card required
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold text-ink-900 font-heading">Create an account</h1>
            <p className="text-xs text-ink-500">Fill in your details below to register.</p>
          </div>

          {serverError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 text-rose-600 text-xs font-medium border border-rose-100">
              {serverError}
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
                className="absolute right-3 top-9 text-xs text-ink-400 hover:text-ink-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 text-white font-semibold py-3 rounded-lg hover:bg-brand-700 transition-colors shadow-xs disabled:opacity-50 mt-2 text-sm"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-ink-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-brand-600 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
