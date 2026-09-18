import { useState } from "react";
import { Link } from "react-router-dom";
import { getProductImage, getFallbackImage } from "../utils/image";

function ProductCard({ product }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-xl border border-ink-200/90 overflow-hidden hover:border-ink-300 hover:shadow-md transition-all duration-200 flex flex-col group relative">
      {/* Image Container */}
      <div className="h-48 w-full bg-ink-50 overflow-hidden flex items-center justify-center relative border-b border-ink-100">
        {!isLoaded && (
          <div className="absolute inset-0 bg-ink-200/60 animate-pulse flex items-center justify-center text-ink-400 text-xs">
            Loading...
          </div>
        )}
        <img
          src={getProductImage(product, "thumbnail")}
          alt={product.title}
          className={`h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
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

        {/* Distinct Rating Pill */}
        <div className="absolute top-2.5 left-2.5 bg-amber-50/95 text-amber-700 border border-amber-200/80 font-bold text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
          <span>★</span>
          <span>{product.rating}</span>
        </div>

        {/* Distinct Category Tag */}
        <div className="absolute bottom-2.5 left-2.5 bg-ink-900/90 text-ink-100 font-semibold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-md shadow-xs">
          {product.category}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-bold text-ink-900 text-sm line-clamp-1 group-hover:text-brand-600 transition-colors font-heading">
          {product.title}
        </h3>
        <p className="text-xs text-ink-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-ink-100">
          <div>
            <span className="font-bold text-ink-900 text-base font-heading">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          {outOfStock ? (
            <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
              Out of stock
            </span>
          ) : (
            <Link
              to={`/product/${product.id}`}
              className="text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
