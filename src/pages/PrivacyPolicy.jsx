function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Legal Transparency
          </span>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">1. Information We Collect</h2>
            <p>
              When you visit or place an order on NovaMart, we collect certain details required to fulfill your purchase. This includes your name, email address, shipping address, contact phone number, and payment preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">2. How We Use Your Data</h2>
            <p>
              Your information is strictly used for order processing, shipping updates, account management, and customer service. We do not sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">3. Cookies & Session Storage</h2>
            <p>
              We utilize essential browser session storage and cookies to maintain your shopping cart items, remember your login session, and save your UI preferences. You can disable non-essential cookies in your browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">4. Payment Security</h2>
            <p>
              All online credit card transactions are processed through encrypted payment gateways adhering to industry standards. Card credentials are never stored on our local servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">5. Your Rights</h2>
            <p>
              You have the right to inspect, correct, or request deletion of your account information at any time. For privacy inquiries or data requests, please contact daimx1214@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
