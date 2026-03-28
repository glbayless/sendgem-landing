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
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Plan
          </span>
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Start generating personalized cold emails that get replies
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Starter */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-2">Starter</h2>
            <div className="text-4xl font-bold mb-4">$97<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8 text-gray-300">
              <li className="flex items-center gap-2">✓ AI email generation</li>
              <li className="flex items-center gap-2">✓ 500 prospects/mo</li>
              <li className="flex items-center gap-2">✓ Basic email sequences</li>
              <li className="flex items-center gap-2">✓ Standard support</li>
            </ul>
            <button
              onClick={() => handleSubscribe('price_starter')}
              disabled={loading === 'price_starter'}
              className="w-full py-3 rounded-xl bg-gray-700 font-semibold hover:bg-gray-600 disabled:opacity-50"
            >
              {loading === 'price_starter' ? 'Loading...' : 'Get Started'}
            </button>
          </div>

          {/* Professional */}
          <div className="bg-gradient-to-b from-purple-900/30 to-gray-800 rounded-2xl p-8 border border-purple-500/50 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold mb-2">Professional</h2>
            <div className="text-4xl font-bold mb-4">$297<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8 text-gray-300">
              <li className="flex items-center gap-2">✓ Everything in Starter</li>
              <li className="flex items-center gap-2">✓ Unlimited prospects</li>
              <li className="flex items-center gap-2">✓ Full 5-7 step sequences</li>
              <li className="flex items-center gap-2">✓ Deep prospect research</li>
              <li className="flex items-center gap-2">✓ AI learns your feedback</li>
              <li className="flex items-center gap-2">✓ Priority support</li>
            </ul>
            <button
              onClick={() => handleSubscribe('price_professional')}
              disabled={loading === 'price_professional'}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {loading === 'price_professional' ? 'Loading...' : 'Get Started'}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          14-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
}