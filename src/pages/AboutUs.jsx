import { Link } from "react-router-dom";

function AboutUs() {
  const stats = [
    { label: "Happy Customers", value: "100k+" },
    { label: "Curated Products", value: "220+" },
    { label: "Fast Shipping", value: "24-48 Hours" },
    { label: "Customer Rating", value: "4.9 ★" },
  ];

  const values = [
    {
      title: "Authentic & Quality Assured",
      description: "We work directly with verified manufacturers and suppliers to guarantee 100% genuine products with long-lasting quality.",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Customer First Service",
      description: "Our dedicated 24/7 support team is always available to resolve your queries, assist with orders, and handle easy returns.",
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      title: "Fast & Secure Delivery",
      description: "Enjoy trackable, express nationwide shipping with tamper-proof packaging and transparent delivery estimates.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          About NovaMart
        </span>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight sm:text-5xl">
          Redefining Your Everyday Shopping Experience
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Founded with a passion for quality, reliability, and modern design, NovaMart brings together thousands of top-rated items across electronics, fashion, footwear, beauty, and home essentials.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-emerald-950 text-white rounded-2xl p-8 shadow-xl mb-20">
        {stats.map((s) => (
          <div key={s.label} className="text-center space-y-1">
            <p className="text-3xl font-extrabold text-emerald-400">{s.value}</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-800">Our Core Principles</h2>
          <p className="text-slate-500 text-sm mt-1">What drives NovaMart to deliver excellence every single day.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{v.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Handcrafted Creator Highlight */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 mb-20 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full">
            Handcrafted Engineering
          </span>
          <h3 className="text-2xl font-extrabold text-white">Designed & Built by Daim Ali</h3>
          <p className="text-sm text-slate-400 max-w-xl">
            NovaMart is handcrafted with attention to performance, smooth UI states, and custom responsive layouts right out of Multan, Pakistan.
          </p>
        </div>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm flex-shrink-0"
        >
          Connect on LinkedIn →
        </a>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-10 text-white text-center space-y-4 shadow-lg">
        <h2 className="text-3xl font-extrabold">Ready to Explore NovaMart Catalog?</h2>
        <p className="text-emerald-100 max-w-xl mx-auto text-sm">
          Browse through our curated collection of high-quality items with instant delivery options.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-block bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-100 transition-colors shadow-md"
          >
            Start Shopping Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
