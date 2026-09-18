import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4 space-y-4">
      <div className="p-4 rounded-full bg-ink-100 text-ink-400">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h1 className="text-5xl font-bold text-ink-900 font-heading">404</h1>
      <p className="text-ink-500 text-sm max-w-sm">The page you are looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="rounded-lg bg-brand-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-700 transition-colors shadow-xs"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
