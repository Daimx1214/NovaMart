import { useState } from "react";

function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = [
    {
      category: "shipping",
      question: "How long does shipping take?",
      answer: "Standard nationwide shipping usually takes 2 to 4 business days. Express shipping options deliver within 24 to 48 hours.",
    },
    {
      category: "shipping",
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes! Cash on Delivery is available across all supported cities. You pay directly to the delivery rider upon receiving your package.",
    },
    {
      category: "payment",
      question: "What payment methods are accepted?",
      answer: "We accept Visa, MasterCard, Apple Pay, Debit Cards, and Cash on Delivery.",
    },
    {
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer a 14-day hassle-free return policy for unused items in their original packaging. Simply initiate a return request from your Orders page.",
    },
    {
      category: "orders",
      question: "Can I edit or cancel my order after placing it?",
      answer: "You can cancel or modify your order anytime before it has been marked as 'Shipped' by checking your Order History or contacting support.",
    },
    {
      category: "payment",
      question: "Is my credit card information secure?",
      answer: "Absolutely. All payments are encrypted using 256-bit SSL technology through certified payment gateways.",
    },
  ];

  const filteredFaqs = activeCategory === "all" ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Help Center
        </span>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-500 text-sm">
          Everything you need to know about ordering, shipping, payments, and returns.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {[
          { id: "all", label: "All Questions" },
          { id: "shipping", label: "Shipping & Delivery" },
          { id: "payment", label: "Payments" },
          { id: "returns", label: "Returns & Refunds" },
          { id: "orders", label: "Orders" },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === c.id
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-emerald-600 transition-colors"
              >
                <span>{faq.question}</span>
                <span className={`h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform ${isOpen ? "rotate-180 bg-emerald-100 text-emerald-700" : ""}`}>
                  ↓
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;
