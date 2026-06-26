import React, { FormEvent, useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Heart, Send, CheckCircle2, RefreshCw, Instagram, Facebook, Compass } from 'lucide-react';
import SEO from './SEO';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    // Simulate success
    setSubmittedData({ ...formData });
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setFormSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="font-sans text-stone-800" id="contact-page-root">
      <SEO 
        title="Get in Touch | Contact Glowistry Support" 
        description="Have cosmetic queries or order questions? Reach out to Glowistry customer desk for personalized expert beauty support." 
      />
      
      {/* Editorial Header */}
      <section className="bg-stone-50 py-12 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-mono font-bold block">Support & Help</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-semibold">Contact Glowistry</h1>
          <p className="text-sm font-light text-stone-500 max-w-lg mx-auto">
            We would love to hear from you! Reach out for beauty & cosmetics advice, orders tracking, or ingredient questions.
          </p>
        </div>
      </section>

      {/* Main Grid Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Get In Touch Coordinates & Hours */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-stone-900">Get in Touch</h2>
              <p className="text-sm text-stone-500 leading-relaxed font-light">
                Our support desk is based in India, answering beauty & cosmetic inquiries from Monday through Saturday. Drop in a note or call us directly!
              </p>
            </div>

            <div className="space-y-5" id="contact-coordinates-list">
              
              {/* Address */}
              <div className="flex gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/50 hover:bg-amber-50/15 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-200/70 flex items-center justify-center text-amber-800 shadow-sm flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">Address</h4>
                  <p className="text-sm font-medium text-stone-800 mt-1">123 Beauty Avenue, Chandigarh, India</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/50 hover:bg-amber-50/15 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-200/70 flex items-center justify-center text-amber-800 shadow-sm flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">Phone</h4>
                  <p className="text-sm font-medium text-stone-800 mt-1">+91 98765 43210</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/50 hover:bg-amber-50/15 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-200/70 flex items-center justify-center text-amber-800 shadow-sm flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">Email</h4>
                  <p className="text-sm font-medium text-stone-800 mt-1">
                    <a href="mailto:hello@glowistry.com" className="hover:text-amber-800 transition">hello@glowistry.com</a>
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/50 hover:bg-amber-50/15 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-200/70 flex items-center justify-center text-amber-800 shadow-sm flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">Business Hours</h4>
                  <p className="text-xs text-stone-700 font-medium">Monday – Friday: <span className="font-semibold text-stone-900">9:00 AM – 7:00 PM</span></p>
                  <p className="text-xs text-stone-700 font-medium">Saturday: <span className="font-semibold text-stone-900">10:00 AM – 5:00 PM</span></p>
                  <p className="text-xs text-stone-500 font-medium font-semibold">Sunday: Closed</p>
                </div>
              </div>

            </div>

            {/* Social handles */}
            <div className="space-y-3.5 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-800 font-mono">Follow Us</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 border border-stone-200 rounded-lg bg-white hover:bg-stone-50">
                  <Instagram className="w-3.5 h-3.5 text-stone-700" />
                  <span>@Glowistry</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 border border-stone-200 rounded-lg bg-white hover:bg-stone-50">
                  <Facebook className="w-3.5 h-3.5 text-stone-700" />
                  <span>Glowistry Beauty</span>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 border border-stone-200 rounded-lg bg-white hover:bg-stone-50">
                  <Compass className="w-3.5 h-3.5 text-stone-700" />
                  <span>Glowistry Official</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form and submission */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-md border border-stone-200/60" id="contact-form-container">
              
              <div className="flex items-center gap-2 border-b border-stone-100 pb-5 mb-6">
                <MessageSquare className="w-5 h-5 text-amber-800" />
                <h3 className="text-lg font-serif font-bold text-stone-900">Contact Form</h3>
              </div>

              {formSubmitted ? (
                <div className="space-y-6 py-6 text-center animate-fadeIn" id="contact-success-banner">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif text-stone-900 font-semibold">Thank You, {submittedData.name}!</h4>
                    <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                      We have received your message successfully. Our beauty consult team is reviewing it and will get back to you at <strong className="text-stone-800">{submittedData.email}</strong>{submittedData.phone && <span> or <strong className="text-stone-800">{submittedData.phone}</strong></span>} within 24 business hours.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 inline-block text-left text-xs max-w-sm space-y-1 text-stone-605">
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    {submittedData.phone && <p><strong>Phone:</strong> {submittedData.phone}</p>}
                    <p className="line-clamp-2 mt-1"><strong>Message:</strong> {submittedData.message}</p>
                  </div>

                  <div>
                    <button
                      onClick={resetForm}
                      className="text-xs text-stone-605 hover:text-stone-900 underline flex items-center gap-1.5 cursor-pointer mx-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="glowistry-contact-form">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-700 uppercase tracking-widest block">Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="Eg. Harpreet Singh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-850 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-700 uppercase tracking-widest block">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        required
                        placeholder="Eg. hello@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-850 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 uppercase tracking-widest block">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Eg. +91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-850 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 uppercase tracking-widest block">Message <span className="text-red-500">*</span></label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Enter your message or beauty/cosmetic query here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-850 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-stone-900 hover:bg-stone-850 text-amber-100 font-medium px-6 py-3.5 rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Send className="w-4 h-4 ml-1" />
                      Submit
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
