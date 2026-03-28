'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    website: '',
    industry: '',
    description: ''
  });
  const [tone, setTone] = useState('professional');

  const handleSubmit = () => {
    // In a real app, save to database
    console.log('Company info:', companyInfo, 'Tone:', tone);
    router.push('/dashboard/campaigns');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Start a Campaign</h1>
      <p className="text-gray-400 mb-8">Tell us about your company and we'll generate personalized emails.</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-purple-600' : 'bg-gray-700'}`}>1</div>
        <div className={`flex-1 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-purple-600' : 'bg-gray-700'}`}>2</div>
        <div className={`flex-1 h-1 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-purple-600' : 'bg-gray-700'}`}>3</div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 1: Company Information</h2>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Company Name</label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
              placeholder="Acme Inc."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Website URL</label>
            <input
              type="url"
              value={companyInfo.website}
              onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
              placeholder="https://acme.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Industry</label>
            <select
              value={companyInfo.industry}
              onChange={(e) => setCompanyInfo({...companyInfo, industry: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">Select industry</option>
              <option value="saas">SaaS</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="realestate">Real Estate</option>
              <option value="consulting">Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">What does your company do?</label>
            <textarea
              value={companyInfo.description}
              onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
              placeholder="We help businesses..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform"
          >
            Next Step
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 2: Your Tone & Voice</h2>
          
          <p className="text-gray-400 text-sm">How should the AI sound when writing your emails?</p>
          
          <div className="grid grid-cols-2 gap-3">
            {['Professional', 'Casual', 'Friendly', 'Formal'].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t.toLowerCase())}
                className={`p-4 rounded-xl border ${tone === t.toLowerCase() ? 'border-purple-500 bg-purple-500/20' : 'border-white/20 bg-white/5'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/5"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 3: Upload Prospects</h2>
          
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">📄</div>
            <p className="text-gray-400 mb-2">Drop your prospect list here</p>
            <p className="text-gray-500 text-sm">CSV or paste a list of email addresses</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Or paste email addresses (one per line)</label>
            <textarea
              placeholder="john@company.com&#10;jane@another.com"
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/5"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform"
            >
              Generate Campaigns
            </button>
          </div>
        </div>
      )}
    </div>
  );
}