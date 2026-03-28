'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Pricing() {
  const [loading, setLoading] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleSubscribe = async (priceId) => {
    setLoading(priceId);
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      });
      
      const { url, error } = await response.json();
      
      if (error) {
        console.error('Checkout error:', error);
        alert('Error starting checkout. Please try again.');
      } else if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
    
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Plan
          </span>
        </h1>
        <p className="text-gray-400 text-center mb-8">
          AI-powered personalized cold emails that get replies. Upgrade anytime.
        </p>

        <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Starter - $47 */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-1">Starter</h2>
            <p className="text-gray-500 text-sm mb-3">Try it out</p>
            <div className="text-3xl font-bold mb-1">$47<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <p className="text-gray-500 text-sm mb-4">100 contacts/mo</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-4">
              <li className="flex items-start gap-2">✓ AI email generation</li>
              <li className="flex items-start gap-2">✓ 5-step sequences</li>
              <li className="flex items-start gap-2">✓ CSV export</li>
              <li className="flex items-start gap-2">✓ Use your own prospect data</li>
            </ul>
            <button
              onClick={() => handleSubscribe('price_starter')}
              disabled={loading === 'price_starter'}
              className="w-full py-3 rounded-xl bg-gray-700 font-semibold hover:bg-gray-600 disabled:opacity-50"
            >
              {loading === 'price_starter' ? 'Loading...' : 'Get Started'}
            </button>
          </div>

          {/* Growth - $147 */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-1">Growth</h2>
            <p className="text-gray-500 text-sm mb-3">Most popular</p>
            <div className="text-3xl font-bold mb-1">$147<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <p className="text-gray-500 text-sm mb-4">500 contacts/mo</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-4">
              <li className="flex items-start gap-2">✓ Everything in Starter</li>
              <li className="flex items-start gap-2">✓ <strong>Basic AI Research</strong> included</li>
              <li className="flex items-start gap-2">✓ 7-step sequences</li>
              <li className="flex items-start gap-2">✓ AI learns from your feedback</li>
              <li className="flex items-start gap-2">✓ Priority processing</li>
            </ul>
            <button
              onClick={() => handleSubscribe('price_growth')}
              disabled={loading === 'price_growth'}
              className="w-full py-3 rounded-xl bg-gray-700 font-semibold hover:bg-gray-600 disabled:opacity-50"
            >
              {loading === 'price_growth' ? 'Loading...' : 'Get Started'}
            </button>
          </div>

          {/* Pro - $297 */}
          <div className="bg-gradient-to-b from-purple-900/30 to-gray-800 rounded-2xl p-6 border border-purple-500/50 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-xs font-semibold">
              Best Value
            </div>
            <h2 className="text-xl font-bold mb-1">Pro</h2>
            <p className="text-gray-500 text-sm mb-3">For teams</p>
            <div className="text-3xl font-bold mb-1">$297<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <p className="text-gray-500 text-sm mb-4">2,500 contacts/mo</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-4">
              <li className="flex items-start gap-2">✓ Everything in Growth</li>
              <li className="flex items-start gap-2">✓ <strong>Basic AI Research</strong> included</li>
              <li className="flex items-start gap-2">✓ Deep AI Research <span className="text-purple-400">$0.15/contact</span></li>
              <li className="flex items-start gap-2">✓ Team seats (3)</li>
              <li className="flex items-start gap-2">✓ API access</li>
            </ul>
            <button
              onClick={() => handleSubscribe('price_pro')}
              disabled={loading === 'price_pro'}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {loading === 'price_pro' ? 'Loading...' : 'Get Started'}
            </button>
          </div>

          {/* Agency - $997 */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-1">Agency</h2>
            <p className="text-gray-500 text-sm mb-3">For scaling</p>
            <div className="text-3xl font-bold mb-1">$997<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <p className="text-gray-500 text-sm mb-4">25,000 contacts/mo</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-4">
              <li className="flex items-start gap-2">✓ Everything in Pro</li>
              <li className="flex items-start gap-2">✓ <strong>Basic AI Research</strong> included</li>
              <li className="flex items-start gap-2">✓ Deep AI Research <span className="text-green-400">$0.10/contact</span></li>
              <li className="flex items-start gap-2">✓ Unlimited team seats</li>
              <li className="flex items-start gap-2">✓ Dedicated support</li>
            </ul>
            <button
              onClick={() => handleSubscribe('price_agency')}
              disabled={loading === 'price_agency'}
              className="w-full py-3 rounded-xl border border-purple-500 text-purple-400 font-semibold hover:bg-purple-500/10 disabled:opacity-50"
            >
              {loading === 'price_agency' ? 'Loading...' : 'Contact Us'}
            </button>
          </div>
        </div>

        {/* Research Explanation */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                What's the Difference in Research?
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Basic Research */}
              <div className="p-4 rounded-xl bg-gray-700/50 border border-gray-600">
                <h3 className="text-lg font-bold text-purple-400 mb-2">✓ Basic AI Research</h3>
                <p className="text-sm text-gray-300 mb-3">Included in Growth, Pro & Agency tiers</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Scrapes public LinkedIn profile data</li>
                  <li>• Fetches company website info</li>
                  <li>• Finds recent news/press releases</li>
                  <li>• References recent posts or updates</li>
                  <li>• Gets smarter over time with your feedback</li>
                </ul>
              </div>

              {/* Deep Research */}
              <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-500">
                <h3 className="text-lg font-bold text-pink-400 mb-2">💎 Deep AI Research</h3>
                <p className="text-sm text-gray-300 mb-3">Add-on for Pro ($0.15/contact) & Agency ($0.10/contact)</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Everything in Basic Research</li>
                  <li>• Verified email addresses (reduces bounces)</li>
                  <li>• Recent funding events & round details</li>
                  <li>• Intent signals & trigger events</li>
                  <li>• Executive team changes</li>
                  <li>• Tech stack & tool insights</li>
                </ul>
              </div>
            </div>

            {/* Email Examples */}
            <div className="mb-4">
              <button 
                onClick={() => setShowExamples(!showExamples)}
                className="text-purple-400 font-semibold hover:text-purple-300 text-sm"
              >
                {showExamples ? '▼ Hide' : '▶ See'} the difference in generated emails
              </button>
            </div>

            {showExamples && (
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-600">
                  <p className="font-bold text-gray-400 mb-2">📧 With Basic Research:</p>
                  <p className="text-gray-300 text-xs mb-2 italic">Subject: Quick question about TechStartup</p>
                  <p className="text-gray-400 text-xs whitespace-pre-line">Hi John,

I noticed TechStartup is growing — impressive what you're building.

We help B2B companies generate more leads through automated outreach. Curious if that's something you'd be open to discussing?

Best,
[Us]</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-500">
                  <p className="font-bold text-pink-400 mb-2">💎 With Deep Research:</p>
                  <p className="text-gray-300 text-xs mb-2 italic">Subject: Congrats on the Series A — thoughts on scaling outreach?</p>
                  <p className="text-gray-400 text-xs whitespace-pre-line">Hi John,

Congrats on the $15M Series A! I saw the TechCrunch coverage — exciting times. I noticed you've been focusing on product expansion lately (loved your API launch post).

We've helped 50+ Series A companies like yours scale their outbound — specifically ones that just raised and need to build pipeline fast without hiring a full sales team.

Quick 15-min chat?

Best,
[Us]</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          14-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
}