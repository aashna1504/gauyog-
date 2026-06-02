import { useEffect, useMemo, useState } from "react";
import { Heart, Package, Layers, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductImage from "../../Components/ProductImage";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import { extractIdFromParam, setPageMeta } from "../../utils/seo";


export default function VedicDhoopMosaicPage() {
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState("");

  const handleWeightSelect = (option) => {
    setSelectedWeight(option);
    setActiveImg(0); // reset thumbnail when weight changes
  };
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();
  const productId = extractIdFromParam(slug || "");

  const {
    addItem: addToCart,
    removeByProductId,
    isInCart,
    fetchCart,
  } = useCartStore();
  const { toggleWishlist, isInWishlist, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    if (!productId) return;
    api
      .get(`/products/${productId}`)
      .then((res) => {
        const p = res.data?.data;
        setProduct(p ?? null);
        if (p?.weight) setSelectedWeight(p.weight);
        else if (p?.weightOptions?.length)
          setSelectedWeight(p.weightOptions[0]);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
    fetchWishlist();
    fetchCart();
  }, [productId, fetchWishlist, fetchCart]);

  // Dynamic meta tags + Product schema
  useEffect(() => {
    if (!product) return;
    const price = getVariantPrice(selectedWeight || product.weight || "");
    const img = getVariantImage(selectedWeight || product.weight || "");
    setPageMeta({
      title: `${product.name} — ${product.category || "Organic Product"}`,
      description: product.description
        ? product.description.slice(0, 155)
        : `Buy ${product.name} online — certified organic, pure, and natural from Gauyog Kendr.`,
      image: img || undefined,
      url: `https://www.gauyogkendr.com${window.location.pathname}`,
      type: "product",
    });

    // Product schema JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: [img].filter(Boolean),
      sku: product.sku || product.id,
      brand: { "@type": "Brand", name: "Gauyog Kendr" },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: price || product.price,
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: `https://www.gauyogkendr.com${window.location.pathname}`,
        seller: { "@type": "Organization", name: "Gauyog Kendr" },
      },
    };

    let el = document.getElementById("product-schema");
    if (!el) {
      el = document.createElement("script");
      el.id = "product-schema";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);

    // Breadcrumb schema
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.gauyogkendr.com/" },
        { "@type": "ListItem", position: 2, name: "Shop", item: "https://www.gauyogkendr.com/shop" },
        { "@type": "ListItem", position: 3, name: product.name, item: `https://www.gauyogkendr.com${window.location.pathname}` },
      ],
    };
    let bcEl = document.getElementById("breadcrumb-schema");
    if (!bcEl) {
      bcEl = document.createElement("script");
      bcEl.id = "breadcrumb-schema";
      bcEl.type = "application/ld+json";
      document.head.appendChild(bcEl);
    }
    bcEl.textContent = JSON.stringify(breadcrumb);

    return () => {
      document.getElementById("product-schema")?.remove();
      document.getElementById("breadcrumb-schema")?.remove();
    };
  }, [product, selectedWeight]);

  // Resolve variant image and price for the currently selected weight
  const getVariantImage = (weight) => {
    if (weight === "1kg" && product?.image1kg) return product.image1kg;
    if (weight === "3kg" && product?.image3kg) return product.image3kg;
    if (weight === "5kg" && product?.image5kg) return product.image5kg;
    return product?.imageUrl || product?.image1kg || product?.image3kg || product?.image5kg || null;
  };

  const getVariantPrice = (weight) => {
    if (weight === "1kg" && product?.price1kg) return product.price1kg;
    if (weight === "3kg" && product?.price3kg) return product.price3kg;
    if (weight === "5kg" && product?.price5kg) return product.price5kg;
    return product?.price ?? 0;
  };

  const productImages = useMemo(() => {
    if (!product) return [];
    const variantImg = getVariantImage(selectedWeight);
    return [variantImg, ...(product.galleryImages || [])].filter(Boolean);
  }, [product, selectedWeight]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (isInCart(product.id)) {
      await removeByProductId(product.id);
      return;
    }
    await addToCart({ ...product, selectedWeight });
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    await toggleWishlist(product);
  };

  if (loading) {
    return (
      <div className="pt-24 md:pt-32 px-4 md:px-8 bg-[#f8f9f5] min-h-screen">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-6">
          <div className="h-[600px] rounded-3xl bg-slate-100 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 rounded-full bg-slate-100 animate-pulse w-1/3" />
            <div className="h-14 rounded-2xl bg-slate-100 animate-pulse" />
            <div className="h-10 rounded-2xl bg-slate-100 animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-3">
          Product not found
        </h1>
        <button
          onClick={() => navigate("/shop")}
          className="px-8 py-4 rounded-full bg-[#4a703f] text-white font-black text-xs uppercase tracking-widerst"
        >
          Back To Shop
        </button>
      </div>
    );
  }

  const currentWeight = selectedWeight || product.weight || "";
  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="lg:pt-40 pt-28 pb-16 px-3 md:px-8 bg-[#f8f9f5] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
          <Link to="/" className="hover:text-[#4a703f] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#4a703f] transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 line-clamp-1">{product.name}</span>
        </nav>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">

          {/* ── INFO CARD: top on mobile, col-2 row-1 on desktop ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-start-2 lg:row-start-1"
          >
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm">
              <span className="inline-block px-3 py-1 bg-[#4a703f]/10 text-[#4a703f] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-wider  mb-1">
                {product.name}
              </h1>
              {product.scientificName && (
                <p className="text-slate-400 text-sm italic font-medium mb-2">
                  {product.scientificName}
                </p>
              )}
              <div className="flex items-baseline gap-3 mt-3 pt-3 border-t border-slate-100">
                <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-wider">
                  ₹{getVariantPrice(currentWeight)}
                </span>
                {currentWeight && (
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widerst">
                    {currentWeight}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── IMAGE PANEL: col-1 row-1 sticky on desktop, stacks below info on mobile ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28"
          >
            <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg shadow-[#4a703f]/10 border border-[#4a703f]/10">
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 md:px-5 pt-4 md:pt-5">
                <span
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widerst shadow-sm ${
                    product.inStock ? "bg-[#4a703f] text-white" : "bg-slate-400 text-white"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
                <button
                  onClick={handleToggleWishlist}
                  aria-label={wishlisted ? `Remove ${product?.name} from wishlist` : `Add ${product?.name} to wishlist`}
                  className={`p-2.5 md:p-3 rounded-full shadow-md transition-all duration-300 group ${
                    wishlisted
                      ? "bg-[#e9aa43] shadow-[#e9aa43]/20 hover:bg-[#e9aa43]/90"
                      : "bg-slate-50 hover:bg-[#e9aa43]/10 shadow-slate-200"
                  }`}
                >
                  <Heart
                    size={20}
                    aria-hidden="true"
                    fill={wishlisted ? "white" : "none"}
                    className={`transition-all duration-300 group-hover:scale-110 ${
                      wishlisted ? "text-white" : "text-slate-600 group-hover:text-[#e9aa43]"
                    }`}
                  />
                </button>
              </div>

              {/* Main image */}
              <div className="relative flex items-center justify-center min-h-[240px] md:min-h-[480px] bg-white mx-3 md:mx-4 mt-3 mb-0 border border-gray-100 rounded-2xl px-4 py-6 group/img">
                <ProductImage
                  src={productImages[activeImg]}
                  alt={`${product.name} — ${product.category || "Organic Product"} by Gauyog Kendr`}
                  className="w-full max-w-[220px] md:max-w-[420px] object-contain aspect-square"
                />
                <span className="absolute bottom-3 right-3 text-[28px] md:text-[70px] font-black text-[#4a703f]/5 leading-none tracking-wider uppercase select-none pointer-events-none">
                  Gauyog
                </span>

                {/* Prev / Next arrows */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(i => (i - 1 + productImages.length) % productImages.length)}
                      aria-label="Previous product image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-9 md:h-9 bg-[#4a703f]/20 backdrop-blur-sm rounded-full flex items-center justify-center text-[#4a703f] opacity-0 group-hover/img:opacity-100 transition-all duration-200 hover:bg-[#4a703f]/40 hover:scale-110"
                    >
                      <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => setActiveImg(i => (i + 1) % productImages.length)}
                      aria-label="Next product image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-9 md:h-9 bg-[#4a703f]/20 backdrop-blur-sm rounded-full flex items-center justify-center text-[#4a703f] opacity-0 group-hover/img:opacity-100 transition-all duration-200 hover:bg-[#4a703f]/40 hover:scale-110"
                    >
                      <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails — horizontal scrollable row (all screen sizes) */}
              {productImages.length > 1 && (
                <div className="flex flex-row gap-2 px-3 md:px-4 py-3 overflow-x-auto">
                  {productImages.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      onClick={() => setActiveImg(idx)}
                      className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 p-1 transition-all duration-200 ${
                        activeImg === idx
                          ? "border-[#4a703f] shadow-md shadow-green-100 bg-white"
                          : "border-transparent bg-slate-50 opacity-60 hover:opacity-100 hover:border-slate-200"
                      }`}
                    >
                      <ProductImage
                        src={img}
                        alt={`view ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── REST OF DETAILS: below image on mobile, col-2 row-2 on desktop ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-start-2 lg:row-start-2 flex flex-col gap-4 md:gap-5"
          >
            {/* Weight pills */}
            {!!product.weightOptions?.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).length && (
              <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3">
                  Select Weight
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).map((option) => {
                    const hasVariant = getVariantImage(option) !== product.imageUrl || getVariantPrice(option) !== product.price;
                    return (
                      <button
                        key={option}
                        onClick={() => handleWeightSelect(option)}
                        className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 border-2 flex items-center gap-1.5 ${
                          currentWeight === option
                            ? "bg-[#4a703f] text-white border-[#4a703f] shadow-lg shadow-green-900/20"
                            : "bg-white text-slate-500 border-slate-200 hover:border-[#4a703f] hover:text-[#4a703f]"
                        }`}
                      >
                        {option}
                        {hasVariant && (
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${currentWeight === option ? "bg-white/60" : "bg-[#4a703f]/40"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                  inCart
                    ? "bg-[#744926]/10 text-[#744926] hover:bg-[#744926]/20 shadow-none"
                    : "bg-[#744926] hover:bg-[#4a703f] text-white shadow-green-900/20"
                }`}
              >
                {inCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                onClick={async () => {
                  if (!inCart) await addToCart({ ...product, selectedWeight });
                  navigate("/payment");
                }}
                className="flex-1 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] border-2 border-[#4a703f] text-[#4a703f] hover:bg-[#4a703f] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                Buy Now
              </button>
            </div>

            {/* Pack + Stock */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#4a703f]/10 flex items-center justify-center flex-shrink-0">
                  <Package size={16} className="text-[#4a703f]" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widerst text-slate-400 mb-0.5">
                    Pack Size
                  </p>
                  <p className="text-sm md:text-base font-black text-slate-800">
                    {currentWeight || "—"}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#4a703f]/10 flex items-center justify-center flex-shrink-0">
                  <Layers size={16} className="text-[#4a703f]" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widerst text-slate-400 mb-0.5">
                    Stock
                  </p>
                  <p className="text-sm md:text-base font-black text-slate-800">
                    {product.stock} units
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits + Ingredients side by side */}
            {(product.benefits?.length > 0 || product.ingredients) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Key Benefits */}
                {product.benefits?.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1 h-5 bg-[#4a703f] rounded-full" />
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4a703f]">
                        Key Benefits
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {product.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-[#4a703f]/10"
                        >
                          <Check size={13} className="text-[#4a703f] flex-shrink-0" />
                          <span className="text-sm font-bold text-slate-800">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                {product.ingredients && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1 h-5 bg-[#e9aa43] rounded-full" />
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#744926]">
                        Ingredients
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {product.ingredients
                        .split(/[\n,;|]+/)
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((ing, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-[#fdf6ee] rounded-2xl px-4 py-3 border border-[#e9aa43]/20"
                          >
                            <Check size={13} className="text-[#e9aa43] flex-shrink-0" />
                            <span className="text-sm font-bold text-slate-800">
                              {ing}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3">
                Description
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product detail grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {(product.sku ||
                product.batchNo ||
                product.mfgDate ||
                product.bestBefore ||
                product.weightOptions?.length) && (
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-8 rounded-full bg-[#4a703f]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f]">
                      Product Details
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-slate-700">
                    {product.sku && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          SKU
                        </span>
                        <span className="text-right">{product.sku}</span>
                      </div>
                    )}
                    {product.batchNo && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          Batch No.
                        </span>
                        <span className="text-right">{product.batchNo}</span>
                      </div>
                    )}
                    {product.mfgDate && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          Mfg Date
                        </span>
                        <span className="text-right">{product.mfgDate}</span>
                      </div>
                    )}
                    {product.bestBefore && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          Best Before
                        </span>
                        <span className="text-right">{product.bestBefore}</span>
                      </div>
                    )}
                    {product.weightOptions?.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).length > 0 && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          Also Available
                        </span>
                        <span className="text-right">
                          {product.weightOptions.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(product.usageInstructions ||
                product.storageInstructions ||
                product.safetyInstructions) && (
                <div className="grid gap-4">
                  {product.usageInstructions && (
                    <div className="bg-[#eef8ef] rounded-3xl p-6 border border-[#4a703f]/15 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3">
                        How To Use
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {product.usageInstructions}
                      </p>
                    </div>
                  )}
                  {product.storageInstructions && (
                    <div className="bg-[#eef8ef] rounded-3xl p-6 border border-[#4a703f]/15 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3">
                        Storage
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {product.storageInstructions}
                      </p>
                    </div>
                  )}
                  {product.safetyInstructions && (
                    <div className="bg-[#fdf6ee] rounded-3xl p-6 border border-[#e9aa43]/20 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#744926] mb-3">
                        Safety & Cautions
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {product.safetyInstructions}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
