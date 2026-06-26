import React, { useState } from 'react';
import { Compass, Eye, Leaf, Shield, Heart, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';

export default function AboutView() {
  const [activeStoryStage, setActiveStoryStage] = useState(0);

  const missionPoints = [
    "Deliver safe and effective beauty solutions.",
    "Promote self-care and confidence.",
    "Use responsibly sourced ingredients.",
    "Create products suitable for diverse skin needs."
  ];

  const valuesList = [
    { name: "Quality", desc: "Rigorous research & finest botanical essences compiled for premium results.", icon: Award },
    { name: "Transparency", desc: "Full ingredient disclosures on every label. What is on the bottle is in the bottle.", icon: Shield },
    { name: "Innovation", desc: "Merging certified dermal science with raw organic botanical capabilities.", icon: Sparkles },
    { name: "Sustainability", desc: "Sourcing cruelty-free and ethically cropped raw ingredients to minimize carbon footprints.", icon: Leaf },
    { name: "Customer Satisfaction", desc: "Providing active beauty advice and formulas loved by our customer circle.", icon: Heart }
  ];

  const interactiveTimeline = [
    { year: "2024", phase: "The Passion Sparks", detail: "What started as a personal passion for botanical cosmetics and natural healing remedies began inside Chandigarh home kitchens, testing flower hydrosols and cold-pressed oils." },
    { year: "2025", phase: "Scientific Validation", detail: "We collaborated with standard cosmetic toxicologists and organic chemists to infuse core raw ingredients (Vitamin C, Charcoal, Hyaluronic acid) safely." },
    { year: "2026", phase: "Glowistry is Born", detail: "Launching 5 signature biocompatible skin elixirs designed to nourish and elevate. Now loved by community members seeking a cruelty-free natural glow." }
  ];

  return (
    <div className="font-sans text-stone-800" id="about-page-wrapper">
      <SEO 
        title="Our Story & Manifesto | Glowistry Beauty" 
        description="Discover the philosophy behind Glowistry. Learn about our commitment to sustainable sourcing, dermal safety, and nature-inspired beauty." 
      />
      
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-stone-50 to-amber-50/20 py-16 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 bg-amber-100/60 rounded-full flex items-center justify-center text-amber-800 mx-auto border border-amber-200">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight">Our Story & Creed</h1>
          <p className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold">About Glowistry Beauty</p>
          <div className="max-w-3xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-stone-300 to-transparent my-4" />
        </div>
      </section>

      {/* Main Narrative Block & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story & Founders statement */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">About Glowistry</h2>
              <p className="text-base text-stone-600 leading-relaxed font-light">
                Glowistry was founded with a simple mission: to make effective, high-quality beauty products accessible to everyone. We combine nature-inspired ingredients with modern beauty science to create products that deliver visible results.
              </p>
              
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-4">
                <div className="flex gap-3 items-start">
                  <Eye className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-amber-950 font-mono font-bold">Our Vision</h3>
                    <p className="text-base text-stone-700 font-serif leading-relaxed mt-1">
                      To become a trusted beauty brand that empowers people to feel confident in their own skin.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botanical Canvas graphic frame */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" 
                  alt="Organic beauty ingredients" 
                  className="w-full h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent flex items-end p-6">
                  <p className="text-stone-50 text-xs tracking-wider uppercase font-mono font-bold">
                    Natural Ingredients • Backed by Beauty Science
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission Points & Values Grid */}
      <section className="py-16 md:py-24 bg-stone-50 border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 layout-grid">
            
            {/* Our Mission */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold">Our Commitment</h4>
                <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">Our Mission</h2>
              </div>
              
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Glowistry is committed to breaking the compromise between organic formulation and structural skin results.
              </p>

              <div className="space-y-3.5" id="mission-check-lists">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex gap-3 items-center bg-white p-3.5 rounded-xl border border-stone-200/50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-stone-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Values */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold">What Directs Us</h4>
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">Our Values</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {valuesList.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-xl border transition-all duration-300 ${
                        idx === 0 
                          ? 'bg-amber-50/45 border-amber-300/40 sm:col-span-2' 
                          : 'bg-white border-stone-200/60'
                      }`}
                    >
                      <div className="flex gap-3.5 items-start">
                        <div className="w-9 h-9 rounded-lg bg-white border border-stone-200/50 flex items-center justify-center text-amber-800 shadow-sm flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900 tracking-wide">{val.name}</h4>
                          <p className="text-xs text-stone-500 mt-1 leading-relaxed font-light">{val.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Story with Interactive Timeline Tab */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center space-y-2 mb-10">
            <h4 className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold">Chronology</h4>
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900">Our Story</h3>
            <p className="text-sm text-stone-500 font-light max-w-xl mx-auto mt-1">
              What started as a passion for cosmetics has grown into a beauty brand loved by customers seeking a healthy, glowing look. Every Glowistry product is created with care and tested for quality.
            </p>
          </div>

          <div className="border border-stone-200 rounded-2xl overflow-hidden p-6 sm:p-8 bg-stone-50">
            <div className="flex justify-center border-b border-stone-200 pb-4 mb-6 gap-2">
              {interactiveTimeline.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStoryStage(idx)}
                  className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
                    activeStoryStage === idx 
                      ? 'bg-stone-900 text-amber-100' 
                      : 'text-stone-500 hover:text-stone-850 hover:bg-stone-100'
                  }`}
                >
                  {item.year} : {item.phase}
                </button>
              ))}
            </div>

            <div className="min-h-32 flex flex-col justify-between animate-fadeIn">
              <div className="space-y-3">
                <div className="inline-block bg-amber-100/60 border border-amber-200 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider font-semibold text-amber-950 uppercase">
                  {interactiveTimeline[activeStoryStage].phase}
                </div>
                <p className="text-stone-605 text-sm sm:text-base leading-relaxed font-light">
                  {interactiveTimeline[activeStoryStage].detail}
                </p>
              </div>
              <div className="text-[11px] text-stone-400 font-mono font-semibold uppercase mt-6 tracking-widest text-right">
                Glowistry Beauty Chronology
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
