import { Link } from "react-router-dom";

function Logo({ size = "md", showSubtitle = false, light = false }) {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link to="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
      <div
        className={`${iconSizes[size]} rounded-md bg-brand-700 p-2 group-hover:bg-brand-600 transition-colors duration-200 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-white"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`${textSizes[size]} font-bold font-heading tracking-tight ${
            light ? "text-white" : "text-ink-900"
          }`}
        >
          Nove<span className="text-brand-600 group-hover:text-brand-500 transition-colors">Mart</span>
        </span>
        {showSubtitle && (
          <span className={`text-[10px] uppercase font-semibold tracking-wider -mt-1 ${light ? "text-ink-300" : "text-ink-400"}`}>
            Curated Lifestyle Store
          </span>
        )}
      </div>
    </Link>
  );
}

export default Logo;
