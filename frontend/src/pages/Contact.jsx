import React, { useState } from "react";
import useScrollTop from "../hooks/useScrollTop";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

const Contact = () => {
  useScrollTop();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 3500);
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ---------- HERO ---------- */}
      <section className="relative pt-12 pb-16">
        {/* soft red gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 to-white" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-neutral-600">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* ---------- CONTENT GRID ---------- */}
      <section className="relative max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT CARD */}
        <div className="col-span-1">
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-8">

            <h2 className="text-xl font-semibold text-neutral-900">
              Contact Information
            </h2>

            <div className="mt-6 space-y-6">

              {/* Phone */}
              <div className="flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-red-50 flex items-center justify-center">
                  <FiPhone className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Phone</p>
                  <p className="text-neutral-600 text-sm">+1 (800) 123-4567</p>
                  <p className="text-neutral-400 text-xs">
                    Mon–Fri from 8am to 8pm
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-red-50 flex items-center justify-center">
                  <FiMail className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Email</p>
                  <p className="text-neutral-600 text-sm">
                    support@smartrent.com
                  </p>
                  <p className="text-neutral-400 text-xs">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Office */}
              <div className="flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-red-50 flex items-center justify-center">
                  <FiMapPin className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Office</p>
                  <p className="text-neutral-600 text-sm">123 Smart Rent Street</p>
                  <p className="text-neutral-600 text-sm">San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD – FORM */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-8">

            {/* Success toast */}
            {submitted && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                <FaRegCheckCircle className="text-red-600" />
                <span>
                  Your message has been sent successfully. We’ll get back to you soon.
                </span>
              </div>
            )}

            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm text-neutral-600">Your Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-3 
                               focus:border-red-500 focus:ring-1 focus:ring-red-500/40 
                               outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-neutral-600">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-3 
                               focus:border-red-500 focus:ring-1 focus:ring-red-500/40 
                               outline-none transition"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm text-neutral-600">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-3 
                             focus:border-red-500 focus:ring-1 focus:ring-red-500/40 
                             outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-neutral-600">Message</label>
                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-3 
                             focus:border-red-500 focus:ring-1 focus:ring-red-500/40 
                             outline-none transition"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg 
                           bg-red-600 
                           text-white 
                           font-medium 
                           hover:bg-red-700 
                           transition 
                           disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* ---------- FULL-WIDTH CENTER FAQ ---------- */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-8">

          <h2 className="text-xl font-semibold text-neutral-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="divide-y">

            <details className="py-4">
              <summary className="cursor-pointer font-medium text-neutral-800 hover:text-red-600">
                How quickly will I get a response?
              </summary>
              <p className="mt-2 text-neutral-600">
                We aim to respond to all inquiries within 24 hours during
                business days.
              </p>
            </details>

            <details className="py-4">
              <summary className="cursor-pointer font-medium text-neutral-800 hover:text-red-600">
                Can I get phone support?
              </summary>
              <p className="mt-2 text-neutral-600">
                Yes, our customer service team is available by phone Monday
                through Friday from 8am to 8pm Eastern Time.
              </p>
            </details>

            <details className="py-4">
              <summary className="cursor-pointer font-medium text-neutral-800 hover:text-red-600">
                What if I have an urgent issue with my booking?
              </summary>
              <p className="mt-2 text-neutral-600">
                For urgent booking issues, please use our 24/7 emergency
                support line mentioned in your booking confirmation.
              </p>
            </details>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
