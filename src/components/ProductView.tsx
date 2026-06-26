import React, { useState } from 'react';
import { Search, Filter, HelpCircle, Star, ArrowUpDown, CornerDownRight, Check, ShoppingBag, Plus, Minus, X, Heart, MessageSquare } from 'lucide-react';
import { Product, Review } from '../types';
import { productsList } from '../data';
import SEO from './SEO';

interface ProductViewProps {
  onAddToCart: (product: Product, quantity: number) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export default function ProductView({ onAddToCart, selectedProduct, setSelectedProduct }: ProductViewProps) {
  // Filters & Sorters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [skinTypeFilter, setSkinTypeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Interactive Product detail states
  const [activeTabDetailed, setActiveTabDetailed] = useState<'benefits' | 'ingredients' | 'reviews'>('benefits');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  
  // Custom Reviews State (per product)
  const [customReviews, setCustomReviews] = useState<Record<string, Review[]>>({
    'glow-radiance-serum': [
      { id: '1', name: 'Rohini Sharma', rating: 5, comment: 'Hands down the best serum I have used! It absorbs so quickly and gives an beautiful glow.', date: 'May 12, 2026' },
      { id: '2', name: 'Alok Gupta', rating: 4, comment: 'Nice light orange scent. Hydrates all afternoon nicely.', date: 'May 20, 2026' }
    ],
    'hydrating-rose-moisturizer': [
      { id: '1', name: 'Priya Patel', rating: 5, comment: 'The rose aroma feels like walking into flower gardens. Absolutely gorgeous texture!', date: 'June 02, 2026' }
    ]
  });

  // Review Form States
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // List of all categories
  const categories = ['All', 'Highlighters', 'Primers', 'Makeup Melts', 'Skin Tints', 'Lip Gloss'];
  // List of skin types
  const skinTypes = ['All', 'Dry', 'Oily', 'Sensitive', 'Combination', 'Normal'];

  // Handle Review submission
  const handleSubmitReview = (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      name: reviewerName,
      rating: reviewerRating,
      comment: reviewerComment,
      date: 'Today'
    };

    const currentRevList = customReviews[productId] || [];
    setCustomReviews({
      ...customReviews,
      [productId]: [newRev, ...currentRevList]
    });

    setReviewerName('');
    setReviewerRating(5);
    setReviewerComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  // Filter products based on inputs
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    
    const matchesSkinType = skinTypeFilter === 'All' || 
                             product.skinTypes.includes('All') || 
                             product.skinTypes.includes(skinTypeFilter as any);

    return matchesSearch && matchesCategory && matchesSkinType;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high-low') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // standard featured chronology
  });

  const handleOpenDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setActiveTabDetailed('benefits');
  };

  const handleDetailedAdd = (product: Product) => {
    onAddToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2500);
  };

  return (
    <div className="font-sans text-stone-800" id="product-page-root">
      <SEO 
        title="Our Beauty Collection | Glowistry Cosmetics" 
        description="Shop Glowistry's premium organic cosmetics, luminous highlighter serums, hydrating rose primers, and sheer Vitamin C skin tints." 
      />
      
      {/* Page Header banner */}
      <section className="bg-stone-50 py-12 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold block">Exclusive Cosmetics & Beauty</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-2">Our Beauty Collection</h1>
          <p className="text-sm font-light text-stone-500 max-w-lg mx-auto mt-2">
            Explore 5 premium formulations engineered to highlight, prep, tint, and gloss your look. Crafted cruelty-free and skin-friendly.
          </p>
        </div>
      </section>

      {/* Main product center and filters bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Dynamic Sidebar Filters Panel */}
          <div className="lg:col-span-3 space-y-6 bg-stone-50/50 rounded-2xl p-5 border border-stone-200/60 h-fit" id="filter-sidebar">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-500">Refine Catalog</span>
              <Filter className="w-4 h-4 text-stone-400" />
            </div>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Eg. Skin Tint, Lip Gloss..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Category</label>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`w-full text-left text-xs px-2.5 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                      categoryFilter === cat 
                        ? 'bg-amber-100/60 border-l-4 border-amber-600 text-amber-950 font-bold' 
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Target Skin Type</label>
              <div className="flex flex-col gap-1.5">
                {skinTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSkinTypeFilter(type)}
                    className={`w-full text-left text-xs px-2.5 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                      skinTypeFilter === type 
                        ? 'bg-amber-100/60 border-l-4 border-amber-600 text-amber-950 font-bold' 
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    {type} Skin
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Sort List</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer appearance-none"
                >
                  <option value="featured">Featured Recipe</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Direct Catalog Products display Area */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center bg-stone-50 rounded-xl p-4 border border-stone-200/50">
              <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-widest">
                Showing {sortedProducts.length} unique formula{sortedProducts.length === 1 ? '' : 's'}
              </span>
              {(categoryFilter !== 'All' || skinTypeFilter !== 'All' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setCategoryFilter('All');
                    setSkinTypeFilter('All');
                    setSearchQuery('');
                  }}
                  className="text-xs text-amber-800 hover:text-amber-900 underline font-semibold cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50 space-y-3">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-serif font-semibold text-stone-700">No formula matches your filter</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto font-light leading-relaxed">
                  Try adjusting your keywords, category selections, or targeting "All" skin types to discover our formulations.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products-catalog-grid">
                {sortedProducts.map((product) => (
                  <div 
                    key={product.id}
                    id={`product-card-${product.id}`}
                    className="bg-white rounded-xl overflow-hidden border border-stone-200 flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    
                    {/* Img frame with size hover overlay */}
                    <div 
                      onClick={() => handleOpenDetailModal(product)}
                      className="aspect-square bg-stone-100 overflow-hidden relative cursor-pointer border-b border-stone-100"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold text-amber-100 tracking-wide">
                        {product.size}
                      </div>
                      
                      <div className="absolute top-2 right-2 bg-amber-500/90 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-stone-950 text-stone-950" />
                        {product.rating}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                      <div onClick={() => handleOpenDetailModal(product)} className="cursor-pointer space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono tracking-wider font-bold text-amber-700 uppercase bg-amber-100/50 px-2 py-0.5 rounded">
                            {product.category}
                          </span>
                        </div>
                        
                        <h3 className="text-base font-serif font-bold text-stone-950 group-hover:text-amber-800 transition-colors">
                          {product.name}
                        </h3>
                        
                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* small benefit badges */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {product.benefits.slice(0, 2).map((b, i) => (
                            <span key={i} className="text-[9px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded leading-none">
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA card bar */}
                      <div className="flex items-center justify-between border-t border-stone-100 pt-3.5">
                        <span className="text-base font-extrabold text-stone-900 font-mono">₹{product.price}</span>
                        
                        <button
                          onClick={() => handleOpenDetailModal(product)}
                          className="bg-stone-900 uppercase tracking-wider text-amber-100 text-[10px] sm:text-xs font-semibold px-4 py-2 rounded-lg hover:bg-stone-850 cursor-pointer flex items-center gap-1.5 transition-colors"
                        >
                          Details
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. Product Detail Modal/Dialog */}
      {/* ============================================================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn" id="product-detail-modal">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            
            {/* Modal sticky close */}
            <div className="sticky top-0 z-10 flex justify-end p-4 bg-gradient-to-b from-white via-white to-transparent">
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                id="close-detail-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Internal Content */}
            <div className="px-6 pb-12 sm:px-8 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left Large Image */}
                <div className="md:col-span-5 relative rounded-xl overflow-hidden aspect-square border border-stone-200 max-w-sm mx-auto">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900 text-amber-100 text-xs font-mono font-bold px-3 py-1 rounded">
                    {selectedProduct.size}
                  </div>
                </div>

                {/* Right Details content and recipe details */}
                <div className="md:col-span-7 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold font-semibold bg-amber-100/55 px-2.5 py-1 rounded-full inline-block">
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">{selectedProduct.name}</h2>
                    
                    <div className="flex items-center gap-2 pt-1 text-sm text-stone-500">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="font-bold text-stone-800 ml-1">{selectedProduct.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{(customReviews[selectedProduct.id] || []).length + selectedProduct.reviewsCount} verified reviews</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>

                  <div className="text-xl sm:text-2xl font-bold font-mono text-stone-950 bg-stone-50 p-3 rounded-lg border border-stone-200/50 inline-block">
                    ₹{selectedProduct.price}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-stone-600 hover:bg-stone-50 active:bg-stone-100 transition cursor-pointer"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-5 font-mono text-sm font-semibold text-stone-850 select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-stone-600 hover:bg-stone-50 active:bg-stone-100 transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => handleDetailedAdd(selectedProduct)}
                      className="bg-stone-900 hover:bg-stone-850 text-amber-100 font-medium px-8 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2 cursor-pointer relative"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add to Shopping Cart
                    </button>
                  </div>

                  {addedMessage && (
                    <div className="text-xs text-emerald-700 bg-emerald-50 rounded-lg p-2 flex items-center gap-1.5 border border-emerald-200 font-medium animate-fadeIn">
                      <Check className="w-4 h-4" />
                      Successfully added {quantity} x "{selectedProduct.name}" to your cart.
                    </div>
                  )}

                  {/* target skin types helper info */}
                  <div className="text-xs text-stone-500 bg-amber-50/20 border border-amber-200/40 p-3 rounded-xl flex items-center gap-2">
                    <span className="font-bold">Target Skin Types:</span>
                    <span className="italic font-light">{selectedProduct.skinTypes.join(', ')} Skins</span>
                  </div>

                </div>

              </div>

              {/* Tabs Section of Modal */}
              <div className="border-t border-stone-200 pt-6">
                
                {/* Headers */}
                <div className="flex border-b border-stone-200 pb-2 mb-4 gap-6">
                  <button
                    onClick={() => setActiveTabDetailed('benefits')}
                    className={`pb-2.5 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer relative ${
                      activeTabDetailed === 'benefits' ? 'text-amber-800' : 'text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    Benefits
                    {activeTabDetailed === 'benefits' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700" />}
                  </button>
                  <button
                    onClick={() => setActiveTabDetailed('ingredients')}
                    className={`pb-2.5 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer relative ${
                      activeTabDetailed === 'ingredients' ? 'text-amber-800' : 'text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    Ingredients Recipe
                    {activeTabDetailed === 'ingredients' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700" />}
                  </button>
                  <button
                    onClick={() => setActiveTabDetailed('reviews')}
                    className={`pb-2.5 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer relative ${
                      activeTabDetailed === 'reviews' ? 'text-amber-800' : 'text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    Reviews ({(customReviews[selectedProduct.id] || []).length})
                    {activeTabDetailed === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700" />}
                  </button>
                </div>

                {/* Content Panel 1: Benefits */}
                {activeTabDetailed === 'benefits' && (
                  <div className="space-y-3.5 animate-fadeIn">
                    <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">Key Benefits of {selectedProduct.name}:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedProduct.benefits.map((benefit, i) => (
                        <div key={i} className="flex gap-2.5 items-center bg-stone-50 p-4 rounded-xl border border-stone-200/50">
                          <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-[10px] font-bold">
                            {i+1}
                          </div>
                          <span className="text-sm text-stone-800 font-medium font-serif">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Panel 2: Ingredients Recipe */}
                {activeTabDetailed === 'ingredients' && (
                  <div className="space-y-3 animate-fadeIn">
                    <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">Clean Sourced Ingredients:</h4>
                    <p className="text-xs text-stone-500 font-light leading-relaxed max-w-xl">
                      We believe cosmetic transparency is non-negotiable. Here are the 100% skin-safe, cruelty-free ingredients carefully engineered into this formula:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                      {selectedProduct.ingredients.map((ing, i) => (
                        <span key={i} className="bg-stone-100 hover:bg-stone-200/60 transition px-3 py-1.5 rounded-lg text-stone-700 border border-stone-200 flex items-center gap-1.5 font-medium select-none">
                          <Check className="w-3 h-3 text-emerald-600" />
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Panel 3: Active reviews list & feedback form */}
                {activeTabDetailed === 'reviews' && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Add review form */}
                    <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/80">
                      <h4 className="text-xs uppercase tracking-widest text-amber-800 font-mono font-bold mb-3 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Write your review
                      </h4>

                      {reviewSuccess ? (
                        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-700 text-xs font-semibold">
                          ✓ Thank you! Your review for "{selectedProduct.name}" has been published below.
                        </div>
                      ) : (
                        <form onSubmit={(e) => handleSubmitReview(e, selectedProduct.id)} className="space-y-3.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Your Name"
                              value={reviewerName}
                              onChange={(e) => setReviewerName(e.target.value)}
                              className="w-full bg-white border border-stone-230 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                            
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-stone-230 h-full">
                              <span className="text-xs text-stone-500">Rating:</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((starVal) => (
                                  <button
                                    key={starVal}
                                    type="button"
                                    onClick={() => setReviewerRating(starVal)}
                                    className="cursor-pointer"
                                  >
                                    <Star className={`w-4 h-4 ${starVal <= reviewerRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <textarea
                            required
                            placeholder="Share your experience with this Glowistry formula..."
                            rows={3}
                            value={reviewerComment}
                            onChange={(e) => setReviewerComment(e.target.value)}
                            className="w-full bg-white border border-stone-230 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />

                          <button
                            type="submit"
                            className="bg-stone-900 hover:bg-stone-850 text-amber-100 text-[11px] font-semibold tracking-wider font-mono uppercase px-4 py-2 rounded-lg cursor-pointer transition-colors"
                          >
                            Submit Review
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Review Lists */}
                    <div className="space-y-4">
                      {((customReviews[selectedProduct.id] || [])).length === 0 ? (
                        <p className="text-xs text-stone-400 italic">No reviews yet for this ingredient. Be the first to try and review!</p>
                      ) : (
                        ((customReviews[selectedProduct.id] || [])).map((rev) => (
                          <div key={rev.id} className="p-4 border-b border-stone-100 space-y-1.5">
                            <div className="flex justify-between items-center">
                              <h5 className="text-xs font-bold text-stone-900 font-mono uppercase">{rev.name}</h5>
                              <span className="text-[10px] text-stone-400 font-mono font-semibold">{rev.date}</span>
                            </div>
                            <div className="flex gap-0.5 text-xs text-amber-500">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              ))}
                            </div>
                            <p className="text-sm text-stone-605 italic font-light font-serif">
                              "{rev.comment}"
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
