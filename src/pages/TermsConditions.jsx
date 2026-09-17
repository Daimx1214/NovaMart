function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            User Agreement
          </span>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">1. Terms of Use</h2>
            <p>
              By accessing and placing orders on NovaMart, you agree to comply with these terms. If you do not agree to these terms, please discontinue using our store.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">2. Pricing & Product Accuracy</h2>
            <p>
              We strive to display accurate pricing, stock status, and product specifications. However, we reserve the right to correct pricing typographical errors or cancel orders resulting from system discrepancies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">3. Orders & Cancellation</h2>
            <p>
              Orders are subject to confirmation and inventory availability. You may cancel your order before it enters the shipping phase through your order dashboard or customer support.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">4. Returns & Refunds</h2>
            <p>
              Defective or incorrect products may be returned within 14 days of delivery. Returned items must be in original condition with tags and packaging intact.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">5. Governing Law</h2>
            <p>
              These terms shall be governed and construed in accordance with standard consumer protection laws. For legal notices, contact daimx1214@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
