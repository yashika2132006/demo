import React from 'react';
import { ShoppingBag, Sparkles, Menu, X, Info, BookOpen, Mail, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'about' | 'products' | 'blog' | 'contact';
  setActiveTab: (tab: 'home' | 'about' | 'products' | 'blog' | 'contact') => void;
  cartCount: number;
  toggleCart: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, toggleCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { id: 'home' as const, label: 'Home', icon: Sparkles },
    { id: 'products' as const, label: 'Our Products', icon: Award },
    { id: 'about' as const, label: 'About Us', icon: Info },
    { id: 'blog' as const, label: 'Blog', icon: BookOpen },
    { id: 'contact' as const, label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-50/80 backdrop-blur-md border-b border-stone-200/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Name */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="logo-brand"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-200/60 to-rose-300/40 flex items-center justify-center border border-stone-200 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-stone-700" />
            </div>
            <div>
              <span className="text-2xl font-serif tracking-widest text-stone-800 font-semibold block">GLOWISTRY</span>
              <span className="text-[10px] tracking-widest text-amber-700/80 uppercase font-mono block -mt-1 font-semibold">Beauty Meets Confidence</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-amber-800 font-semibold' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-rose-300 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Icons Bar: Cart */}
          <div className="flex items-center gap-4">
            <button
              id="header-cart-btn"
              onClick={toggleCart}
              className="relative p-2.5 rounded-full bg-stone-100 hover:bg-amber-100/40 text-stone-700 hover:text-amber-900 transition-all duration-300 border border-stone-200/50 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-stone-50 font-mono text-[10px] font-bold shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn" id="mobile-nav-panel">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                  isActive 
                    ? 'bg-amber-50 text-amber-900 font-semibold pl-6 border-l-4 border-amber-600' 
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-5 h-5 opacity-80" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
