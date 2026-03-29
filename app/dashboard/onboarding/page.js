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
  const [samples, setSamples] = useState('');
  const [prospects, setProspects] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedEmails, setGeneratedEmails] = useState(null);

  const handleGenerate = async () => {
    setGenerating(true);
    
    try {
      // Parse prospects into array
      const prospectList = prospects.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const parts = line.split(/[,\t]/);
          return {
            name: parts[0]?.trim() || 'Prospect',
            email: parts[1]?.trim() || '',
            company: parts[2]?.trim() || 'Their company'
          };
        });

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyInfo,
          prospects: prospectList,
          tone
        })
      });
      
      const data = await response.json();
      
      if (data.emails) {
        setGeneratedEmails(data.emails);
        setStep(4);
      } else {
        alert('Failed to generate emails. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
    
    setGenerating(false);
  };

  const exportCSV = () => {
    if (!generatedEmails || generatedEmails.length === 0) return;
    
    const headers = ['Step', 'Subject', 'Body'];
    const rows = generatedEmails.map((e, i) => [
      e.step || i + 1,
      e.subject || '',
      e.body || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sendgem-campaign-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Start a Campaign</h1>
      <p className="text-gray-400 mb-8">Tell us about your company and we'll generate personalized emails.</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= s ? 'bg-purple-600' : 'bg-gray-700'}`}>
              {s}
            </div>
            {s < 4 && <div className={`w-8 h-1 ${step > s ? 'bg-purple-600' : 'bg-gray-700'}`}></div>}
          </div>
        ))}
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
              placeholder="We help businesses automate their sales outreach..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={() => companyInfo.name && companyInfo.description ? setStep(2) : alert('Please fill in company name and description')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform"
          >
            Next Step
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 2: Share Your Voice</h2>
          
          <p className="text-gray-400 text-sm">Help our AI write in YOUR voice by uploading any of these:</p>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              'Sample emails you\'ve sent',
              'Company website (we\'ll read it)',
              'Pitch deck or one-pager',
              'Case studies',
              'Product descriptions',
              'Blog posts',
              'LinkedIn posts',
              'Competitor info'
            ].map((item) => (
              <div key={item} className="p-3 rounded-xl border border-white/20 bg-white/5 text-sm text-gray-300">
                📄 {item}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Or paste samples here (we'll read your website automatically if you gave us the URL)
            </label>
            <textarea
              value={samples}
              onChange={(e) => setSamples(e.target.value)}
              placeholder="Paste sample emails, links to your website, or any context about how you talk to prospects..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
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
          <h2 className="text-xl font-semibold">Step 3: Your Tone & Voice</h2>
          
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
          <h2 className="text-xl font-semibold">Step 4: Add Prospects</h2>
          
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">📄</div>
            <p className="text-gray-400 text-sm">CSV upload coming soon</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Paste prospects (one per line, format: Name, Email, Company)
            </label>
            <textarea
              value={prospects}
              onChange={(e) => setProspects(e.target.value)}
              placeholder="John Smith, john@techstartup.com, TechStartup&#10;Jane Doe, jane@financeco.com, FinanceCo"
              rows={8}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono text-sm"
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
              onClick={handleGenerate}
              disabled={generating || !prospects}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {generating ? '🤖 Generating Emails...' : '✨ Generate Campaign'}
            </button>
          </div>
        </div>
      )}

      {step === 4 && generatedEmails && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 5: Your Generated Emails</h2>
          
          <p className="text-gray-400">Your AI-generated email sequence is ready!</p>

          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {generatedEmails.map((email, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-400">Step {email.step || idx + 1}</span>
                  <button className="text-xs text-gray-400 hover:text-white">Copy</button>
                </div>
                <div className="text-sm font-semibold mb-2">{email.subject}</div>
                <div className="text-sm text-gray-300 whitespace-pre-wrap">{email.body}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={exportCSV}
              className="flex-1 py-3 rounded-xl border border-green-500 text-green-400 font-semibold hover:bg-green-500/10"
            >
              📥 Export CSV
            </button>
            <button
              onClick={() => { setGeneratedEmails(null); setStep(3); }}
              className="flex-1 py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/5"
            >
              Regenerate
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}