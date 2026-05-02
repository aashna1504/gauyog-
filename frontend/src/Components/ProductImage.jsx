import { useState } from "react";

export default function ProductImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center px-2">
          No image added
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
