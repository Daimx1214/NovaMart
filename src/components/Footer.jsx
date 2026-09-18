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
    <footer className="bg-ink-50 text-ink-700 pt-14 pb-8 border-t border-ink-150 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Newsletter strip — the one bold moment in the footer */}
        <div className="bg-white border border-ink-200 rounded-xl p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-12">
          <div>
            <h4 className="font-semibold text-ink-900 font-heading text-lg">Get first look at new arrivals</h4>
            <p className="text-sm text-ink-500 mt-1">One email a week — launches, restocks, and occasional discount codes.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2.5 bg-white border border-ink-300 text-ink-900 rounded-md text-sm outline-none focus:border-brand-600 w-full md:w-64"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-700 text-white rounded-md text-sm font-semibold hover:bg-brand-600 transition-colors flex-shrink-0"
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-ink-150">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showSubtitle />
            <p className="text-sm text-ink-500 leading-relaxed max-w-sm">
              Curated electronics, fashion, footwear, beauty, and home essentials — picked for durability and everyday use, delivered fast across Pakistan.
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
                  className="h-9 w-9 rounded-md bg-white text-ink-500 hover:text-brand-700 hover:border-brand-600 transition-colors flex items-center justify-center border border-ink-200"
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
            <h4 className="font-semibold text-ink-900 text-sm mb-4 font-heading">Shop</h4>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li><Link to="/" className="hover:text-brand-700 transition-colors">Catalog</Link></li>
              <li><Link to="/about" className="hover:text-brand-700 transition-colors">About NoveMart</Link></li>
              <li><Link to="/contact" className="hover:text-brand-700 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-brand-700 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-ink-900 text-sm mb-4 font-heading">Categories</h4>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li><Link to="/" className="hover:text-brand-700 transition-colors">Electronics</Link></li>
              <li><Link to="/" className="hover:text-brand-700 transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/" className="hover:text-brand-700 transition-colors">Footwear & Shoes</Link></li>
              <li><Link to="/" className="hover:text-brand-700 transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/" className="hover:text-brand-700 transition-colors">Beauty & Personal Care</Link></li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h4 className="font-semibold text-ink-900 text-sm mb-4 font-heading">Support</h4>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li><Link to="/privacy" className="hover:text-brand-700 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-700 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="hover:text-brand-700 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/orders" className="hover:text-brand-700 transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 text-center text-xs">
          <p className="text-ink-400 font-medium">
            © {new Date().getFullYear()} NoveMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
