import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrdersForUser } from "../api/db";
import { getProductImage, getFallbackImage } from "../utils/image";
import { PackageCheck, CheckCircle } from "lucide-react";

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200/80",
  confirmed: "bg-sky-50 text-sky-700 border-sky-200/80",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
  delivered: "bg-brand-50 text-brand-700 border-brand-100/80",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200/80",
};

const STATUS_LABELS = {
  pending: "Awaiting Confirmation",
  confirmed: "Order Confirmed",
  shipped: "Out for Shipping",
  delivered: "Delivered Successfully",
  cancelled: "Order Cancelled",
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
        <h1 className="text-3xl font-bold text-ink-900 tracking-tight font-heading">Order History</h1>
        <p className="text-xs text-ink-500 mt-1">Track existing orders and review past purchases.</p>
      </div>

      {justPlacedOrderId && (
        <div className="rounded-xl bg-brand-50 border border-brand-100 text-brand-900 text-sm p-4 flex items-center gap-3 shadow-xs">
          <CheckCircle className="w-6 h-6 text-brand-600 flex-shrink-0" />
          <div>
            <p className="font-bold font-heading">Order Placed Successfully!</p>
            <p className="text-xs text-brand-700">Order #{justPlacedOrderId.slice(-6)} has been recorded and is awaiting store approval.</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-20 space-y-3">
          <div className="h-10 w-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-ink-500">Loading order records...</p>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-ink-200/90 text-center space-y-3 shadow-xs">
          <div className="inline-flex p-3 rounded-full bg-ink-100 text-ink-400 mb-1">
            <PackageCheck className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-ink-900 text-lg font-heading">No Orders Placed Yet</h3>
          <p className="text-xs text-ink-500 max-w-sm mx-auto">
            You haven't placed any orders with NoveMart yet. Browse our catalog and start shopping!
          </p>
          <Link
            to="/"
            className="inline-block bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-lg text-xs hover:bg-brand-700 transition-colors shadow-xs"
          >
            Start Shopping
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-ink-200/90 p-6 shadow-xs space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink-100 pb-4">
              <div>
                <span className="font-bold text-ink-900 text-base font-heading">Order #{order.id.slice(-6)}</span>
                <span className="block text-xs text-ink-400">
                  Placed on {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </span>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-md border ${STATUS_STYLES[order.status]}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>

            {/* Items detail list */}
            <div className="divide-y divide-ink-100">
              {order.items.map((item) => (
                <div key={item.productId} className="py-3 flex items-center gap-4">
                  <div className="h-12 w-12 bg-ink-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-ink-100">
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
                    <p className="font-bold text-ink-900 text-xs line-clamp-1 font-heading">{item.title}</p>
                    <p className="text-[11px] text-ink-400">Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <span className="font-bold text-ink-900 text-xs font-heading">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="pt-3 border-t border-ink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-500">
              <div>
                <span>Payment: <strong className="capitalize text-ink-700">{order.paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery"}</strong></span>
                <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${order.paymentStatus === "paid" ? "bg-brand-50 text-brand-700 border border-brand-100/60" : "bg-amber-50 text-amber-700 border border-amber-200/60"}`}>
                  {order.paymentStatus}
                </span>
              </div>

              <div className="text-right">
                <span className="text-ink-400 mr-2">Total Amount Paid:</span>
                <span className="font-bold text-ink-900 text-base font-heading">Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
