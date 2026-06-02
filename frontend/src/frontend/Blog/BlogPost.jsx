import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { getBlogPost, getRelatedPosts } from "../../data/blogPosts";
import { setPageMeta } from "../../utils/seo";

function renderBlock(block, i) {
  switch (block.type) {
    case "intro":
    case "text":
    case "conclusion":
      return (
        <p key={i} className="text-slate-600 leading-relaxed text-base font-medium mb-6">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 key={i} className="text-xl md:text-2xl font-black text-slate-900 tracking-wider mt-10 mb-4 flex items-center gap-3">
          <span className="w-1 h-6 bg-[#4a703f] rounded-full flex-shrink-0" />
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul key={i} className="mb-6 space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-slate-600 text-base font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a703f] flex-shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlogPost(slug);
  const related = getRelatedPosts(slug, 3);

  useEffect(() => {
    if (!post) return;
    setPageMeta({
      title: post.title,
      description: post.metaDescription,
      image: post.image,
      url: `https://www.gauyogkendr.com/blog/${post.slug}`,
      type: "article",
    });

    // Article schema JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      image: post.image,
      author: { "@type": "Organization", name: post.author },
      publisher: {
        "@type": "Organization",
        name: "Gauyog Kendr",
        logo: {
          "@type": "ImageObject",
          url: "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775049866/final_logo_copy.jpg_puj109.jpg",
        },
      },
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: `https://www.gauyogkendr.com/blog/${post.slug}`,
    };

    let el = document.getElementById("blog-post-schema");
    if (!el) {
      el = document.createElement("script");
      el.id = "blog-post-schema";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);

    // FAQ schema if post has FAQ
    if (post.faq?.length) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        })),
      };
      let faqEl = document.getElementById("blog-faq-schema");
      if (!faqEl) {
        faqEl = document.createElement("script");
        faqEl.id = "blog-faq-schema";
        faqEl.type = "application/ld+json";
        document.head.appendChild(faqEl);
      }
      faqEl.textContent = JSON.stringify(faqSchema);
    }

    return () => {
      document.getElementById("blog-post-schema")?.remove();
      document.getElementById("blog-faq-schema")?.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-32">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Article Not Found</h1>
        <p className="text-slate-500 mb-6">This blog post doesn't exist or may have been moved.</p>
        <Link
          to="/blog"
          className="px-8 py-4 rounded-full bg-[#4a703f] text-white font-black text-xs uppercase tracking-widest"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfcfb] min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[320px] md:h-[520px] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover scale-105"
          loading="eager"
          width={1200}
          height={520}
        />
        {/* Base dim layer */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Strong bottom-to-top gradient for text area */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 pb-10 md:pb-14">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={12} className="text-[#e9aa43]" />
              <span className="text-[11px] font-black uppercase tracking-widest text-[#e9aa43]"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                {post.category}
              </span>
            </div>
            <h1
              className="text-2xl md:text-5xl font-black text-white leading-tight tracking-wider mb-4"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1)" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white text-xs font-bold"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Clock size={12} /> {post.readTime}
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                {post.date}
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 hidden md:inline">
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-10">
          <Link to="/" className="hover:text-[#4a703f] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/blog" className="hover:text-[#4a703f] transition-colors">Blog</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 line-clamp-1">{post.title}</span>
        </nav>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose-custom"
        >
          {post.content.map((block, i) => renderBlock(block, i))}
        </motion.article>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#4a703f]/10 text-[#4a703f] rounded-full text-xs font-bold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {post.faq?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-black text-slate-900 tracking-wider mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-[#e9aa43] rounded-full" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-black text-slate-900 text-base mb-2">{item.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-[#4a703f] text-slate-700 hover:text-white rounded-full font-black text-xs uppercase tracking-widest transition-all"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-6 bg-[#4a703f]/5 border-t border-[#4a703f]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-black text-slate-900 tracking-wider mb-8 text-center">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rPost) => (
                <Link
                  key={rPost.slug}
                  to={`/blog/${rPost.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-[#4a703f]/10 transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={rPost.image}
                      alt={rPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={400}
                      height={160}
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#e9aa43] block mb-2">
                      {rPost.category}
                    </span>
                    <h3 className="font-black text-slate-900 text-sm leading-tight group-hover:text-[#4a703f] transition-colors line-clamp-2">
                      {rPost.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-3 text-[#4a703f] font-black text-[10px] uppercase tracking-wider">
                      Read <ArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-[#4a703f] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-wider mb-3">
            Ready to Go Organic?
          </h2>
          <p className="text-white/80 mb-6 font-medium">
            Explore our certified organic cow-based products and start your natural farming journey today.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#4a703f] rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#e9aa43] hover:text-white transition-all"
          >
            Shop Now <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
