import { Link } from "react-router-dom";
import { ShieldCheck, Headphones, Truck } from "lucide-react";

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
      Icon: ShieldCheck,
    },
    {
      title: "Customer First Service",
      description: "Our dedicated 24/7 support team is always available to resolve your queries, assist with orders, and handle easy returns.",
      Icon: Headphones,
    },
    {
      title: "Fast & Secure Delivery",
      description: "Enjoy trackable, express nationwide shipping with tamper-proof packaging and transparent delivery estimates.",
      Icon: Truck,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Header */}
      <div className="max-w-3xl mb-14 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 tracking-tight font-heading leading-[1.1]">
          About NoveMart
        </h1>
        <p className="text-ink-600 text-lg leading-relaxed">
          Founded on a simple idea: shopping online shouldn't mean guessing. We bring together thousands of top-rated items across electronics, fashion, footwear, beauty, and home essentials, checked before they reach you.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-brand-50 text-ink-900 rounded-md p-8 mb-20 border border-brand-100">
        {stats.map((s) => (
          <div key={s.label} className="text-center space-y-1">
            <p className="text-3xl font-bold text-brand-700 font-heading">{s.value}</p>
            <p className="text-xs text-ink-500 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-ink-900 font-heading">Our Core Principles</h2>
          <p className="text-ink-500 text-sm mt-1">What drives NoveMart to deliver excellence every single day.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-xl p-6 border border-ink-200/90 shadow-xs hover:border-ink-300 transition-all space-y-3"
            >
              <div className="h-11 w-11 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100/80">
                <v.Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink-900 text-lg font-heading">{v.title}</h3>
              <p className="text-ink-600 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Credit */}
      <div className="bg-white rounded-md p-8 mb-20 flex flex-col md:flex-row items-center justify-between gap-6 border border-ink-200">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-ink-900 font-heading">Designed & built by Daim Ali</h3>
          <p className="text-sm text-ink-500 max-w-xl">
            NoveMart is built with attention to performance, smooth UI states, and custom responsive layouts, out of Multan, Pakistan.
          </p>
        </div>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-ink-300 hover:border-brand-600 hover:text-brand-700 text-ink-700 font-semibold px-6 py-3 rounded-md transition-colors text-sm flex-shrink-0"
        >
          Connect on LinkedIn
        </a>
      </div>

      {/* CTA Box */}
      <div className="bg-brand-700 rounded-md p-10 text-white text-center space-y-4">
        <h2 className="text-3xl font-bold font-heading">Start shopping NoveMart</h2>
        <p className="text-brand-100 max-w-xl mx-auto text-sm">
          Browse the full catalog — curated items, with instant delivery options.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-block bg-white text-brand-900 font-bold px-8 py-3.5 rounded-md hover:bg-ink-100 transition-colors text-sm"
          >
            Browse catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
