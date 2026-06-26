import React, { useState } from 'react';
import { Sparkles, CheckCircle, ArrowRight, ShieldCheck, HeartPulse, HelpCircle, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { productsList, skinQuizQuestionsList } from '../data';
import SEO from './SEO';

interface HomeViewProps {
  onExploreProducts: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function HomeView({ onExploreProducts, onSelectProduct }: HomeViewProps) {
  // Quiz states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const handleAnswerSelect = (optionValue: string) => {
    const updatedAnswers = [...answers, optionValue];
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < skinQuizQuestionsList.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate recommendation based on choices
      const skinTypeAnswer = updatedAnswers[0]; // e.g., Dry, Oily, Sensitive, Combination, Normal
      const goalAnswer = updatedAnswers[1]; // e.g., glow, hydration, pores, lip

      // Find matching items from product list
      const matches = productsList.filter((p) => {
        // Goal matches
        const matchesGoal = 
          (goalAnswer === 'glow' && p.id.includes('serum') || p.id.includes('cream')) ||
          (goalAnswer === 'hydration' && p.id.includes('moisturizer')) ||
          (goalAnswer === 'pores' && p.id.includes('wash')) ||
          (goalAnswer === 'lip' && p.id.includes('lip'));

        // Skin type matches
        const matchesSkin = p.skinTypes.includes('All') || p.skinTypes.includes(skinTypeAnswer as any);

        return matchesGoal || matchesSkin;
      });

      // Select top 2 unique products
      setRecommendedProducts(matches.slice(0, 2));
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setQuizCompleted(false);
    setRecommendedProducts([]);
  };

  const whyChooseUs = [
    "Premium quality beauty products",
    "Skin-friendly and cruelty-free formulas",
    "Suitable for all skin types",
    "Affordable luxury beauty & cosmetics",
    "Trusted by beauty Enthusiasts"
  ];

  return (
    <div className="font-sans text-stone-800" id="home-view-container">
      <SEO 
        title="Glowistry | Premium Organic Beauty & Cosmetics" 
        description="Welcome to Glowistry. Explore our certified cruelty-free organic cosmetics, hydrating primers, skincare elixirs, and radiant highlighters today." 
      />
      
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-stone-100 to-amber-50/40 py-16 md:py-24 border-b border-stone-200/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 border border-amber-200/80 text-amber-950 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 px-0 h-3 text-amber-700 animate-spin" />
                <span>Nourish • Protect • Enhance</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-tight tracking-tight">
                Glowistry – Where Beauty Meets Confidence
              </h1>
              
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-light">
                At Glowistry, we believe that healthy, radiant skin is the foundation of confidence. Our carefully curated beauty products are designed to nourish, protect, and enhance your natural glow.
              </p>

              {/* Our Promise callout */}
              <div className="p-4 border-l-2 border-amber-500 bg-amber-100/10 italic text-stone-700 rounded-r-lg max-w-md">
                "Helping you glow naturally, every day." — <span className="font-semibold text-xs not-italic uppercase tracking-widest text-amber-800 font-mono">Our Promise</span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  id="hero-shop-now-btn"
                  onClick={onExploreProducts}
                  className="bg-stone-900 hover:bg-stone-800 text-amber-100 font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#skin-quiz-section"
                  className="bg-white hover:bg-amber-50/50 text-stone-800 border border-stone-200 font-medium px-8 py-3 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  Find My Routine
                </a>
              </div>
            </div>

            {/* Right Interactive Image Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-tr from-amber-200/40 to-rose-300/40 rounded-full blur-2xl -z-10" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-300/20 rounded-full blur-3xl -z-10" />
                
                {/* Generated Hero Image */}
                <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] shadow-lg border border-stone-200 hover:scale-[1.01] transition-transform duration-500">
                  <img 
                    src="/src/assets/images/glowistry_hero_1781759284114.jpg" 
                    alt="Elegant botanical beauty & cosmetics arrangement on beige stone with soft natural shadows" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* floating badge */}
                <div className="absolute -bottom-4 left-6 bg-white border border-stone-100 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 leading-tight">100% Certified Safe</h4>
                    <p className="text-[10px] text-stone-500 leading-none mt-0.5">Cruelty-Free Formula</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Why Choose Glowistry? */}
      <section className="py-16 md:py-24 bg-white border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-sm uppercase tracking-widest text-amber-700 font-mono font-bold">The Glowistry Advantage</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-stone-900">Why Choose Glowistry?</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              We stand apart by honoring your skin's biology. Here is why beauty lovers across India choose us to power their aesthetic journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((benefit, i) => (
              <div 
                key={i} 
                className="bg-stone-50 hover:bg-amber-50/20 px-5 py-6 rounded-xl border border-stone-200/50 hover:border-amber-300/40 transition-all duration-300 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100/60 flex items-center justify-center text-amber-800 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <p className="text-stone-800 text-sm font-medium leading-snug">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Skincare Routine Finder Quiz */}
      <section id="skin-quiz-section" className="py-16 bg-stone-50 border-b border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-md border border-stone-200/60">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-stone-100 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-100 to-rose-200 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">Beauty & Glam Finder</h3>
                  <p className="text-xs text-stone-500">Discover which cosmetics match your beauty profile.</p>
                </div>
              </div>
              {!quizCompleted && (
                <div className="text-xs text-stone-500 bg-stone-100/80 px-2.5 py-1 rounded-md font-mono">
                  Question {currentQuestionIdx + 1} of {skinQuizQuestionsList.length}
                </div>
              )}
            </div>

            {/* Quiz Card Content */}
            {!quizCompleted ? (
              <div className="space-y-6" id="skin-quiz-card">
                <h4 className="text-lg font-medium text-stone-800">
                  {skinQuizQuestionsList[currentQuestionIdx].question}
                </h4>
                <div className="grid grid-cols-1 gap-3.5">
                  {skinQuizQuestionsList[currentQuestionIdx].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option.value)}
                      className="text-left w-full px-5 py-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/20 text-stone-700 text-sm font-medium transition-all transition-colors cursor-pointer flex justify-between items-center group"
                    >
                      <span>{option.text}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-amber-700 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn" id="skin-quiz-results">
                <div className="text-center space-y-2 py-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif text-stone-900 font-semibold">Your Beauty Match is Ready!</h4>
                  <p className="text-sm text-stone-500 max-w-md mx-auto">
                    Based on your answers (Desired Finish: <strong className="text-stone-700">{answers[0]}</strong>, Main Beauty Goal: <strong className="text-stone-700">{answers[1]}</strong>), we highly recommend adding these specialized Glowistry cosmetics to your beauty collection:
                  </p>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedProducts.map((p) => (
                    <div 
                      key={p.id}
                      className="border border-stone-200/80 rounded-xl p-4 flex gap-4 bg-stone-50 hover:bg-amber-50/10 transition-colors"
                    >
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-20 h-20 rounded-lg object-cover border border-stone-200 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex flex-col justify-between">
                        <div>
                          <h5 className="text-sm font-semibold text-stone-900">{p.name}</h5>
                          <p className="text-xs text-amber-700 font-semibold mt-0.5">₹{p.price}</p>
                          <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-normal">{p.description}</p>
                        </div>
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="text-xs text-stone-700 hover:text-amber-800 font-semibold flex items-center gap-1 cursor-pointer pt-1"
                        >
                          View Recipe <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={resetQuiz}
                    className="text-xs text-stone-600 hover:text-stone-900 underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Restart Beauty & Glam Consultation Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Featured Products Slider (Showcasing all 5 specified items as interactive previews) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 gap-4 border-b border-stone-100 pb-6">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-amber-700 font-mono font-bold">Curated Selections</h2>
              <h3 className="text-3xl font-serif text-stone-900 mt-1">Featured Products</h3>
            </div>
            <button
              onClick={onExploreProducts}
              className="text-stone-700 hover:text-amber-800 text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              See All Formulations <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" id="featured-products-grid">
            {productsList.map((product) => (
              <div 
                key={product.id}
                id={`featured-card-${product.id}`}
                className="group bg-stone-50/55 rounded-xl overflow-hidden border border-stone-200/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div onClick={() => onSelectProduct(product)} className="cursor-pointer overflow-hidden aspect-square border-b border-stone-100 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm border border-stone-200/50 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold text-stone-600 uppercase">
                    {product.size}
                  </div>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div onClick={() => onSelectProduct(product)} className="cursor-pointer space-y-1">
                    <h4 className="text-xs text-stone-400 font-semibold tracking-wider font-mono uppercase">{product.category}</h4>
                    <h3 className="text-sm font-semibold text-stone-800 group-hover:text-amber-800 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-bold text-stone-900 font-mono">₹{product.price}</span>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-xs font-semibold text-stone-700 group-hover:text-amber-800 transition-colors flex items-center gap-0.5 cursor-pointer"
                    >
                      Explore
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Customer Voice Testimonials */}
      <section className="py-16 bg-gradient-to-t from-stone-100 via-stone-50 to-white border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold">Real feedback</h2>
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900">Loved by Beauty Enthusiasts</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Customer review highlights from believers who trust their glow to Glowistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-stone-200/60 shadow-sm space-y-3">
              <div className="flex gap-1 text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-stone-600 italic font-light leading-relaxed">
                "The Glow Radiance Face Serum is magic. Within 2 weeks of using it every morning, my dark spots have faded and my skin feels intensely radiant!"
              </p>
              <div>
                <h4 className="text-xs font-semibold text-stone-900 font-mono">ROHINI SHARMA</h4>
                <p className="text-[10px] text-stone-400">Verified Beauty Lover, Delhi</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200/60 shadow-sm space-y-3">
              <div className="flex gap-1 text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-stone-600 italic font-light leading-relaxed">
                "Finding a cream suitable for sensitive skin that actually hydrates without breakouts was impossible. Glowistry's Hydrating Rose Moisturizer changed the game."
              </p>
              <div>
                <h4 className="text-xs font-semibold text-stone-900 font-mono">PRIYA PATEL</h4>
                <p className="text-[10px] text-stone-400">Verified Beauty Lover, Mumbai</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200/60 shadow-sm space-y-3">
              <div className="flex gap-1 text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-stone-600 italic font-light leading-relaxed">
                "The Charcoal Detox Face Wash gives an incredibly deep clean without drying my skin. It manages oil throughout Chandigarh's hot summer afternoons flawlessly."
              </p>
              <div>
                <h4 className="text-xs font-semibold text-stone-900 font-mono">HARPREET SINGH</h4>
                <p className="text-[10px] text-stone-400">Verified Beauty Lover, Chandigarh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
