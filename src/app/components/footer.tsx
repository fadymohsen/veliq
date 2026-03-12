export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} VELIQ. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition">Privacy</a>
          <a href="#" className="hover:text-primary transition">Terms</a>
          <a href="#" className="hover:text-primary transition">LinkedIn</a>
          <a href="#" className="hover:text-primary transition">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
