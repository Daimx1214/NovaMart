/**
 * db.js - Client Storage Engine & Service Layer
 * Data access layer using LocalStorage with asynchronous Promises.
 * Provides APIs for Products, Users, Orders, and Customer Reviews.
 */

const USERS_KEY = "shoply_users";
const PRODUCTS_KEY = "shoply_products";
const ORDERS_KEY = "shoply_orders";
const REVIEWS_KEY = "shoply_reviews";
const SESSION_KEY = "shoply_session";

const delay = (data, ms = 200) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read", key, err);
    return [];
  }
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

/* ------------------------- SEED DEMO DATA ------------------------- */

let productIdCounter = 1;
function p(title, price, category, stock, rating, color, description, imageKeywords, imageUrl) {
  return {
    id: "p" + productIdCounter++,
    title,
    price,
    category,
    stock,
    rating,
    color,
    description,
    imageKeywords,
    imageUrl,
  };
}

const demoProducts = [
  // Electronics (1 to 15 Sequence as requested + 16 to 19)
  p("Black Wireless Over-Ear Headphones", 42500, "Electronics", 25, 4.8, "#1e293b", "High-fidelity wireless Bluetooth headphones with active noise cancellation and soft ear cushions.", "headphones", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=75"),
  p("Apple iPhone 15 Pro Smartphone", 295000, "Electronics", 12, 4.9, "#64748b", "Authentic Apple iPhone 15 Pro smartphone with Super Retina XDR display and titanium finish.", "apple-iphone", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=75"),
  p("RGB Backlit Mechanical Gaming Keyboard", 12500, "Electronics", 30, 4.7, "#0f172a", "Mechanical gaming keyboard featuring bright RGB rainbow LED backlighting and tactile keys.", "keyboard", "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=75"),
  p("RGB Ergonomic Gaming Mouse", 6800, "Electronics", 45, 4.6, "#1e1b4b", "High-performance RGB ergonomic gaming mouse with optical sensor and thumb buttons.", "gaming-mouse", "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=75"),
  p("Vintage Black Digital Camera", 38000, "Electronics", 18, 4.5, "#334155", "Classic black digital camera with high resolution optical lens.", "camera", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=75"),
  p("Portable Cylindrical Bluetooth Speaker", 9500, "Electronics", 40, 4.7, "#0369a1", "Compact wireless cylindrical Bluetooth speaker with deep bass stereo sound.", "speaker", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=75"),
  p("Widescreen Desktop Computer Monitor", 74000, "Electronics", 10, 4.8, "#1e293b", "Flat widescreen desktop computer display monitor on desk stand.", "monitor", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=75"),
  p("HD Microsoft Pro Webcam", 14500, "Electronics", 22, 4.7, "#27272a", "High definition Microsoft Pro streaming webcam with noise reducing microphone.", "webcam", "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=600&q=75"),
  p("Smart LED Television 4K TV", 125000, "Electronics", 15, 4.7, "#18181b", "Large 4K Ultra HD flat screen smart television mounted in living room.", "tv", "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=75"),
  p("Fast Charging USB Cable Wire", 1200, "Electronics", 60, 4.6, "#0f172a", "High-speed durable braided USB charging cable wire for smartphones.", "usb-cable", "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=75"),
  p("Fast Wireless Charging Pad", 3500, "Electronics", 35, 4.7, "#334155", "Fast Qi wireless charging pad stand for Qi-enabled mobile devices.", "wireless-charger", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=75"),
  p("20000mAh Portable Power Bank", 5800, "Electronics", 40, 4.8, "#1e293b", "High capacity 20000mAh portable power bank external battery charger.", "power-bank", "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=75"),
  p("Wireless TWS Bluetooth Airbuds", 4500, "Electronics", 50, 4.7, "#0284c7", "Wireless TWS Bluetooth airbuds with smart touch controls and charging case.", "airbuds", "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=75"),
  p("Magnetic Car Phone Mount Holder", 2400, "Electronics", 45, 4.6, "#475569", "Strong magnetic car phone mount holder for dashboard and air vent.", "car-mount", "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=75"),
  p("Matte Silicone Protective Phone Case", 1400, "Electronics", 70, 4.5, "#ec4899", "Shockproof matte silicone protective phone case cover.", "phone-case", "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=75"),
  p("3-Axis Handheld Smartphone Gimbal Stabilizer", 18500, "Electronics", 15, 4.8, "#0f172a", "3-axis handheld smartphone gimbal stabilizer for smooth video recording.", "gimbal", "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=600&q=75"),
  p("Multiport USB-C Hub Adapter", 6200, "Electronics", 30, 4.7, "#64748b", "Aluminum multiport USB-C hub adapter with HDMI, USB 3.0, and SD card slot.", "usb-hub", "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=75"),
  p("Mobile Gaming Phone Triggers Controller", 2200, "Electronics", 50, 4.6, "#dc2626", "Ergonomic mobile gaming phone triggers buttons controller clip.", "gaming-triggers", "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=75"),
  p("9H Tempered Glass Screen Protector", 950, "Electronics", 90, 4.7, "#38bdf8", "Ultra-clear 9H tempered glass screen protector film for smartphone.", "screen-protector", "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=75"),

  // Men's Fashion
  p("Men Blue Denim Jacket", 6500, "Men's Fashion", 32, 4.6, "#1e3a8a", "Classic washed blue denim jacket for men with front buttons and chest pockets.", "denimjacket", "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=75"),
  p("Men Black Leather Biker Jacket", 24000, "Men's Fashion", 14, 4.9, "#0f172a", "Genuine black leather biker jacket for men with zipper pockets.", "leatherjacket", "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=75"),
  p("Men Formal White Button-Down Shirt", 3400, "Men's Fashion", 48, 4.6, "#e2e8f0", "Crisp white formal button-down dress shirt for men.", "white-shirt", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=75"),
  p("Men Black Pullover Hoodie Sweatshirt", 3800, "Men's Fashion", 50, 4.7, "#334155", "Warm fleece black pullover hoodie sweatshirt with front pocket.", "hoodie", "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=75"),
  p("Men Blue Denim Jeans Pants", 4800, "Men's Fashion", 45, 4.5, "#1d4ed8", "Classic blue denim jeans trousers for men.", "jeans", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=75"),
  p("Men Slim Fit Chino Trousers Pants", 4200, "Men's Fashion", 38, 4.6, "#b45309", "Casual slim fit khaki chino trousers pants for men.", "chinos", "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=75"),
  p("Men Casual Polo T-Shirt", 2200, "Men's Fashion", 60, 4.5, "#1e293b", "Classic cotton pique polo t-shirt for men.", "polo", "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=75"),
  p("Men Formal Suit Blazer Jacket", 18500, "Men's Fashion", 16, 4.8, "#0f172a", "Tailored formal suit blazer jacket for business attire.", "blazer", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=75"),

  // Women's Fashion
  p("Women Floral Print Summer Dress", 5800, "Women's Fashion", 35, 4.8, "#ec4899", "Lightweight floral print summer dress for women.", "dress", "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=75"),
  p("Women Oversized Soft Knit Sweater", 4200, "Women's Fashion", 42, 4.7, "#f472b6", "Warm oversized knit jumper sweater for women.", "sweater", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=75"),
  p("Women Classic Brown Trench Coat", 16000, "Women's Fashion", 15, 4.9, "#d97706", "Double-breasted brown trench coat outerwear for women.", "trenchcoat", "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=75"),
  p("Women Pleated Long Maxi Skirt", 3600, "Women's Fashion", 30, 4.5, "#a855f7", "Flowy pleated long maxi skirt for women.", "skirt", "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=75"),
  p("Women Formal Black Blazer Jacket", 8500, "Women's Fashion", 25, 4.8, "#1e293b", "Structured formal black suit blazer jacket for women.", "women-blazer", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=75"),

  // Footwear
  p("Men Classic White Leather Sneakers", 6800, "Footwear", 50, 4.7, "#f8fafc", "Low-top white leather casual sneakers with white rubber soles.", "white-sneakers", "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=75"),
  p("Men Brown Leather Formal Oxford Shoes", 12500, "Footwear", 22, 4.8, "#78350f", "Burnished brown leather formal Oxford shoes for men.", "oxford-shoes", "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=75"),
  p("Red Athletic Sports Running Shoes", 8900, "Footwear", 40, 4.9, "#ef4444", "Vibrant red mesh athletic sports running shoes.", "red-shoes", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=75"),
  p("Women Red Leather Stiletto High Heels", 7200, "Footwear", 28, 4.6, "#e11d48", "Pointed-toe red leather stiletto high heel pumps for women.", "high-heels", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=75"),
  p("Men Brown Leather Ankle Combat Boots", 14000, "Footwear", 18, 4.8, "#451a03", "Lace-up brown leather ankle boots for men.", "boots", "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=75"),
  p("Casual Blue Canvas Slip-on Shoes", 3400, "Footwear", 65, 4.4, "#0284c7", "Comfortable blue canvas slip-on casual shoes.", "canvas-shoes", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=75"),

  // Watches & Jewelry
  p("Men Luxury Silver Steel Chronograph Watch", 19500, "Watches & Jewelry", 20, 4.9, "#0f172a", "Stainless steel chronograph wrist watch for men.", "men-watch", "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=600&q=75"),
  p("Women Rose Gold Mesh Wrist Watch", 14200, "Watches & Jewelry", 25, 4.8, "#f43f5e", "Rose gold stainless steel mesh strap wrist watch for women.", "women-watch", "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=75"),
  p("Digital Smart Fitness Tracker Watch", 11500, "Watches & Jewelry", 35, 4.7, "#0284c7", "Touchscreen digital smart fitness tracker watch.", "smartwatch", "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=75"),
  p("Minimalist Brown Leather Strap Watch", 6800, "Watches & Jewelry", 40, 4.6, "#78350f", "Analog dial watch with brown leather strap.", "leather-watch", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=75"),

  // Bags & Luggage
  p("Brown Leather Laptop Backpack Bag", 12800, "Bags & Luggage", 28, 4.8, "#451a03", "Full-grain brown leather laptop backpack.", "backpack", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=75"),
  p("Women Leather Top-Handle Handbag", 9400, "Bags & Luggage", 35, 4.7, "#881337", "Structured leather tote handbag for women.", "handbag", "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=75"),
  p("Hard Shell Travel Suitcase Trolley Luggage", 24000, "Bags & Luggage", 12, 4.9, "#334155", "Hard shell travel suitcase luggage with spinner wheels.", "suitcase", "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=75"),
  p("Men Leather Bifold Pocket Wallet", 2600, "Bags & Luggage", 75, 4.6, "#451a03", "Brown leather bifold wallet for men.", "wallet", "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=75"),

  // Home & Kitchen
  p("Stainless Steel Electric Water Kettle", 4800, "Home & Kitchen", 45, 4.7, "#64748b", "Stainless steel cordless electric water kettle.", "kettle", "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=75"),
  p("Automatic Espresso Coffee Machine Maker", 36000, "Home & Kitchen", 10, 4.9, "#18181b", "Countertop espresso coffee machine maker with steam wand.", "coffee-machine", "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=75"),
  p("Ceramic Stoneware Coffee Drink Mug", 2400, "Home & Kitchen", 50, 4.6, "#78350f", "Matte ceramic stoneware coffee mug cup.", "mug", "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=75"),
  p("Non-Stick Kitchen Frying Pan Cookware", 14800, "Home & Kitchen", 20, 4.8, "#334155", "Non-stick granite coating frying pan skillet cookware.", "pan", "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=75"),
  p("Vacuum Insulated Stainless Steel Bottle", 2800, "Home & Kitchen", 80, 4.8, "#0f172a", "Reusable vacuum insulated stainless steel water thermos bottle.", "water-bottle", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=75"),
  p("Glass Jar Lavender Scented Candle", 1650, "Home & Kitchen", 70, 4.6, "#a855f7", "Aromatherapy lavender scented wax candle in glass jar.", "candle", "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=75"),

  // Beauty & Personal Care
  p("Facial Hydrating Skincare Serum Bottle", 3200, "Beauty & Personal Care", 50, 4.8, "#38bdf8", "Facial hydrating skincare serum in glass dropper bottle.", "serum", "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=75"),
  p("Electric Salon Hair Dryer Blower", 6400, "Beauty & Personal Care", 30, 4.7, "#e11d48", "Electric salon hair dryer blower appliance.", "hair-dryer", "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=75"),
  p("Luxury Glass Perfume Spray Bottle", 12500, "Beauty & Personal Care", 25, 4.9, "#78350f", "Glass spray bottle of luxury eau de parfum fragrance.", "perfume", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=75"),
  p("Matte Liquid Lipstick Cosmetics Tube", 2400, "Beauty & Personal Care", 45, 4.4, "#be185d", "Long-lasting matte liquid lipstick cosmetics tube.", "lipstick", "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=75"),
  p("Rechargeable Electric Toothbrush", 5200, "Beauty & Personal Care", 35, 4.8, "#0284c7", "Rechargeable sonic electric toothbrush device.", "toothbrush", "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=75"),

  // Sports & Fitness
  p("Non-Slip Rubber Exercise Yoga Mat", 2800, "Sports & Fitness", 45, 4.7, "#16a34a", "Thick non-slip rubber exercise yoga mat.", "yoga-mat", "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=75"),
  p("Cast Iron Strength Fitness Dumbbells", 14500, "Sports & Fitness", 15, 4.9, "#1e293b", "Cast iron weightlifting fitness dumbbells set.", "dumbbells", "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=75"),
  p("Official Leather Match Football", 3200, "Sports & Fitness", 50, 4.5, "#dc2626", "Official size leather match soccer football ball.", "football", "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=600&q=75"),

  // Books & Stationery
  p("Classic Brass Fine Nib Fountain Pen", 4200, "Books & Stationery", 35, 4.7, "#15803d", "Classic brass fine nib fountain writing pen.", "fountain-pen", "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=75"),
  p("Wooden Desk Stationery Organizer Box", 3400, "Books & Stationery", 40, 4.6, "#78350f", "Natural wooden desk stationery storage organizer box.", "desk-organizer", "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=75"),
  p("Paper Journal Drawing Sketchbook Notebook", 1950, "Books & Stationery", 50, 4.8, "#1e293b", "Heavyweight paper journal drawing sketchbook notebook.", "sketchbook", "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=75"),
  p("Desktop Rotating World Globe", 3800, "Books & Stationery", 25, 4.8, "#d97706", "Desktop rotating antique brass world globe map.", "globe", "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=600&q=75"),
];

export function seedDatabase() {
  writeList(PRODUCTS_KEY, demoProducts);
  localStorage.setItem("novamart_seeded_v100000", "true");

  const demoUsers = [
    { id: "u1", name: "Store Admin", email: "daimx1214@gmail.com", password: "Daimali@1214", role: "admin" },
  ];

  const users = readList(USERS_KEY);
  const hasAdmin = users.some((u) => u.email && u.email.toLowerCase() === "daimx1214@gmail.com");
  if (!hasAdmin) {
    writeList(USERS_KEY, [...demoUsers, ...users]);
  }

  const reviews = readList(REVIEWS_KEY);
  if (!reviews || reviews.length === 0) {
    writeList(REVIEWS_KEY, [
      {
        id: "rv1",
        productId: demoProducts[0].id,
        userId: "u2",
        userName: "Ali Raza",
        rating: 5,
        comment: "Sound quality is amazing and noise cancellation works like magic!",
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
      },
      {
        id: "rv2",
        productId: demoProducts[0].id,
        userId: "u3",
        userName: "Sana Malik",
        rating: 4,
        comment: "Very premium feel and comfortable cushions for long music sessions.",
        createdAt: Date.now() - 1000 * 60 * 60 * 24,
      },
    ]);
  }
}

/* ------------------------------ AUTH ------------------------------ */

export async function registerUser(input, maybeEmail, maybePassword) {
  let name, email, password;
  if (typeof input === "object" && input !== null) {
    name = input.name;
    email = input.email;
    password = input.password;
  } else {
    name = input;
    email = maybeEmail;
    password = maybePassword;
  }

  const users = readList(USERS_KEY);
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (users.some((u) => u.email && u.email.trim().toLowerCase() === cleanEmail)) {
    throw new Error("An account with this email already exists.");
  }
  const newUser = { id: "u" + Date.now(), name, email: cleanEmail, password, role: "user" };
  writeList(USERS_KEY, [...users, newUser]);
  return delay(sanitizeUser(newUser));
}

export async function loginUser(input, maybePassword) {
  let email, password;
  if (typeof input === "object" && input !== null) {
    email = input.email;
    password = input.password;
  } else {
    email = input;
    password = maybePassword;
  }

  const users = readList(USERS_KEY);
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanPassword = typeof password === "string" ? password.trim() : "";

  let found = users.find(
    (u) => u.email && u.email.trim().toLowerCase() === cleanEmail && u.password && u.password.trim() === cleanPassword
  );

  // Guarantee Admin login for daimx1214@gmail.com / Daimali@1214
  if (!found && cleanEmail === "daimx1214@gmail.com" && cleanPassword === "Daimali@1214") {
    const adminUser = {
      id: "u1",
      name: "Store Admin",
      email: "daimx1214@gmail.com",
      password: "Daimali@1214",
      role: "admin",
    };
    writeList(USERS_KEY, [adminUser, ...users.filter((u) => u.id !== "u1")]);
    found = adminUser;
  }

  if (!found) throw new Error("Invalid email or password.");
  return delay(sanitizeUser(found));
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}
export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

/* ---------------------------- PRODUCTS ---------------------------- */

export async function getAllProducts() {
  if (!localStorage.getItem("novamart_seeded_v100000")) {
    writeList(PRODUCTS_KEY, demoProducts);
    localStorage.setItem("novamart_seeded_v100000", "true");
    return delay(demoProducts);
  }
  const current = readList(PRODUCTS_KEY);
  if (!current || current.length === 0 || current.length !== demoProducts.length) {
    writeList(PRODUCTS_KEY, demoProducts);
    return delay(demoProducts);
  }
  return delay(current);
}

export async function getProductById(id) {
  const product = readList(PRODUCTS_KEY).find((prod) => prod.id === id);
  return delay(product || null);
}

export async function addProduct(product) {
  const products = readList(PRODUCTS_KEY);
  const newProduct = { ...product, id: "p" + Date.now() };
  writeList(PRODUCTS_KEY, [newProduct, ...products]);
  return delay(newProduct);
}
export const createProduct = addProduct;

export async function updateProduct(id, updateData) {
  const products = readList(PRODUCTS_KEY);
  const updatedList = products.map((prod) =>
    prod.id === id ? { ...prod, ...updateData } : prod
  );
  writeList(PRODUCTS_KEY, updatedList);
  const found = updatedList.find((p) => p.id === id);
  return delay(found);
}

export async function deleteProduct(id) {
  const products = readList(PRODUCTS_KEY);
  const filtered = products.filter((prod) => prod.id !== id);
  writeList(PRODUCTS_KEY, filtered);
  return delay(true);
}

/* ----------------------------- ORDERS ----------------------------- */

export async function getAllOrders() {
  const orders = readList(ORDERS_KEY);
  return delay(orders.sort((a, b) => b.createdAt - a.createdAt));
}

export async function getOrdersForUser(userId) {
  const orders = readList(ORDERS_KEY).filter((o) => o.userId === userId);
  return delay(orders.sort((a, b) => b.createdAt - a.createdAt));
}

export async function createOrder(order) {
  const orders = readList(ORDERS_KEY);
  const estimatedDelivery = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const paymentStatus = order.paymentMethod === "card" ? "paid" : "unpaid";

  const newOrder = {
    ...order,
    id: "o" + Date.now(),
    status: "pending",
    paymentStatus,
    estimatedDelivery,
    createdAt: Date.now(),
  };
  writeList(ORDERS_KEY, [newOrder, ...orders]);
  return delay(newOrder);
}

export async function updateOrderStatus(orderId, status) {
  const orders = readList(ORDERS_KEY);
  const updated = orders.map((o) => {
    if (o.id !== orderId) return o;
    const paymentStatus =
      status === "delivered" && o.paymentMethod === "cod" ? "paid" : o.paymentStatus;
    return { ...o, status, paymentStatus };
  });
  writeList(ORDERS_KEY, updated);
  return delay(true);
}

/* ----------------------------- REVIEWS ----------------------------- */

export async function getReviewsForProduct(productId) {
  const reviews = readList(REVIEWS_KEY).filter((r) => r.productId === productId);
  return delay(reviews.sort((a, b) => b.createdAt - a.createdAt));
}

export async function addReview({ productId, userId, userName, rating, comment }) {
  const reviews = readList(REVIEWS_KEY);
  const newReview = {
    id: "rv" + Date.now(),
    productId,
    userId,
    userName,
    rating,
    comment,
    createdAt: Date.now(),
  };
  writeList(REVIEWS_KEY, [newReview, ...reviews]);
  return delay(newReview);
}

/* ------------------------------ USERS ------------------------------ */

export async function getAllUsers() {
  return delay(readList(USERS_KEY).map(sanitizeUser));
}
