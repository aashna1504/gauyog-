const CL_BASE = 'https://res.cloudinary.com/dbpzzvcik/image/upload/';

// Extract the versioned path (v123456/filename.ext) from any Cloudinary URL
function vPath(url) {
  if (!url) return null;
  const m = url.match(/\/(v\d+\/.+)$/);
  return m ? m[1] : null;
}

// Build a single Cloudinary URL at an explicit pixel width
export function clUrl(url, width) {
  const p = vPath(url);
  if (!p) return url;
  return `${CL_BASE}q_auto,f_auto,w_${width}/${p}`;
}

// Build a srcSet string so the browser picks the right size per viewport
// widths: array of pixel widths to generate descriptors for
export function clSrcSet(url, widths = [480, 900, 1400]) {
  const p = vPath(url);
  if (!p) return '';
  return widths.map(w => `${CL_BASE}q_auto,f_auto,w_${w}/${p} ${w}w`).join(', ');
}
