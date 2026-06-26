import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, ChevronRight, X, Heart, RefreshCw } from 'lucide-react';
import { BlogPost, Product } from '../types';
import { blogPostsList, productsList } from '../data';
import SEO from './SEO';

interface BlogViewProps {
  onSelectProduct: (product: Product) => void;
  setActiveTab: (tab: 'home' | 'about' | 'products' | 'blog' | 'contact') => void;
}

export default function BlogView({ onSelectProduct, setActiveTab }: BlogViewProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Beauty Guide', 'Ingredients'];

  // Filter posts based on category
  const filteredPosts = blogPostsList.filter((post) => {
    return selectedCategory === 'All' || post.category === selectedCategory;
  });

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  // Helper to find and suggest a product based on blog keywords
  const getSuggestedProduct = (post: BlogPost): Product | null => {
    const text = (post.title + ' ' + post.content).toLowerCase();
    if (text.includes('serum') || text.includes('vitamin c') || text.includes('brightening')) {
      return productsList.find(p => p.id === 'glow-radiance-serum') || null;
    }
    if (text.includes('rose') || text.includes('moisturizer') || text.includes('hydrating')) {
      return productsList.find(p => p.id === 'hydrating-rose-moisturizer') || null;
    }
    if (text.includes('charcoal') || text.includes('cleanse') || text.includes('wash')) {
      return productsList.find(p => p.id === 'charcoal-detox-face-wash') || null;
    }
    if (text.includes('lip') || text.includes('balm')) {
      return productsList.find(p => p.id === 'nourishing-lip-balm') || null;
    }
    return null;
  };

  return (
    <div className="font-sans text-stone-800" id="blog-page-root">
      <SEO 
        title="Beauty, Cosmetics & Skin Care Blog | Glowistry" 
        description="Read professional cosmetic guidelines, pure organic ingredient studies, and makeup-safe routines to look and feel luminous." 
      />
      
      {/* Blog Page Banner */}
      <section className="bg-stone-50 py-12 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold block">Lifestyle & Dermal Advice</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-semibold">Beauty & Cosmetics Blog</h1>
          <p className="text-sm font-light text-stone-500 max-w-lg mx-auto">
            Our collective logs explore clean organic beauty, cosmetic ingredient science, and professional cosmetic prep tutorials to elevate your look.
          </p>
        </div>
      </section>

      {/* Primary Blog Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Filters row */}
        <div className="flex justify-center mb-10 gap-2 border-b border-stone-200/40 pb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-full transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-amber-100 border border-amber-300 text-amber-950 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-posts-grid">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              id={`blog-card-${post.id}`}
              className="group bg-white rounded-xl overflow-hidden border border-stone-200/80 flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              
              <div onClick={() => handleReadPost(post)} className="cursor-pointer overflow-hidden aspect-[16/10] relative border-b border-stone-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-stone-200/50 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold text-amber-950 uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                
                <div onClick={() => handleReadPost(post)} className="cursor-pointer space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-stone-400 font-mono font-semibold uppercase">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-950 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-500 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleReadPost(post)}
                    className="text-xs font-semibold text-stone-700 group-hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Read Full Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>

            </article>
          ))}
        </div>

      </section>

      {/* ============================================================== */}
      {/* 7. Blog Immersive Reading Modal Overlay */}
      {/* ============================================================== */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn" id="blog-detail-modal">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
            
            {/* Modal Header bar */}
            <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-white/95 backdrop-blur border-b border-stone-200/50">
              <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-stone-400">
                Glowistry Beauty Logs
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full bg-stone-100 hover:bg-stone-250 text-stone-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll area */}
            <div className="p-6 sm:p-10 space-y-6 overflow-y-auto max-h-full">
              
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md w-fit">
                  <Sparkles className="w-3.5 h-3.5" />
                  {selectedPost.category}
                </div>

                <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-stone-900 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center gap-3 text-xs text-stone-400 font-mono font-semibold uppercase">
                  <span>Published: {selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Big Article Cover photo */}
              <div className="rounded-xl overflow-hidden aspect-[21/9] border border-stone-200">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Prose Article Text */}
              <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed font-light space-y-4">
                {selectedPost.content.split('\n\n').map((para, i) => {
                  // If it starts with h3 or outline
                  if (para.startsWith('###')) {
                    return (
                      <h4 key={i} className="text-base sm:text-lg font-serif font-bold text-stone-900 pt-3">
                        {para.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  if (para.startsWith('1.') || para.startsWith('*')) {
                    const lines = para.split('\n');
                    return (
                      <ul key={i} className="space-y-2.5 pl-4 list-disc border-l border-stone-200 my-4">
                        {lines.map((line, li) => (
                          <li key={li} className="text-sm font-light">
                            {line.replace(/^(\*|1\.\s|\-\s)/, '').trim()}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={i} className="font-serif">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Smart Contextual Call-to-Action for Related Product */}
              {getSuggestedProduct(selectedPost) && (() => {
                const sp = getSuggestedProduct(selectedPost)!;
                return (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-100/10 border border-amber-300/40 space-y-3.5 mt-8 animate-fadeIn">
                    <div className="flex gap-2 items-center">
                      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-[10px] font-bold">
                        ★
                      </div>
                      <h5 className="text-xs uppercase tracking-widest font-mono font-bold text-stone-800">
                        Featured Cosmetics Formulation
                      </h5>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <img 
                          src={sp.image} 
                          alt={sp.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h6 className="text-sm font-bold text-stone-950">{sp.name}</h6>
                          <p className="text-xs text-amber-800 font-mono font-semibold">₹{sp.price}</p>
                          <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">{sp.size} • {sp.category}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedPost(null);
                          onSelectProduct(sp);
                        }}
                        className="bg-stone-900 hover:bg-stone-850 text-amber-100 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        Explore Recipe
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
