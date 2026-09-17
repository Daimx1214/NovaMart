import { useState } from "react";
import CustomInput from "../components/CustomInput";

function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Required.";
    if (!form.email.trim()) newErrors.email = "Required.";
    if (!form.message.trim()) newErrors.message = "Required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
          We'd Love to Hear From You
        </h1>
        <p className="text-slate-500 text-sm">
          Have a question about an order, product availability, or feedback? Send us a message and our support team will reply within 24 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h32a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM3 19a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Customer Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">daimx1214@gmail.com</p>
              <p className="text-xs text-slate-500">+92 300 1234567</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Headquarters</h4>
              <p className="text-xs text-slate-500 mt-0.5">Bosan Road, Gulgasht Colony</p>
              <p className="text-xs text-slate-500">Multan, Punjab, Pakistan</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Operating Hours</h4>
              <p className="text-xs text-slate-500 mt-0.5">Mon - Fri: 8:00 AM - 10:00 PM EST</p>
              <p className="text-xs text-slate-500">Sat - Sun: 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Message Sent Successfully!</h3>
              <p className="text-sm text-slate-500">Thank you for reaching out to NovaMart. A support representative will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg mb-2">Send Us a Direct Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <CustomInput
                  id="name"
                  name="name"
                  label="Your Name"
                  placeholder="Daim Ali"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <CustomInput
                  id="email"
                  name="email"
                  type="email"
                  label="Your Email Address"
                  placeholder="daimx1214@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <CustomInput
                id="subject"
                name="subject"
                label="Subject (Optional)"
                placeholder="Order inquiry, product question..."
                value={form.subject}
                onChange={handleChange}
              />

              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your detailed message here..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-medium py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
