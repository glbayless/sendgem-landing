'use client';

import { useState } from 'react';

export default function Settings() {
  const [plan, setPlan] = useState('starter');

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Subscription */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <h2 className="text-lg font-semibold mb-4">Your Plan</h2>
        
        <div className="space-y-3">
          <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${plan === 'starter' ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600'}`}>
            <div>
              <div className="font-semibold">Starter</div>
              <div className="text-sm text-gray-400">$97/month • 500 prospects/mo</div>
            </div>
            <input type="radio" name="plan" checked={plan === 'starter'} onChange={() => setPlan('starter')} className="w-5 h-5 accent-purple-500" />
          </label>
          
          <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${plan === 'professional' ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600'}`}>
            <div>
              <div className="font-semibold">Professional</div>
              <div className="text-sm text-gray-400">$297/month • Unlimited prospects</div>
            </div>
            <input type="radio" name="plan" checked={plan === 'professional'} onChange={() => setPlan('professional')} className="w-5 h-5 accent-purple-500" />
          </label>
        </div>

        <button className="mt-4 w-full py-2 rounded-lg bg-gray-700 text-sm hover:bg-gray-600">
          Update Plan
        </button>
      </div>

      {/* Company Settings */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <h2 className="text-lg font-semibold mb-4">Company Info</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Company Name</label>
            <input
              type="text"
              defaultValue="Acme Inc."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Website</label>
            <input
              type="url"
              defaultValue="https://acme.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <h2 className="text-lg font-semibold mb-4">API Configuration</h2>
        <p className="text-gray-400 text-sm mb-4">Add your OpenRouter API key for AI generation.</p>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">OpenRouter API Key</label>
          <input
            type="password"
            placeholder="sk-or-..."
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-gray-800 rounded-xl p-6 border border-red-900/50">
        <h2 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h2>
        <button className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10">
          Delete Account
        </button>
      </div>
    </div>
  );
}