import { useState } from "react";
import { Link } from "react-router-dom";
import { getProductImage, getFallbackImage } from "../utils/image";

function ProductCard({ product }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative">
      {/* Image Container */}
      <div className="h-48 w-full bg-slate-100 overflow-hidden flex items-center justify-center relative">
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 text-xs">
            Loading...
          </div>
        )}
        <img
          src={getProductImage(product, "thumbnail")}
          alt={product.title}
          className={`h-full w-full object-cover group-hover:scale-105 transition-all duration-500 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getFallbackImage(product);
            setIsLoaded(true);
          }}
        />

        {/* Rating Badge Overlay */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-amber-600 font-bold text-[11px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
          <span>★</span>
          <span>{product.rating}</span>
        </div>

        {/* Category Tag Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-slate-200 font-medium text-[10px] px-2 py-0.5 rounded-md">
          {product.category}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="block text-[10px] text-slate-400 font-medium uppercase">Price</span>
            <span className="font-extrabold text-slate-900 text-base">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          {outOfStock ? (
            <span className="text-xs text-red-500 font-semibold bg-red-50 px-2.5 py-1 rounded-lg">
              Out of stock
            </span>
          ) : (
            <Link
              to={`/product/${product.id}`}
              className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-emerald-500/20"
            >
              View Details →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
