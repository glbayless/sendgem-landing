'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Credits() {
  const [loading, setLoading] = useState(null);
  const [credits, setCredits] = useState(0); // Would come from DB in real app
  const [tier] = useState('pro'); // Would come from DB - 'pro' or 'agency'

  const handleBuyCredits = async (creditsPack) => {
    setLoading(creditsPack);
    
    try {
      const response = await fetch('/api/credits/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creditsPack })
      });
      
      const { url, error } = await response.json();
      
      if (error) {
        console.error('Checkout error:', error);
        alert('Error processing purchase. Please try again.');
      } else if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
    
    setLoading(null);
  };

  const creditOptions = tier === 'agency' 
    ? [
        { id: 'credits_500', credits: 500, price: 250, label: '500 Credits', subtitle: '$0.50 per contact' }
      ]
    : [
        { id: 'credits_100', credits: 100, price: 60, label: '100 Credits', subtitle: '$0.60 per contact' }
      ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Deep AI Research Credits</h1>
        <Link 
          href="/dashboard"
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Current Credits Balance */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/30 rounded-xl p-6 border border-purple-500/50 mb-8">
        <p className="text-gray-400 text-sm mb-1">Your Available Credits</p>
        <p className="text-4xl font-bold text-purple-400">{credits} <span className="text-lg text-gray-400">credits</span></p>
        <p className="text-gray-500 text-sm mt-2">
          Use these credits to apply Deep AI Research to your prospects
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4">How Credits Work</h2>
        <div className="space-y-3 text-gray-300 text-sm">
          <p>When you upload prospects, you can choose which ones get <strong className="text-pink-400">Deep AI Research</strong>.</p>
          <p>Each contact with Deep Research applied costs <strong>{tier === 'agency' ? '$0.50' : '$0.60'}</strong> per contact.</p>
          <p>Your credits never expire — use them whenever you're ready.</p>
        </div>
      </div>

      {/* Purchase Options */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Buy More Credits</h2>
        <p className="text-gray-400 text-sm mb-6">
          {tier === 'agency' 
            ? 'Agency tier: $0.50 per contact (500 credit minimum order)' 
            : 'Pro tier: $0.60 per contact (100 credit minimum order)'}
        </p>

        <div className="space-y-3">
          {creditOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleBuyCredits(option.id)}
              disabled={loading === option.id}
              className="w-full p-4 rounded-xl border border-purple-500/50 hover:bg-purple-500/20 flex items-center justify-between disabled:opacity-50"
            >
              <div className="text-left">
                <p className="font-semibold text-white">{option.label}</p>
                <p className="text-sm text-gray-400">{option.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-purple-400">${option.price}</p>
                <p className="text-xs text-gray-500">One-time purchase</p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-xs mt-4 text-center">
          Credits are added immediately after payment • Secure checkout via Stripe
        </p>
      </div>

      {/* How to Use */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-6">
        <h2 className="text-xl font-semibold mb-4">How to Apply Credits</h2>
        <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
          <li>Go to <Link href="/dashboard/onboarding" className="text-purple-400 underline">New Campaign</Link></li>
          <li>Upload your prospects (CSV or paste)</li>
          <li>When previewing, check the box next to contacts you want Deep Research on</li>
          <li>Credits will be deducted from your balance automatically</li>
        </ol>
      </div>
    </div>
  );
}