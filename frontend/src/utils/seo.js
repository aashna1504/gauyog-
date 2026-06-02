// Converts a product name to a URL-friendly slug
export function toSlug(name = "") {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Builds a SEO-friendly product URL: /product/product-name-<uuid>
export function toProductUrl(product) {
  const slug = toSlug(product.name);
  return `/product/${slug}-${product.id}`;
}

// Extracts the UUID from a slug URL param like "cow-dung-slurry-31e699b7-3769-4258-b3c4-a73d06dffbfa"
export function extractIdFromParam(param = "") {
  // UUID is always 36 chars in format 8-4-4-4-12
  if (param.length >= 36) {
    return param.slice(-36);
  }
  return param;
}

// Dynamically updates document <title> and meta tags for SEO
export function setPageMeta({ title, description, image, url, type = "website" }) {
  const siteTitle = "Gauyog Kendr";
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Organic Cow-Based Products`;

  document.title = fullTitle;

  setMeta("name", "description", description || "");
  setMeta("property", "og:title", fullTitle);
  setMeta("property", "og:description", description || "");
  setMeta("property", "og:type", type);
  if (url) setMeta("property", "og:url", url);
  if (image) setMeta("property", "og:image", image);
  setMeta("name", "twitter:title", fullTitle);
  setMeta("name", "twitter:description", description || "");
  if (image) setMeta("name", "twitter:image", image);

  // Update canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url || window.location.href;
}

function setMeta(attrKey, attrValue, content) {
  let el = document.querySelector(`meta[${attrKey}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrKey, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
