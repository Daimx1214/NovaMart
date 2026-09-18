import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getAllProducts, getAllOrders, createProduct, updateProduct, deleteProduct, updateOrderStatus } from "../api/db";
import CustomInput from "../components/CustomInput";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add / Edit Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Electronics",
    stock: "",
    rating: "4.5",
    color: "Black",
    description: "",
    imageKeywords: "",
    imageUrl: "",
  });

  async function loadData() {
    setLoading(true);
    const [pList, oList] = await Promise.all([getAllProducts(), getAllOrders()]);
    setProducts(pList);
    setOrders(oList);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  // KPI Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  function openAddModal() {
    setEditingProduct(null);
    setFormData({
      title: "",
      price: "",
      category: "Electronics",
      stock: "10",
      rating: "4.5",
      color: "Black",
      description: "",
      imageKeywords: "",
      imageUrl: "",
    });
    setModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: String(product.price),
      category: product.category,
      stock: String(product.stock),
      rating: String(product.rating),
      color: product.color || "Black",
      description: product.description || "",
      imageKeywords: product.imageKeywords || "",
      imageUrl: product.imageUrl || "",
    });
    setModalOpen(true);
  }

  async function handleSaveProduct(e) {
    e.preventDefault();
    const payload = {
      title: formData.title,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      color: formData.color,
      description: formData.description,
      imageKeywords: formData.imageKeywords,
      imageUrl: formData.imageUrl,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
    } else {
      await createProduct(payload);
    }
    setModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadData();
    }
  }

  async function handleStatusChange(orderId, newStatus) {
    await updateOrderStatus(orderId, newStatus);
    loadData();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Dashboard Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md">
            Store Management
          </span>
          <h1 className="text-3xl font-bold text-ink-900 tracking-tight font-heading mt-2">
            Admin Control Dashboard
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2.5 rounded-lg text-xs transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-ink-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">Total Store Revenue</span>
          <p className="text-2xl font-bold text-brand-600 font-heading">Rs. {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-ink-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">Total Orders</span>
          <p className="text-2xl font-bold text-ink-900 font-heading">{totalOrdersCount}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-ink-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">Total Products</span>
          <p className="text-2xl font-bold text-ink-900 font-heading">{totalProductsCount}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-ink-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">Low Stock Alert</span>
          <p className="text-2xl font-bold text-amber-600 font-heading">{lowStockCount} items</p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-white rounded-xl border border-ink-200/90 shadow-xs overflow-hidden">
        <div className="flex border-b border-ink-200 bg-ink-50/50">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-3.5 text-xs font-semibold transition-colors border-b-2 font-heading ${
              activeTab === "products" ? "border-brand-600 text-brand-600 bg-white" : "border-transparent text-ink-500 hover:text-ink-700"
            }`}
          >
            Products Management ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-3.5 text-xs font-semibold transition-colors border-b-2 font-heading ${
              activeTab === "orders" ? "border-brand-600 text-brand-600 bg-white" : "border-transparent text-ink-500 hover:text-ink-700"
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : activeTab === "products" ? (
          /* Products Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink-600">
              <thead className="bg-ink-50 text-ink-500 font-semibold uppercase tracking-wider border-b border-ink-200">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-ink-50/80 transition-colors">
                    <td className="p-4 font-semibold text-ink-900 line-clamp-1 font-heading">{p.title}</td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4 font-semibold text-ink-900 font-heading">Rs. {p.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded font-semibold text-[11px] ${p.stock < 5 ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-brand-50 text-brand-700 border border-brand-100"}`}>
                        {p.stock} left
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditModal(p)} className="text-brand-600 font-semibold hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="text-rose-600 font-semibold hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Orders Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink-600">
              <thead className="bg-ink-50 text-ink-500 font-semibold uppercase tracking-wider border-b border-ink-200">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer ID</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-ink-50/80 transition-colors">
                    <td className="p-4 font-semibold text-ink-900 font-heading">#{o.id.slice(-6)}</td>
                    <td className="p-4 text-ink-500">{o.userId}</td>
                    <td className="p-4 font-semibold text-ink-900 font-heading">Rs. {o.total.toLocaleString()}</td>
                    <td className="p-4 capitalize">{o.paymentMethod} ({o.paymentStatus})</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded text-[10px] font-semibold uppercase bg-ink-100 text-ink-700 border border-ink-200/80">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="rounded-md border border-ink-300 px-2 py-1 text-xs outline-none bg-white font-medium focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-lg space-y-4 max-h-[90vh] overflow-y-auto border border-ink-200">
            <h2 className="text-xl font-bold text-ink-900 font-heading">
              {editingProduct ? "Edit Product Details" : "Add New Product"}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <CustomInput id="title" label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <CustomInput id="price" type="number" label="Price (PKR)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                <CustomInput id="stock" type="number" label="Stock Quantity" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
              </div>

              <div>
                <label className="block mb-1 text-xs font-semibold text-ink-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-ink-300 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
                >
                  {["Electronics", "Mobile Accessories", "Fashion", "Shoes", "Home & Kitchen", "Beauty & Personal Care", "Sports & Fitness", "Books & Stationery", "Bags & Accessories", "Watches & Jewelry"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <CustomInput id="imageUrl" label="Direct Image URL (Unsplash)" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://images.unsplash.com/photo-..." />

              <div>
                <label className="block mb-1 text-xs font-semibold text-ink-700">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-ink-300 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 bg-ink-100 text-ink-700 rounded-lg text-xs font-semibold hover:bg-ink-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-700 transition-colors shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
