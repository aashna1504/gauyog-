import { useState } from "react";
import { clUrl, clSrcSet } from "../utils/cloudinary";

export default function ProductImage({ src, alt, className, priority = false, sizes = "(max-width: 768px) 200px, 400px" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-widerst text-center px-2">
          No image added
        </span>
      </div>
    );
  }

  const isCloudinary = src.includes("res.cloudinary.com");

  return (
    <img
      src={isCloudinary ? clUrl(src, 400) : src}
      srcSet={isCloudinary ? clSrcSet(src, [200, 400, 800]) : undefined}
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
