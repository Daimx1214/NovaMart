import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrdersForUser } from "../api/db";
import { getProductImage, getFallbackImage } from "../utils/image";

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

const STATUS_LABELS = {
  pending: "⏳ Awaiting Store Confirmation",
  confirmed: "✓ Order Confirmed",
  shipped: "🚚 Out for Shipping",
  delivered: "🎉 Delivered Successfully",
  cancelled: "✕ Order Cancelled",
};

function OrderHistory() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const justPlacedOrderId = location.state?.justPlacedOrderId;

  useEffect(() => {
    async function load() {
      if (!currentUser?.id) {
        setOrders([]);
        setLoading(false);
        return;
      }
      const data = await getOrdersForUser(currentUser.id);
      setOrders(data);
      setLoading(false);
    }
    load();
  }, [currentUser?.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Order History</h1>
        <p className="text-xs text-slate-500 mt-1">Track existing orders and review past purchases.</p>
      </div>

      {justPlacedOrderId && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm p-4 flex items-center gap-3 shadow-sm">
          <span className="text-xl">🎉</span>
          <div>
            <p className="font-bold">Order Placed Successfully!</p>
            <p className="text-xs text-emerald-700">Order #{justPlacedOrderId.slice(-6)} has been recorded and is awaiting store approval.</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-20 space-y-3">
          <div className="h-10 w-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-500">Loading order records...</p>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3 shadow-sm">
          <p className="text-4xl">📦</p>
          <h3 className="font-bold text-slate-800 text-lg">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't placed any orders with Shoply yet. Browse our catalog and start shopping!
          </p>
          <Link
            to="/"
            className="inline-block bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Start Shopping
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="font-extrabold text-slate-900 text-base">Order #{order.id.slice(-6)}</span>
                <span className="block text-xs text-slate-400">
                  Placed on {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[order.status]}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>

            {/* Items detail list */}
            <div className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.productId} className="py-3 flex items-center gap-4">
                  <div className="h-12 w-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100">
                    <img
                      src={getProductImage(item, "100x100")}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getFallbackImage(item, "100x100");
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-xs line-clamp-1">{item.title}</p>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <span className="font-bold text-slate-900 text-xs">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                <span>Payment: <strong className="capitalize text-slate-700">{order.paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery"}</strong></span>
                <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${order.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {order.paymentStatus}
                </span>
              </div>

              <div className="text-right">
                <span className="text-slate-400 mr-2">Total Amount Paid:</span>
                <span className="font-extrabold text-slate-900 text-base">Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
