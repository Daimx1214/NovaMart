import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-5xl font-bold text-emerald-600 mb-2">404</h1>
      <p className="text-slate-500 mb-6">This page does not exist.</p>
      <Link
        to="/"
        className="rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700"
      >
        Go home
      </Link>
    </div>
  );
}

export default NotFound;
