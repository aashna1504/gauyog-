// Extract the base upload URL (everything up to and including "/upload/") from a Cloudinary URL
function clBase(url) {
  const idx = url.indexOf('/upload/');
  return idx >= 0 ? url.slice(0, idx + 8) : null;
}

// Extract the versioned path (v123456/...) from a Cloudinary URL, stripping any existing transforms
function vPath(url) {
  if (!url) return null;
  const m = url.match(/\/(v\d+\/.+)$/);
  return m ? m[1] : null;
}

// Build a single Cloudinary URL at an explicit pixel width
export function clUrl(url, width) {
  if (!url) return url;
  const base = clBase(url);
  const p = vPath(url);
  if (!base || !p) return url;
  return `${base}q_auto,f_auto,w_${width}/${p}`;
}

// Build a srcSet string so the browser picks the right size per viewport
export function clSrcSet(url, widths = [480, 900, 1400]) {
  if (!url) return '';
  const base = clBase(url);
  const p = vPath(url);
  if (!base || !p) return '';
  return widths.map(w => `${base}q_auto,f_auto,w_${w}/${p} ${w}w`).join(', ');
}
