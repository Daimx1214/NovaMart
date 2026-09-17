import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  }

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" light showSubtitle />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Discover high-quality products curated for durability, style, and everyday functionality. Shop electronics, fashion, footwear, beauty, and home essentials at NovaMart with fast express delivery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  name: "Facebook",
                  url: "https://facebook.com",
                  path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
                },
                {
                  name: "Twitter",
                  url: "https://twitter.com",
                  path: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />,
                },
                {
                  name: "Instagram",
                  url: "https://instagram.com",
                  path: <path d="M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zm-4 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.5-8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />,
                },
                {
                  name: "LinkedIn",
                  url: "https://linkedin.com",
                  path: (
                    <>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="h-9 w-9 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-emerald-600 transition-all flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Shop Catalog</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About NovaMart</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Help Center & FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Top Categories</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Electronics</Link></li>
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Footwear & Shoes</Link></li>
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Beauty & Personal Care</Link></li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Policies & Support</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/orders" className="hover:text-emerald-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-semibold text-white">Subscribe to NovaMart Exclusive Offers</h4>
            <p className="text-sm text-slate-400 mt-1">Get updates on new product launches, secret sales, and discount codes.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-lg text-sm outline-none focus:border-emerald-500 w-full md:w-64"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-500 transition-colors flex-shrink-0"
            >
              {subscribed ? "Subscribed! 🎉" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 text-center text-xs">
          <p className="text-slate-400 font-medium">
            © {new Date().getFullYear()} NovaMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
