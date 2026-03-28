'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Pricing() {
  const [loading, setLoading] = useState(null);

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
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Plan
          </span>
        </h1>
        <p className="text-gray-400 text-center mb-12">
          AI-powered personalized cold emails that get replies. Upgrade anytime.
        </p>

        <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Starter - $79 */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-1">Starter</h2>
            <p className="text-gray-500 text-sm mb-3">For testing</p>
            <div className="text-3xl font-bold mb-1">$79<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <p className="text-gray-500 text-sm mb-4">100 contacts/mo</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li className="flex items-start gap-2">✓ AI email generation</li>
              <li className="flex items-start gap-2">✓ 5-step sequences</li>
              <li className="flex items-start gap-2">✓ CSV export</li>
              <li className="flex items-start gap-2">✓ Upload your own data</li>
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
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li className="flex items-start gap-2">✓ Everything in Starter</li>
              <li className="flex items-start gap-2">✓ Basic AI research</li>
              <li className="flex items-start gap-2">✓ 7-step sequences</li>
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
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li className="flex items-start gap-2">✓ Everything in Growth</li>
              <li className="flex items-start gap-2">✓ Deep AI research add-on</li>
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
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li className="flex items-start gap-2">✓ Everything in Pro</li>
              <li className="flex items-start gap-2">✓ Deep AI research included</li>
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

        {/* Add-on Note */}
        <div className="mt-8 text-center p-4 rounded-xl bg-gray-800/50 border border-gray-700 max-w-md mx-auto">
          <p className="text-gray-400 text-sm">
            💡 <strong>Deep AI Research</strong> available as add-on for Pro tier at $0.05/contact
          </p>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          14-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
}