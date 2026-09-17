import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/db";
import { clearCart } from "../redux/cartSlice";
import CustomInput from "../components/CustomInput";

function Checkout() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    if (!form.phone.trim()) newErrors.phone = "Required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";

    if (form.paymentMethod === "card") {
      if (!form.cardNumber.trim()) newErrors.cardNumber = "Required";
      if (!form.expiry.trim()) newErrors.expiry = "Required";
      if (!form.cvv.trim()) newErrors.cvv = "Required";
    }
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
    try {
      const order = await createOrder({
        userId: currentUser.id,
        items,
        total,
        shippingAddress: `${form.address}, ${form.city}`,
        contactPhone: form.phone,
        paymentMethod: form.paymentMethod,
        paymentStatus: form.paymentMethod === "card" ? "paid" : "unpaid",
      });

      dispatch(clearCart());
      navigate("/orders", { state: { justPlacedOrderId: order.id } });
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
        <button onClick={() => navigate("/")} className="text-sm font-bold text-emerald-600 hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 border-b border-slate-200 pb-6">
        <span className="text-slate-400 flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">1</span>
          Shopping Cart
        </span>
        <span>→</span>
        <span className="text-emerald-600 flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
          Shipping & Payment
        </span>
        <span>→</span>
        <span className="flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">3</span>
          Confirmation
        </span>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Checkout Order</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Form Inputs Left Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact & Shipping */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">
              1. Shipping & Contact Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <CustomInput id="name" name="name" label="Full Name" value={form.name} onChange={handleChange} error={errors.name} />
              <CustomInput id="email" name="email" type="email" label="Email Address" value={form.email} onChange={handleChange} error={errors.email} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <CustomInput id="phone" name="phone" label="Phone Number" placeholder="+92 300 1234567" value={form.phone} onChange={handleChange} error={errors.phone} />
              <CustomInput id="city" name="city" label="City" placeholder="Lahore, Karachi, Islamabad..." value={form.city} onChange={handleChange} error={errors.city} />
            </div>

            <CustomInput id="address" name="address" label="Complete Street Address" placeholder="House #, Street name, Sector..." value={form.address} onChange={handleChange} error={errors.address} />
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">
              2. Select Payment Method
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <label
                onClick={() => setForm({ ...form, paymentMethod: "cod" })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  form.paymentMethod === "cod" ? "border-emerald-600 bg-emerald-50/50" : "border-slate-200 bg-white"
                }`}
              >
                <input type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === "cod"} onChange={() => {}} className="text-emerald-600" />
                <div>
                  <span className="block font-bold text-slate-800 text-sm">Cash on Delivery</span>
                  <span className="block text-xs text-slate-500">Pay cash upon parcel arrival</span>
                </div>
              </label>

              <label
                onClick={() => setForm({ ...form, paymentMethod: "card" })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  form.paymentMethod === "card" ? "border-emerald-600 bg-emerald-50/50" : "border-slate-200 bg-white"
                }`}
              >
                <input type="radio" name="paymentMethod" value="card" checked={form.paymentMethod === "card"} onChange={() => {}} className="text-emerald-600" />
                <div>
                  <span className="block font-bold text-slate-800 text-sm">Credit / Debit Card</span>
                  <span className="block text-xs text-slate-500">Visa, MasterCard, UnionPay</span>
                </div>
              </label>
            </div>

            {form.paymentMethod === "card" && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <CustomInput id="cardNumber" name="cardNumber" label="Card Number" placeholder="4000 1234 5678 9010" value={form.cardNumber} onChange={handleChange} error={errors.cardNumber} />
                <div className="grid grid-cols-2 gap-4">
                  <CustomInput id="expiry" name="expiry" label="Expiry (MM/YY)" placeholder="12/28" value={form.expiry} onChange={handleChange} error={errors.expiry} />
                  <CustomInput id="cvv" name="cvv" label="CVV Security Code" placeholder="123" value={form.cvv} onChange={handleChange} error={errors.cvv} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4 sticky top-24">
            <h2 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">Items Review</h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.productId} className="flex justify-between items-center text-xs">
                  <span className="line-clamp-1 font-medium text-slate-700">{i.title} × {i.quantity}</span>
                  <span className="font-bold text-slate-900">Rs. {(i.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-slate-800">{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
              <span className="font-extrabold text-slate-800 text-sm">Total Payable</span>
              <span className="font-extrabold text-emerald-600 text-xl">Rs. {total.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 text-sm"
            >
              {loading ? "Processing Order..." : "Confirm & Place Order →"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
