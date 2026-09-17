import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../api/db";
import { addItem } from "../redux/cartSlice";
import { getProductImage, getFallbackImage } from "../utils/image";
import { useAuth } from "../context/AuthContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdmin, isAuthenticated } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const found = await getProductById(id);
        if (!found) {
          setError("Product not found");
        } else {
          setProduct(found);
        }
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="h-10 w-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-slate-500">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-4xl">❌</p>
        <h2 className="text-xl font-bold text-slate-800">{error || "Product Not Found"}</h2>
        <Link to="/" className="inline-block text-sm font-bold text-emerald-600 hover:underline">
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  const inCart = cartItems.find((item) => item.productId === product.id);
  const cartQuantity = inCart ? inCart.quantity : 0;

  function handleAddToCart() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(addItem(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleBuyNow() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!inCart) {
      dispatch(addItem(product));
    }
    navigate("/cart");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span>/</span>
        <span className="text-slate-400">{product.category}</span>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate">{product.title}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {/* Left Photo Container */}
        <div className="h-96 w-full bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center relative border border-slate-200">
          <img
            src={getProductImage(product, "detail")}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-zoom-in"
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getFallbackImage(product);
            }}
          />
          <div className="absolute top-4 left-4 bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
            Verified Authentic
          </div>
        </div>

        {/* Right Info Box */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{product.title}</h1>

            <div className="flex items-center gap-3 text-sm">
              <span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1">
                ★ {product.rating}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">120+ Verified Ratings</span>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 uppercase font-semibold">Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  Free Shipping
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed pt-2">
              {product.description}
            </p>

            <div className="flex items-center gap-4 text-xs pt-2">
              <span className="text-slate-500">
                Stock Status:{" "}
                <span className={`font-bold ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {product.stock > 0 ? `${product.stock} units available` : "Out of Stock"}
                </span>
              </span>
              {cartQuantity > 0 && (
                <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-lg">
                  {cartQuantity} currently in cart
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            {isAdmin ? (
              <div className="p-3 bg-amber-50 text-amber-800 text-xs font-semibold rounded-xl border border-amber-200 text-center">
                Admin Mode: Product management available in Admin Dashboard
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span>🛒</span>
                  <span>{added ? "Added to Cart! ✓" : "Add to Cart"}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabbed Info Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex border-b border-slate-200 gap-8 text-sm font-bold">
          {["overview", "specifications", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-3 capitalize transition-all border-b-2 ${
                activeTab === t
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-800">Product Highlights</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>High-durability materials designed for daily wear & tear.</li>
              <li>Tested for safety, performance, and optimal usability.</li>
              <li>Includes full manufacturer warranty and Shoply satisfaction guarantee.</li>
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-400">Category</span>
              <span className="font-semibold text-slate-800">{product.category}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-400">Rating</span>
              <span className="font-semibold text-slate-800">{product.rating} / 5.0</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-400">Warranty</span>
              <span className="font-semibold text-slate-800">1 Year Official</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-400">Shipping Weight</span>
              <span className="font-semibold text-slate-800">0.5 kg</span>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between">
              <span>Overall Satisfaction Rating: 98% Positive</span>
              <span>Based on 120+ Verified Buyers</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Hamza K.</span>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Excellent quality product! Delivery was very fast and packaging was secure.</p>
              </div>
              <div className="border-b border-slate-100 pb-3">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Sara A.</span>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Product exactly matches the image and description. Highly recommended store.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
