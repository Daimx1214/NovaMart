import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { Mail, MapPin, Clock, CheckCircle } from "lucide-react";

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
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 tracking-tight font-heading">
          Get in touch
        </h1>
        <p className="text-ink-500 text-sm">
          Have a question about an order, product availability, or feedback? Send us a message and our support team will reply within 24 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-ink-200/90 shadow-xs flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-ink-900 text-sm font-heading">Customer Support</h4>
              <p className="text-xs text-ink-500 mt-0.5">daimx1214@gmail.com</p>
              <p className="text-xs text-ink-500">+92 300 1234567</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-ink-200/90 shadow-xs flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-ink-900 text-sm font-heading">Headquarters</h4>
              <p className="text-xs text-ink-500 mt-0.5">Bosan Road, Gulgasht Colony</p>
              <p className="text-xs text-ink-500">Multan, Punjab, Pakistan</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-ink-200/90 shadow-xs flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-ink-900 text-sm font-heading">Operating Hours</h4>
              <p className="text-xs text-ink-500 mt-0.5">Mon - Fri: 8:00 AM - 10:00 PM EST</p>
              <p className="text-xs text-ink-500">Sat - Sun: 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-xl p-8 border border-ink-200/90 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="h-14 w-14 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-ink-900 font-heading">Message Sent Successfully!</h3>
              <p className="text-sm text-ink-500">Thank you for reaching out to NoveMart. A support representative will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-bold text-ink-900 text-lg mb-2 font-heading">Send Us a Direct Message</h3>

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
                <label className="block mb-1 text-sm font-medium text-ink-700">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your detailed message here..."
                  className="w-full rounded-lg border border-ink-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 text-white font-semibold py-3 rounded-lg hover:bg-brand-700 transition-colors shadow-xs"
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
