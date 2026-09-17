import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/db";
import { setProducts, setLoading } from "../redux/productsSlice";
import ProductCard from "../components/ProductCard";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const status = useSelector((state) => state.products.status);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    async function load() {
      dispatch(setLoading());
      const data = await getAllProducts();
      dispatch(setProducts(data));
    }
    load();
  }, [dispatch]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["All", ...unique];
  }, [products]);

  const visibleProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, search, category, sortBy]);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Showcase Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white py-16 px-4 relative overflow-hidden shadow-2xl">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              ⚡ Flash Sale - Up to 40% Off Premium Collection
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Upgrade Your Tech & Style Essentials
            </h1>
            <p className="text-slate-300 text-base max-w-lg leading-relaxed">
              Explore 50+ handpicked products with guaranteed quality, fast express delivery, and transparent pricing across all top categories.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("catalog-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              >
                Browse Shop Now
              </button>
              <Link
                to="/about"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl border border-slate-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="h-80 w-full bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center p-6 relative">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=75"
                alt="Featured Product"
                className="h-full w-full object-cover rounded-xl shadow-md"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-400 font-semibold uppercase">Featured Deal</p>
                  <p className="font-bold text-white text-sm">Wireless Noise-Cancelling Headphones</p>
                </div>
                <span className="text-emerald-400 font-extrabold text-sm">Rs. 42,500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Bar */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Express Shipping", desc: "Fast 24-48h nationwide delivery", icon: "🚀" },
            { title: "100% Genuine", desc: "Original products guaranteed", icon: "🛡️" },
            { title: "24/7 Support", desc: "Dedicated friendly customer assistance", icon: "💬" },
            { title: "Easy 14-Day Returns", desc: "Hassle-free replacement policy", icon: "🔄" },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{f.title}</h4>
                <p className="text-[11px] text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog Main Section */}
      <div id="catalog-section" className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Controls Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">Catalog Collection</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing <span className="font-bold text-emerald-600">{visibleProducts.length}</span> item(s)
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-slate-300 pl-9 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-thin">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  category === c
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <div className="text-center py-20 space-y-3">
            <div className="h-10 w-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-500">Loading catalog items...</p>
          </div>
        )}

        {/* Empty Search Result */}
        {status === "succeeded" && visibleProducts.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <p className="text-4xl">🔍</p>
            <h3 className="font-bold text-slate-800 text-lg">No Products Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any items matching "{search}". Try searching for another keyword or reset category filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-2 text-xs font-semibold text-emerald-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
