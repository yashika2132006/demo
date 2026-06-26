import React, { FormEvent } from 'react';
import { Sparkles, Mail, Shield, RefreshCw, Star, Heart, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'about' | 'products' | 'blog' | 'contact') => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-200 font-sans mt-auto" id="app-footer">
      {/* Brand values banner */}
      <div className="border-b border-stone-800 bg-stone-950/40">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <Shield className="w-8 h-8 text-amber-400" />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">Cruelty-Free</h4>
                <p className="text-xs text-stone-400">100% skin-safe & ethically sourced</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <RefreshCw className="w-8 h-8 text-amber-400" />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">Quality Assured</h4>
                <p className="text-xs text-stone-400">Tested to secure visible results</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <Star className="w-8 h-8 text-amber-400" />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">Affordable Luxury</h4>
                <p className="text-xs text-stone-400">Premium quality cosmetics for everyone</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <Heart className="w-8 h-8 text-amber-400" />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">For All Skin Types</h4>
                <p className="text-xs text-stone-400">Formulated with diverse needs in mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo & Manifesto */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-200 to-rose-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-stone-900" />
              </div>
              <span className="text-xl font-serif tracking-widest text-white font-semibold">GLOWISTRY</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              "Helping you glow naturally, every day."
            </p>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
              At Glowistry, we combine nature-inspired organic ingredients with modern beauty science to create premium, safe formulas that empower confidence in your natural skin.
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">Discover</h3>
              <ul className="space-y-2.5 text-sm font-light text-stone-400">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-300 transition-colors cursor-pointer">Homepage</button></li>
                <li><button onClick={() => setActiveTab('products')} className="hover:text-amber-300 transition-colors cursor-pointer">Beauty Shop</button></li>
                <li><button onClick={() => setActiveTab('about')} className="hover:text-amber-300 transition-colors cursor-pointer">Our Manifesto</button></li>
                <li><button onClick={() => setActiveTab('blog')} className="hover:text-amber-300 transition-colors cursor-pointer">Beauty Blog</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">Contact Social</h3>
              <ul className="space-y-2.5 text-sm font-light text-stone-400">
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-amber-300 transition-colors cursor-pointer">Write to Us</button></li>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors">Instagram: @Glowistry</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors">Facebook: Glowistry Beauty</a></li>
                <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors">Pinterest: Glowistry Official</a></li>
              </ul>
            </div>
          </div>

          {/* Dynamic Newsletter Form */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">Join the Glow Circle</h3>
            <p className="text-sm text-stone-400 font-light leading-relaxed">
              Subscribe to unlock beauty rituals, fresh ingredient studies, and preview events.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 flex items-center gap-2.5 animate-fadeIn" id="newsletter-success-alert">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold">You're in the glow loop!</h4>
                  <p className="text-[11px] opacity-80 mt-0.5">Check your inbox for a special welcome beauty handbook.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2" id="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-800 border border-stone-700 rounded-lg px-3.5 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400 w-full"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-colors cursor-pointer flex-shrink-0"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Glowistry Beauty Products. All rights reserved.</p>
          <div className="flex gap-6 font-light">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>India Beauty Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
