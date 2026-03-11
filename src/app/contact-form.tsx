"use client";

export default function ContactForm() {
  return (
    <form
      className="mt-10 grid gap-5 sm:grid-cols-2 text-left"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Your Name"
        className="rounded-xl border border-slate-300 px-5 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
      />
      <input
        type="email"
        placeholder="Email Address"
        className="rounded-xl border border-slate-300 px-5 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
      />
      <textarea
        rows={4}
        placeholder="Tell us about your project..."
        className="sm:col-span-2 rounded-xl border border-slate-300 px-5 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
      />
      <button
        type="submit"
        className="sm:col-span-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow hover:bg-primary-dark transition"
      >
        Send Message
      </button>
    </form>
  );
}
