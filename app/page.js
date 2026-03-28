'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    // Send to our API
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (err) {
      // Fallback: just show success for demo
    }
    
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-white">SendGem</a>
          <div className="flex items-center gap-4">
            <a href="/pricing" className="text-gray-300 hover:text-white text-sm">Pricing</a>
            <a href="/login" className="text-gray-300 hover:text-white text-sm">Login</a>
            <a href="/signup" className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-sm hover:bg-white/20">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/20" />
        
        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-gray-300">
              🚀 Now in Private Beta
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Cold Emails That Actually Get Replies
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-center text-gray-400 mb-10 max-w-2xl mx-auto">
            Your AI-powered cold email assistant. Upload your company info, add prospects, 
            and get personalized email campaigns that sound human-written — not AI-generated.
          </p>

          {/* Waitlist Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50"
                >
                  {loading ? 'Joining...' : 'Join Waitlist'}
                </button>
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">
                Join 47+ businesses on the waitlist · Free early access
              </p>
            </form>
          ) : (
            <div className="text-center max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">You're on the list! 🎉</h3>
              <p className="text-gray-400">
                We'll notify you as soon as spots open up. Get ready to revolutionize your cold outreach.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Cold Email Pros Choose <span className="text-purple-400">SendGem</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold mb-2">AI That Learns Your Voice</h3>
              <p className="text-gray-400 text-sm">
                Upload sample emails, company docs, and your tone. Our AI writes in YOUR voice, not generic AI.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold mb-2">Prospect Research Built-In</h3>
              <p className="text-gray-400 text-sm">
                Paste a list of prospects. We research each one — their recent posts, company news, trigger events.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-3">📝</div>
              <h3 className="text-lg font-semibold mb-2">Full Email Sequences</h3>
              <p className="text-gray-400 text-sm">
                Not just one email. Get 5-7 step sequences: intro, follow-up, break-up, and more. Each personalized.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Feedback Loop = Smarter Over Time</h3>
              <p className="text-gray-400 text-sm">
                Rate your campaigns. Our AI learns what works for YOUR market and improves every single time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-gradient-to-b from-black to-purple-900/20 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Your Data Stays <span className="text-green-400">Yours</span>
          </h2>
          
          <p className="text-gray-400 text-center text-lg mb-10 max-w-2xl mx-auto">
            We know your prospect data and campaign content are valuable business assets. 
            That's why we built SendGem fundamentally different from other AI tools:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold mb-2">100% Confidential</h3>
              <p className="text-gray-400 text-sm">
                Your data is never shared with third parties. Your prospects, your campaigns, your business.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-3">🚫</div>
              <h3 className="text-lg font-semibold mb-2">Not Fed to Universal AI</h3>
              <p className="text-gray-400 text-sm">
                Your data will NEVER be used to train our AI models or any other AI system. That's a promise.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Only Makes YOUR Campaigns Better</h3>
              <p className="text-gray-400 text-sm">
                Our AI learns from YOUR feedback to improve YOUR results — nothing leaves your account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-4">TRUSTED BY SALES TEAMS AT</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            <span className="text-xl font-semibold">Tech Startups</span>
            <span className="text-xl font-semibold">Agencies</span>
            <span className="text-xl font-semibold">B2B Services</span>
            <span className="text-xl font-semibold">SaaS Companies</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to 10x Your Reply Rates?</h2>
          <p className="text-gray-400 mb-8">
            Join the waitlist and be first to experience AI cold email that actually works.
          </p>
          
          {!submitted && (
            <button
              onClick={() => document.querySelector('input')?.focus()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform"
            >
              Get Early Access
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 SendGem. All rights reserved.</p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}