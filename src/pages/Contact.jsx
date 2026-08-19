import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiInstagram, FiFacebook, FiSend } from "react-icons/fi";

const contactDetails = [
  {
    icon: FiMapPin,
    label: "Visit The Studio",
    lines: ["12 Blue Area, Jinnah Avenue", "Islamabad, Pakistan"],
  },
  {
    icon: FiPhone,
    label: "Call Us",
    lines: ["+92 300 1234567", "Mon – Sat, 10am – 7pm"],
  },
  {
    icon: FiMail,
    label: "Email Us",
    lines: ["hello@nova.com", "support@nova.com"],
  },
  {
    icon: FiClock,
    label: "Store Hours",
    lines: ["Mon – Fri: 11am – 8pm", "Sat – Sun: 12pm – 6pm"],
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#faf9f6] text-neutral-900 antialiased selection:bg-[#C9A227]/20 selection:text-[#C9A227]">
      <section className="relative bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,#C9A227,transparent_45%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.3em] uppercase">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mt-4">
            We'd love to hear from you.
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto mt-5">
            Questions about an order, a collaboration idea, or just want to say
            hello — our team replies within one business day.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 bg-white border border-neutral-200/60 rounded-3xl shadow-sm p-8 sm:p-10">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="h-14 w-14 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
                <FiSend size={22} className="text-[#C9A227]" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Message Sent</h3>
              <p className="text-neutral-500 max-w-sm">
                Thank you for reaching out. Our team will get back to you
                within one business day.
              </p>
              <button
                onClick={() => {
                  setForm({ name: "", email: "", subject: "", message: "" });
                  setSubmitted(false);
                }}
                className="mt-8 text-sm font-semibold text-[#C9A227] hover:text-neutral-900 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#C9A227] transition-colors duration-300"
              >
                Send Message
                <FiSend size={15} />
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {contactDetails.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 bg-white border border-neutral-200/60 rounded-2xl p-6 hover:border-[#C9A227] transition-colors duration-300"
            >
              <div className="h-11 w-11 shrink-0 rounded-full bg-neutral-900 flex items-center justify-center">
                <item.icon size={17} className="text-[#C9A227]" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-1.5">
                  {item.label}
                </p>
                {item.lines.map((line) => (
                  <p key={line} className="text-sm text-neutral-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-neutral-900 rounded-2xl p-6 flex items-center justify-between">
            <p className="text-white text-sm font-semibold tracking-wide">
              Follow Along
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C9A227] hover:text-white transition-colors duration-300"
              >
                <FiInstagram size={17} />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C9A227] hover:text-white transition-colors duration-300"
              >
                <FiFacebook size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-sm border border-neutral-200/60">
          <iframe
            title="NOVA Studio Location"
            src="https://www.google.com/maps?q=Blue+Area+Islamabad&output=embed"
            className="absolute inset-0 h-full w-full grayscale-[40%]"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
