import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem, updateQuantity } from "../redux/cartSlice";
import { getProductImage, getFallbackImage } from "../utils/image";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  function handleApplyPromo(e) {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "NOVEMART10" || promoCode.trim().toUpperCase() === "NOVAMART10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
    } else {
      setPromoError("Invalid code. Try NOVEMART10 for 10% off!");
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-ink-100 text-ink-400 mb-1">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-ink-900 font-heading">Your Shopping Cart is Empty</h2>
        <p className="text-ink-500 text-sm max-w-sm mx-auto">
          Looks like you haven't added any products to your NoveMart cart yet.
        </p>
        <Link
          to="/"
          className="inline-block bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors shadow-xs text-sm"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Progress Steps Header */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold text-ink-400 border-b border-ink-200/80 pb-6">
        <span className="text-brand-600 flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-heading">1</span>
          Shopping Cart
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-ink-200 text-ink-600 flex items-center justify-center text-xs font-heading">2</span>
          Shipping & Payment
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-ink-200 text-ink-600 flex items-center justify-center text-xs font-heading">3</span>
          Confirmation
        </span>
      </div>

      <h1 className="text-3xl font-bold text-ink-900 tracking-tight font-heading">Your Shopping Cart ({items.length})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-xl p-4 border border-ink-200/90 shadow-xs flex items-center gap-4"
            >
              <div className="h-20 w-20 bg-ink-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-ink-100">
                <img
                  src={getProductImage(item, "150x150")}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getFallbackImage(item, "150x150");
                  }}
                />
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-ink-900 text-sm line-clamp-1 font-heading">{item.title}</h3>
                <p className="text-xs text-ink-500 font-medium">Rs. {item.price.toLocaleString()} each</p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className="h-7 w-7 rounded-md border border-ink-300 bg-ink-50 font-bold text-ink-700 hover:bg-ink-100"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="h-7 w-7 rounded-md border border-ink-300 bg-ink-50 font-bold text-ink-700 hover:bg-ink-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="font-bold text-ink-900 text-base font-heading">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => dispatch(removeItem(item.productId))}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sticky Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-ink-200/90 shadow-xs space-y-4 sticky top-24">
            <h2 className="font-bold text-ink-900 text-lg border-b border-ink-100 pb-3 font-heading">Order Summary</h2>

            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <label className="block text-xs font-semibold text-ink-600">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. NOVEMART10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 rounded-lg border border-ink-300 px-3 py-2 text-xs uppercase outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-ink-900 text-white rounded-lg text-xs font-semibold hover:bg-ink-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>}
              {discount > 0 && <p className="text-[11px] text-brand-700 font-semibold mt-1">✓ Promo applied: Rs. {discount.toLocaleString()} off!</p>}
            </form>

            <div className="space-y-2 text-xs text-ink-600 pt-2 border-t border-ink-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-ink-700 font-heading">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-brand-700 font-semibold">
                  <span>Discount</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-ink-700 font-heading">
                  {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                </span>
              </div>
            </div>

            <div className="border-t border-ink-100 pt-3 flex justify-between items-baseline">
              <span className="font-bold text-ink-900 text-sm font-heading">Grand Total</span>
              <span className="font-bold text-brand-600 text-xl font-heading">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-lg transition-colors text-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
