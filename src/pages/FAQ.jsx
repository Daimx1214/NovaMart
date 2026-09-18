import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 tracking-tight font-heading">
          Frequently asked questions
        </h1>
        <p className="text-ink-500 text-sm">
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
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeCategory === c.id
                ? "bg-brand-600 text-white shadow-xs"
                : "bg-white text-ink-600 border border-ink-200/90 hover:bg-ink-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="bg-white rounded-xl border border-ink-200/90 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-ink-900 hover:text-brand-600 transition-colors font-heading text-sm sm:text-base"
              >
                <span>{faq.question}</span>
                <span className={`h-7 w-7 rounded-lg bg-ink-100 flex items-center justify-center text-ink-500 transition-transform duration-200 ${isOpen ? "rotate-180 bg-brand-100 text-brand-700" : ""}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-ink-600 leading-relaxed border-t border-ink-100 pt-3">
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
