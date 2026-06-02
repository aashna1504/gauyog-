// Static fallback data — mirrors what is in the database.
// Blog.jsx and BlogPost.jsx use the live API as the primary source.
// This data is used only when the API is unavailable (e.g. during deployment).
// When you add more posts via the admin, this file updates automatically on the
// next production deployment. Until then, posts added locally will appear via fallback.

export const blogPosts = [
  {
    id: "92b7667d-634d-484d-a530-667d515878bc",
    slug: "organic-farming",
    title: "Organic Farming",
    metaDescription:
      "Learn about organic farming and its benefits for health, soil, and the environment. Discover sustainable practices for growing natural, chemical-free crops.",
    category: "Organic Farming",
    author: "Gauyog Kendr",
    date: "2026-06-02",
    readTime: "5 min read",
    image:
      "https://res.cloudinary.com/dbpzzvcik/image/upload/v1780402318/gauyog/ivvcd8xbvw82jaidrnnq.jpg",
    excerpt:
      "Discover the benefits of organic farming, a sustainable agricultural practice that promotes healthy soil, chemical-free crops, and environmental conservation. Learn how organic methods support biodiversity, improve food quality, and contribute to a healthier future for farmers, consumers, and the planet.",
    content: [
      {
        type: "text",
        text: "Discover the principles and benefits of organic farming, a sustainable agricultural approach that focuses on natural cultivation methods, healthy soil management, and environmentally friendly practices. Learn how organic farming reduces the use of synthetic chemicals, supports biodiversity, improves crop quality, and promotes long-term agricultural sustainability. Explore techniques, advantages, and the positive impact of organic farming on human health, local communities, and the environment.",
      },
    ],
    tags: ["Farming", "Cow-Based Products"],
    faq: [
      {
        question: "What are the benefits of organic farming?",
        answer:
          "Organic farming helps improve soil fertility, supports biodiversity, reduces environmental pollution, and produces crops without synthetic chemical residues. It also promotes sustainable agriculture and long-term ecosystem health.",
      },
      {
        question: "Why is organic farming important for the environment?",
        answer:
          "Organic farming minimizes the use of harmful chemicals, conserves water, enhances soil health, and encourages natural ecosystems. These practices help reduce environmental impact and contribute to a more sustainable food production system.",
      },
    ],
    published: true,
  },
];

export function getBlogPost(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(slug, count = 3) {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}
