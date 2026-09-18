import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, CheckCircle, ShieldCheck, ArrowLeft } from "lucide-react";
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
        <div className="h-10 w-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-ink-500">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-4xl">❌</p>
        <h2 className="text-xl font-bold text-ink-700 font-heading">{error || "Product Not Found"}</h2>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
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
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-ink-500">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <span className="text-ink-400">{product.category}</span>
        <span>/</span>
        <span className="text-ink-700 font-semibold truncate">{product.title}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-2xl p-6 sm:p-8 border border-ink-200/90 shadow-xs">
        {/* Left Photo Container */}
        <div className="h-96 w-full bg-ink-50 rounded-xl overflow-hidden flex items-center justify-center relative border border-ink-100">
          <img
            src={getProductImage(product, "detail")}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getFallbackImage(product);
            }}
          />
          <div className="absolute top-3 left-3 bg-brand-900/90 text-white font-semibold text-[11px] px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-brand-900/50">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Verified Authentic
          </div>
        </div>

        {/* Right Info Box */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-medium text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-md">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-ink-900 tracking-tight font-heading">{product.title}</h1>

            <div className="flex items-center gap-3 text-sm">
              <span className="bg-amber-50 text-amber-700 border border-amber-200/80 font-bold px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1">
                ★ {product.rating}
              </span>
              <span className="text-ink-300">•</span>
              <span className="text-xs text-ink-500 font-medium">120+ Verified Ratings</span>
            </div>

            <div className="pt-3 border-t border-ink-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-ink-900 font-heading">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="text-xs text-brand-700 font-semibold bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
                  Free Express Shipping
                </span>
              </div>
            </div>

            <p className="text-ink-600 text-sm leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 text-xs pt-2">
              <span className="text-ink-500">
                Stock Status:{" "}
                <span className={`font-bold ${product.stock > 0 ? "text-brand-600" : "text-rose-600"}`}>
                  {product.stock > 0 ? `${product.stock} units available` : "Out of Stock"}
                </span>
              </span>
              {cartQuantity > 0 && (
                <span className="bg-ink-100 text-ink-700 font-semibold px-2.5 py-1 rounded-md">
                  {cartQuantity} in cart
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-ink-100">
            {isAdmin ? (
              <div className="p-3 bg-amber-50 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200 text-center">
                Admin Mode: Product management available in Admin Dashboard
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {added ? <CheckCircle className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  <span>{added ? "Added to Cart! ✓" : "Add to Cart"}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full bg-ink-900 hover:bg-ink-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-xs disabled:opacity-50"
                >
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabbed Info Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-200/90 shadow-xs space-y-6">
        <div className="flex border-b border-ink-200 gap-8 text-sm font-bold">
          {["overview", "specifications", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-3 capitalize transition-all border-b-2 font-heading ${
                activeTab === t
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-ink-400 hover:text-ink-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-3 text-sm text-ink-600 leading-relaxed">
            <h4 className="font-bold text-ink-900 font-heading">Product Highlights</h4>
            <ul className="list-disc list-inside space-y-1.5 text-ink-600">
              <li>High-durability materials designed for daily wear & tear.</li>
              <li>Tested for safety, performance, and optimal usability.</li>
              <li>Includes full manufacturer warranty and NoveMart satisfaction guarantee.</li>
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3.5 bg-ink-50 rounded-lg border border-ink-100 flex justify-between">
              <span className="text-ink-500">Category</span>
              <span className="font-semibold text-ink-900 font-heading">{product.category}</span>
            </div>
            <div className="p-3.5 bg-ink-50 rounded-lg border border-ink-100 flex justify-between">
              <span className="text-ink-500">Rating</span>
              <span className="font-semibold text-ink-900 font-heading">{product.rating} / 5.0</span>
            </div>
            <div className="p-3.5 bg-ink-50 rounded-lg border border-ink-100 flex justify-between">
              <span className="text-ink-500">Warranty</span>
              <span className="font-semibold text-ink-900 font-heading">1 Year Official Warranty</span>
            </div>
            <div className="p-3.5 bg-ink-50 rounded-lg border border-ink-100 flex justify-between">
              <span className="text-ink-500">Shipping Weight</span>
              <span className="font-semibold text-ink-900 font-heading">0.5 kg</span>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="p-4 bg-brand-50 text-brand-900 border border-brand-100 rounded-lg text-xs font-semibold flex items-center justify-between">
              <span>Overall Satisfaction Rating: 98% Positive</span>
              <span>Based on 120+ Verified Buyers</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="border-b border-ink-100 pb-3">
                <div className="flex justify-between font-semibold text-ink-900 font-heading">
                  <span>Hamza K.</span>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <p className="text-xs text-ink-500 mt-1">Excellent quality product! Delivery was very fast and packaging was secure.</p>
              </div>
              <div className="border-b border-ink-100 pb-3">
                <div className="flex justify-between font-semibold text-ink-900 font-heading">
                  <span>Sara A.</span>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <p className="text-xs text-ink-500 mt-1">Product exactly matches the image and description. Highly recommended store.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
