import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowRight, BookOpen } from "lucide-react";
import { setPageMeta } from "../../utils/seo";
import api from "../../api/axios";

const CATEGORIES = ["Organic Farming", "Natural Fertilizer", "Ayurvedic Benefits", "Cow-Based Products", "Sustainability", "Farming Tips"];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageMeta({
      title: "Blog — Organic Farming, Ayurveda & Cow-Based Products",
      description:
        "Read expert articles on organic farming, Panchgavya, cow dung fertilizer, Ayurvedic benefits, and natural living from Gauyog Kendr.",
      url: "https://www.gauyogkendr.com/blog",
    });
  }, []);

  useEffect(() => {
    api
      .get("/blog?limit=50")
      .then((res) => setPosts(res.data.data?.blogs || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="bg-[#fdfcfb] min-h-screen">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-4 md:px-6 bg-gradient-to-br from-[#f0f7ee] to-[#fdfcfb] border-b border-[#4a703f]/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#e9aa43]/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e9aa43]">
                Knowledge Hub
              </span>
              <div className="w-8 h-[1px] bg-[#e9aa43]/60" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-wider mb-4">
              Our <span className="text-[#4a703f] italic font-bold">Blog</span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Expert insights on organic farming, Panchgavya, Ayurveda, and the
              timeless wisdom of cow-based natural living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 rounded-full border-2 border-[#4a703f] border-t-transparent animate-spin" />
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-32">
              <BookOpen size={40} className="text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-lg">No blog posts yet.</p>
              <p className="text-slate-400 text-sm mt-1">Check back soon for articles and insights.</p>
            </div>
          )}

          {/* Featured post */}
          {!loading && featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 md:mb-16"
            >
              <Link
                to={`/blog/${featured.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden shadow-lg shadow-[#4a703f]/5 border border-slate-100 hover:shadow-xl hover:shadow-[#4a703f]/10 transition-all duration-300"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto overflow-hidden bg-[#f0f7ee]">
                    {featured.image ? (
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                        width={600}
                        height={400}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#f0f7ee]">
                        <BookOpen size={48} className="text-[#4a703f]/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#4a703f] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={12} className="text-[#e9aa43]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#e9aa43]">
                        {featured.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider mb-4 group-hover:text-[#4a703f] transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed mb-6 text-sm font-medium line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {featured.readTime}
                        </span>
                        <span>{featured.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#4a703f] font-black text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Post cards grid */}
          {!loading && rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {rest.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md shadow-[#4a703f]/5 border border-slate-100 hover:shadow-xl hover:shadow-[#4a703f]/10 transition-all duration-300 h-full"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#f0f7ee]">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          width={400}
                          height={200}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen size={32} className="text-[#4a703f]/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag size={11} className="text-[#e9aa43]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#e9aa43]">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-black text-slate-900 tracking-wider mb-3 group-hover:text-[#4a703f] transition-colors leading-tight line-clamp-2 flex-1">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 font-medium">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold">
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {post.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[#4a703f] font-black text-[11px] uppercase tracking-wider group-hover:gap-2 transition-all">
                          Read <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Topics Banner */}
      <section className="py-12 px-4 md:px-6 bg-[#4a703f]/5 border-y border-[#4a703f]/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BookOpen size={16} className="text-[#4a703f]" />
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#4a703f]">
              Topics We Cover
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 bg-white border border-[#4a703f]/20 text-[#4a703f] rounded-full text-xs font-black uppercase tracking-wider shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
