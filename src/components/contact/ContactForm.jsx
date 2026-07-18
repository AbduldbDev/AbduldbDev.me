"use client";
import React, { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdaqgkzg"; // <-- replace with your ID

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "New Project Inquiry",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "New Project Inquiry",
      message: "",
    });
    setStatus("idle");
  };

  // ---- CONFIRMATION VIEW ----
  if (status === "success") {
    return (
      <div
        data-aos="fade-left"
        data-aos-duration="700"
        className="relative overflow-hidden rounded-2xl border border-border-hairline bg-surface-container-low p-8 sm:p-10 min-h-[420px] flex items-center justify-center"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full border border-primary/10"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full border border-primary/5"></div>

          <div className="absolute top-5 right-5 opacity-5">
            <span className="material-symbols-outlined text-[160px]">send</span>
          </div>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-delay="150"
          className="relative z-10 flex flex-col items-center text-center max-w-md"
        >
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-125"></div>

            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-primary bg-primary/10 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-primary text-[42px] sm:text-[52px]">
                check_circle
              </span>
            </div>
          </div>

          {/* Heading */}
          <h3 className="font-label-caps text-2xl sm:text-3xl font-bold uppercase tracking-[0.3em] text-text-primary">
            Message Sent
          </h3>

          {/* Divider */}
          <div className="w-20 h-px bg-primary/40 my-5"></div>

          {/* Description */}
          <p className="text-text-muted leading-7 text-sm sm:text-base mb-8">
            Thank you
            {formData.name ? (
              <>
                <span className="text-text-primary font-semibold">
                  {" "}
                  {formData.name}
                </span>
              </>
            ) : (
              ""
            )}
            ! Your message has been successfully delivered. I'll review it and
            get back to you as soon as possible.
          </p>

          {/* Button */}
          <button
            onClick={handleReset}
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-label-caps text-label-caps-xs sm:text-label-caps font-bold uppercase tracking-widest text-on-primary transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg glow-button"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-180 duration-500">
              refresh
            </span>
            Send Another
          </button>
        </div>
      </div>
    );
  }

  // ---- FORM VIEW ----
  return (
    <div
      data-aos="fade-left"
      data-aos-duration="700"
      data-aos-delay="100"
      className="bg-surface-container-low border border-border-hairline p-4 sm:p-card-padding rounded-xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10">
        <span className="material-symbols-outlined text-[80px] sm:text-[120px]">
          send
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 space-y-4 sm:space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 sm:p-3 outline-none"
              placeholder="John Doe"
              type="text"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <label className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 sm:p-3 outline-none"
              placeholder="john@example.com"
              type="email"
            />
          </div>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted">
            Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 sm:p-3 outline-none"
          >
            <option>New Project Inquiry</option>
            <option>Collaboration Request</option>
            <option>Consulting</option>
            <option>Job Offer</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 sm:p-3 outline-none resize-none"
            placeholder="Briefly describe your project..."
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 sm:py-4 bg-primary text-on-primary font-label-caps text-label-caps-xs sm:text-label-caps font-bold rounded uppercase tracking-widest glow-button shadow-lg disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Initialize Connection"}
        </button>

        {status === "error" && (
          <p className="text-sm text-center text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
