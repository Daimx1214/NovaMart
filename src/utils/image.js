// Clean SVG placeholder for missing images (neutral e-commerce box)
export const DEFAULT_FALLBACK_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="%23f1f5f9"><rect width="400" height="300" fill="%23f1f5f9"/><path d="M160 120h80v60h-80z" fill="%23cbd5e1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="14">Product Image</text></svg>`;

export function getFallbackImage(product) {
  return DEFAULT_FALLBACK_IMAGE;
}

export function getProductImage(product, size = "thumbnail") {
  if (!product) return DEFAULT_FALLBACK_IMAGE;
  let url = product.imageUrl || product.image;
  if (!url || typeof url !== "string" || url.trim().length === 0) {
    return DEFAULT_FALLBACK_IMAGE;
  }
  url = url.trim();

  // Fast Unsplash CDN Speed Optimization (reduces image download from ~500KB to ~15KB)
  if (url.includes("images.unsplash.com")) {
    const width = size === "detail" ? 800 : 400;
    const quality = size === "detail" ? 80 : 70;
    const baseUrl = url.split("?")[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }

  return url;
}
