import { useEffect, useState } from "react";
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
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Store Management
          </span>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-2">
            Admin Control Dashboard
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-emerald-500/20 transition-all"
        >
          + Add New Product
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Store Revenue</span>
          <p className="text-2xl font-extrabold text-emerald-600">Rs. {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Orders</span>
          <p className="text-2xl font-extrabold text-slate-800">{totalOrdersCount}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Products</span>
          <p className="text-2xl font-extrabold text-slate-800">{totalProductsCount}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Low Stock Alert</span>
          <p className="text-2xl font-extrabold text-amber-600">{lowStockCount} items</p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-3.5 text-xs font-bold transition-all border-b-2 ${
              activeTab === "products" ? "border-emerald-600 text-emerald-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Products Management ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-3.5 text-xs font-bold transition-all border-b-2 ${
              activeTab === "orders" ? "border-emerald-600 text-emerald-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : activeTab === "products" ? (
          /* Products Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-800 line-clamp-1">{p.title}</td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4 font-semibold text-slate-900">Rs. {p.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-bold ${p.stock < 5 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                        {p.stock} left
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditModal(p)} className="text-emerald-600 font-bold hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 font-bold hover:underline">
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
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer ID</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-800">#{o.id.slice(-6)}</td>
                    <td className="p-4 text-slate-500">{o.userId}</td>
                    <td className="p-4 font-semibold text-slate-900">Rs. {o.total.toLocaleString()}</td>
                    <td className="p-4 capitalize">{o.paymentMethod} ({o.paymentStatus})</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-slate-100 text-slate-700">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="rounded border border-slate-300 px-2 py-1 text-xs outline-none bg-white font-medium"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-extrabold text-slate-800">
              {editingProduct ? "Edit Product Details" : "Add New Product"}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <CustomInput id="title" label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <CustomInput id="price" type="number" label="Price (PKR)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                <CustomInput id="stock" type="number" label="Stock Quantity" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
              </div>

              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                >
                  {["Electronics", "Mobile Accessories", "Fashion", "Shoes", "Home & Kitchen", "Beauty & Personal Care", "Sports & Fitness", "Books & Stationery", "Bags & Accessories", "Watches & Jewelry"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <CustomInput id="imageUrl" label="Direct Image URL (Unsplash)" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://images.unsplash.com/photo-..." />

              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-md"
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
