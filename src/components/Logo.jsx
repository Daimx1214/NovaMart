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
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-2 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}
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
          className={`${textSizes[size]} font-extrabold tracking-tight ${
            light ? "text-white" : "text-slate-800"
          }`}
        >
          Nova<span className="text-emerald-600 group-hover:text-emerald-500 transition-colors">Mart</span>
        </span>
        {showSubtitle && (
          <span className={`text-[10px] uppercase font-semibold tracking-wider -mt-1 ${light ? "text-slate-300" : "text-slate-400"}`}>
            Premium Retail Store
          </span>
        )}
      </div>
    </Link>
  );
}

export default Logo;
