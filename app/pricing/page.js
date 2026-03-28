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
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Plan
          </span>
        </h1>
        <p className="text-gray-400 text-center mb-12 text-lg">
          AI-powered personalized cold emails that get replies. Upgrade anytime.
        </p>

        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {/* Starter - $47 */}
          <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 flex flex-col">
            <div>
              <h2 className="text-xl font-bold mb-1">Starter</h2>
              <p className="text-gray-500 text-sm mb-2">Perfect for testing</p>
              <div className="text-3xl font-bold mb-1">$47<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <p className="text-gray-500 text-sm mb-4">Up to 100 contacts/month</p>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-start gap-2">✓ AI-generated email sequences</li>
                <li className="flex items-start gap-2">✓ 5-step follow-up sequences</li>
                <li className="flex items-start gap-2">✓ CSV download & export</li>
                <li className="flex items-start gap-2">✓ Use your own prospect data</li>
                <li className="flex items-start gap-2">✓ Personalize by name, company & title</li>
                <li className="flex items-start gap-2">✓ Multiple tone options</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-3">Best for: Solopreneurs testing the waters</p>
              <button
                onClick={() => handleSubscribe('price_starter')}
                disabled={loading === 'price_starter'}
                className="w-full py-3 rounded-xl bg-gray-700 font-semibold hover:bg-gray-600 disabled:opacity-50 text-sm"
              >
                {loading === 'price_starter' ? 'Loading...' : 'Start Free Trial'}
              </button>
            </div>
          </div>

          {/* Growth - $147 */}
          <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 flex flex-col">
            <div>
              <h2 className="text-xl font-bold mb-1">Growth</h2>
              <p className="text-gray-500 text-sm mb-2">Our most popular plan</p>
              <div className="text-3xl font-bold mb-1">$147<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <p className="text-gray-500 text-sm mb-4">Up to 500 contacts/month</p>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-start gap-2">✓ <strong className="text-purple-400">Everything in Starter, plus:</strong></li>
                <li className="flex items-start gap-2">✓ <strong>Basic AI Research</strong> included</li>
                <li className="flex items-start gap-2">✓ We research your prospects for you</li>
                <li className="flex items-start gap-2">✓ 7-step follow-up sequences</li>
                <li className="flex items-start gap-2">✓ AI learns from your feedback</li>
                <li className="flex items-start gap-2">✓ Priority processing speed</li>
                <li className="flex items-start gap-2">✓ Higher quality personalization</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-3">Best for: Freelancers & small agencies</p>
              <button
                onClick={() => handleSubscribe('price_growth')}
                disabled={loading === 'price_growth'}
                className="w-full py-3 rounded-xl bg-gray-700 font-semibold hover:bg-gray-600 disabled:opacity-50 text-sm"
              >
                {loading === 'price_growth' ? 'Loading...' : 'Start Free Trial'}
              </button>
            </div>
          </div>

          {/* Pro - $297 */}
          <div className="bg-gradient-to-b from-purple-900/30 to-gray-800 rounded-2xl p-5 border border-purple-500/50 flex flex-col relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-xs font-semibold">
              Most Popular
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Pro</h2>
              <p className="text-gray-500 text-sm mb-2">For growing teams</p>
              <div className="text-3xl font-bold mb-1">$297<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <p className="text-gray-500 text-sm mb-4">Up to 2,500 contacts/month</p>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-start gap-2">✓ <strong className="text-purple-400">Everything in Growth, plus:</strong></li>
                <li className="flex items-start gap-2">✓ <strong>Basic AI Research</strong> included</li>
                <li className="flex items-start gap-2">✓ 3 team seats included</li>
                <li className="flex items-start gap-2">✓ API access for integrations</li>
                <li className="flex items-start gap-2">✓ Add <strong className="text-pink-400">Deep AI Research</strong> for $0.15/contact</li>
                <li className="flex items-start gap-2">✓ Verified email addresses</li>
                <li className="flex items-start gap-2">✓ Funding event triggers</li>
                <li className="flex items-start gap-2">✓ Intent signals & trigger events</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-3">Best for: Teams needing volume & quality</p>
              <button
                onClick={() => handleSubscribe('price_pro')}
                disabled={loading === 'price_pro'}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50 text-sm"
              >
                {loading === 'price_pro' ? 'Loading...' : 'Start Free Trial'}
              </button>
            </div>
          </div>

          {/* Agency - $997 */}
          <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 flex flex-col">
            <div>
              <h2 className="text-xl font-bold mb-1">Agency</h2>
              <p className="text-gray-500 text-sm mb-2">For scaling operations</p>
              <div className="text-3xl font-bold mb-1">$997<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <p className="text-gray-500 text-sm mb-4">Up to 25,000 contacts/month</p>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-start gap-2">✓ <strong className="text-green-400">Everything in Pro, plus:</strong></li>
                <li className="flex items-start gap-2">✓ <strong>Basic AI Research</strong> included</li>
                <li className="flex items-start gap-2">✓ Unlimited team seats</li>
                <li className="flex items-start gap-2">✓ <strong className="text-green-400">Deep AI Research</strong> at lower cost: $0.10/contact</li>
                <li className="flex items-start gap-2">✓ Dedicated account manager</li>
                <li className="flex items-start gap-2">✓ Priority support & SLA</li>
                <li className="flex items-start gap-2">✓ Custom integrations</li>
                <li className="flex items-start gap-2">✓ Volume pricing for extra contacts</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-3">Best for: Agencies & enterprises</p>
              <button
                onClick={() => handleSubscribe('price_agency')}
                disabled={loading === 'price_agency'}
                className="w-full py-3 rounded-xl border border-purple-500 text-purple-400 font-semibold hover:bg-purple-500/10 disabled:opacity-50 text-sm"
              >
                {loading === 'price_agency' ? 'Loading...' : 'Contact Sales'}
              </button>
            </div>
          </div>
        </div>

        {/* Research Explanation */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-2 text-center">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                What's Actually Included in Research?
              </span>
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Our AI doesn't just write emails — it researches your prospects first. Here's what each level includes.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Basic Research */}
              <div className="p-5 rounded-xl bg-gray-700/50 border border-gray-600">
                <h3 className="text-lg font-bold text-purple-400 mb-3">✓ Basic AI Research <span className="text-sm font-normal text-gray-400">(Growth, Pro & Agency)</span></h3>
                <p className="text-sm text-gray-300 mb-4">We automatically research every prospect before writing your emails. Here's what we find:</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">🔍 <strong>LinkedIn Profile:</strong> Job title, company tenure, background</li>
                  <li className="flex items-start gap-2">🌐 <strong>Company Website:</strong> What they do, recent updates</li>
                  <li className="flex items-start gap-2">📰 <strong>Recent News:</strong> Press mentions, blog posts, events</li>
                  <li className="flex items-start gap-2">💬 <strong>Social Activity:</strong> Recent posts, comments, shares</li>
                  <li className="flex items-start gap-2">🧠 <strong>Smart Learning:</strong> AI improves based on your feedback — tells us what works and what doesn't, so each email gets better than the last</li>
                </ul>
              </div>

              {/* Deep Research */}
              <div className="p-5 rounded-xl bg-purple-900/30 border border-purple-500">
                <h3 className="text-lg font-bold text-pink-400 mb-3">💎 Deep AI Research <span className="text-sm font-normal text-gray-400">(Add-on for Pro & Agency)</span></h3>
                <p className="text-sm text-gray-300 mb-4">For maximum personalization and higher reply rates, upgrade to Deep Research:</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">✅ <strong>Verified Emails:</strong> We verify every email address before you send — dramatically reduces bounces</li>
                  <li className="flex items-start gap-2">💰 <strong>Funding Data:</strong> Recent raises, investors, round sizes</li>
                  <li className="flex items-start gap-2">🎯 <strong>Intent Signals:</strong> What content they're consuming, product searches</li>
                  <li className="flex items-start gap-2">👔 <strong>Leadership Changes:</strong> New hires, promotions, executive moves</li>
                  <li className="flex items-start gap-2">🛠 <strong>Tech Stack:</strong> What tools they use, integrations they have</li>
                  <li className="flex items-start gap-2">📊 <strong>Company Insights:</strong> Headcount, revenue signals, growth indicators</li>
                </ul>
              </div>
            </div>

            {/* Email Examples */}
            <div className="mb-4 text-center">
              <button 
                onClick={() => setShowExamples(!showExamples)}
                className="text-purple-400 font-semibold hover:text-purple-300 text-lg"
              >
                {showExamples ? '▼ Hide' : '▶ Click to see'} the difference in generated emails
              </button>
            </div>

            {showExamples && (
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="p-5 rounded-xl bg-gray-700/30 border border-gray-600">
                  <p className="font-bold text-purple-400 mb-3">📧 With Basic Research ($0 extra):</p>
                  <p className="text-gray-300 text-sm mb-2 italic">Subject: Quick question about TechStartup</p>
                  <div className="text-gray-400 text-xs space-y-2 whitespace-pre-line">Hi John,

I noticed TechStartup is growing — impressive what you're building.

We help B2B companies generate more leads through automated outreach. Curious if that's something you'd be open to discussing?

Best,
[Us]</div>
                  <p className="text-gray-500 text-xs mt-3 italic">Good — but generic. Could apply to any company.</p>
                </div>
                <div className="p-5 rounded-xl bg-purple-900/30 border border-purple-500">
                  <p className="font-bold text-pink-400 mb-3">💎 With Deep Research ($0.10-0.15/contact):</p>
                  <p className="text-gray-300 text-sm mb-2 italic">Subject: Congrats on the Series A — thoughts on scaling outreach?</p>
                  <div className="text-gray-400 text-xs space-y-2 whitespace-pre-line">Hi John,

Congrats on the $15M Series A! 🎉 Saw the TechCrunch coverage — exciting times. I noticed you've been focusing on product expansion lately (loved your API launch post).

We've helped 50+ Series A companies like yours scale their outbound — specifically ones that just raised and need to build pipeline fast without hiring a full sales team. Companies like Dataflow (raised $12M in Q3) saw 3x increase in meetings within 60 days.

Quick 15-min chat to see if we'd be a fit?

Best,
[Us]</div>
                  <p className="text-gray-500 text-xs mt-3 italic">Much more personal, relevant and likely to get a reply.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          14-day money-back guarantee • Cancel anytime • Secure checkout
        </p>
      </div>
    </div>
  );
}