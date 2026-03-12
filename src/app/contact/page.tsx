import ContactForm from "../contact-form";

export const metadata = {
  title: "Contact Us — VELIQ",
  description:
    "Get in touch with VELIQ. Let's discuss your next project.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Let&apos;s Build Something Great
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Ready to take your business to the next level? Drop us a line and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
