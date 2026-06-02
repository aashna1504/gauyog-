import { useState } from "react";
import { clUrl, clSrcSet } from "../utils/cloudinary";

const BACKEND = "https://backend.gauyogkendr.com";

function normalizeUrl(url) {
  if (!url) return url;
  // Rewrite any localhost upload URL (dev artifact) to the production backend
  const localPattern = /https?:\/\/localhost:\d+\/uploads\//;
  if (localPattern.test(url)) {
    return url.replace(localPattern, `${BACKEND}/uploads/`);
  }
  // Resolve bare /uploads/ relative paths
  if (url.startsWith("/uploads/")) {
    return `${BACKEND}${url}`;
  }
  return url;
}

export default function ProductImage({ src, alt, className, priority = false, sizes = "(max-width: 768px) 200px, 400px" }) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = normalizeUrl(src);

  if (!resolvedSrc || failed) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-full h-full bg-slate-50 rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-200">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center px-2">
          No Image
        </span>
      </div>
    );
  }

  const isCloudinary = resolvedSrc.includes("res.cloudinary.com");

  return (
    <img
      src={isCloudinary ? clUrl(resolvedSrc, 400) : resolvedSrc}
      srcSet={isCloudinary ? clSrcSet(resolvedSrc, [200, 400, 800]) : undefined}
      sizes={isCloudinary ? sizes : undefined}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={400}
      height={400}
      onError={() => setFailed(true)}
    />
  );
}
