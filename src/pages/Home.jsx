import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck, Headphones, RotateCcw, Search } from "lucide-react";
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
      {/* Hero Showcase Banner — light theme, one bold accent panel */}
      <section className="bg-brand-50 border-b border-brand-100 py-14 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-brand-700 text-sm font-semibold">Flash sale — up to 40% off this week</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight leading-[1.1] text-ink-900">
              Everyday essentials, chosen properly.
            </h1>
            <p className="text-ink-600 text-base max-w-lg leading-relaxed">
              50+ handpicked products across electronics, fashion, and home accessories, with guaranteed authenticity and express nationwide shipping.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("catalog-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-brand-700 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Browse the catalog
              </button>
              <Link
                to="/about"
                className="text-ink-700 hover:text-brand-700 font-semibold px-2 py-3 transition-colors"
              >
                Our story
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="h-80 w-full bg-white rounded-lg border border-ink-200 overflow-hidden flex items-center justify-center p-5 relative">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                alt="Featured smartwatch"
                className="h-full w-full object-cover rounded-md"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-3.5 rounded-md border border-ink-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-500">This week's pick</p>
                  <p className="font-semibold text-ink-900 text-sm font-heading">Minimalist Precision Smartwatch</p>
                </div>
                <span className="text-clay-600 font-bold text-sm font-heading">Rs. 18,500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Bar */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-150 border border-ink-150 rounded-md">
          {[
            { title: "Express shipping", desc: "24–48h nationwide delivery", Icon: Truck },
            { title: "100% genuine", desc: "Original products, guaranteed", Icon: ShieldCheck },
            { title: "Real support", desc: "A person answers, 24/7", Icon: Headphones },
            { title: "14-day returns", desc: "Hassle-free replacement", Icon: RotateCcw },
          ].map((f) => (
            <div key={f.title} className="p-4 flex items-center gap-3">
              <f.Icon className="w-5 h-5 text-brand-700 flex-shrink-0" strokeWidth={1.75} />
              <div>
                <h4 className="font-semibold text-ink-900 text-xs sm:text-sm font-heading">{f.title}</h4>
                <p className="text-[11px] text-ink-500 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog Main Section */}
      <div id="catalog-section" className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Controls Header */}
        <div className="bg-white rounded-xl border border-ink-200/90 p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-ink-900 font-heading">Catalog Collection</h2>
              <p className="text-xs text-ink-500 mt-0.5">
                Showing <span className="font-bold text-brand-600">{visibleProducts.length}</span> item(s)
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
                  className="w-full rounded-lg border border-ink-300 pl-9 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
                />
                <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-2.5 top-2.5 text-xs text-ink-400 hover:text-ink-600">
                    ✕
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-ink-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  category === c
                    ? "bg-brand-600 text-white shadow-xs"
                    : "bg-ink-100 text-ink-700 hover:bg-ink-200"
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
            <div className="h-10 w-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-ink-500">Loading catalog items...</p>
          </div>
        )}

        {/* Empty Search Result */}
        {status === "succeeded" && visibleProducts.length === 0 && (
          <div className="bg-white rounded-xl border border-ink-200 p-12 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-ink-100 text-ink-400 mb-1">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-ink-700 text-lg font-heading">No Products Found</h3>
            <p className="text-xs text-ink-500 max-w-sm mx-auto">
              We couldn't find any items matching "{search}". Try searching for another keyword or reset category filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-2 text-xs font-semibold text-brand-600 hover:underline"
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
