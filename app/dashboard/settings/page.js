'use client';

import { useState } from 'react';

export default function Settings() {
  const [connectedEmail, setConnectedEmail] = useState('');
  const [sendingTool, setSendingTool] = useState('');

  const emailProviders = [
    { id: 'gmail', name: 'Gmail', icon: '📧', docs: 'https://support.google.com/mail' },
    { id: 'outlook', name: 'Outlook', icon: '📨', docs: 'https://support.microsoft.com/outlook' },
    { id: 'google-workspace', name: 'Google Workspace', icon: '🏢', docs: 'https://support.google.com/mail' },
    { id: 'office365', name: 'Microsoft 365', icon: '🏢', docs: 'https://docs.microsoft.com/microsoft-365' },
  ];

  const sendingTools = [
    { id: 'instantly', name: 'Instantly', url: 'https://instantly.ai' },
    { id: 'smartlead', name: 'Smartlead', url: 'https://www.smartlead.ai' },
    { id: 'warmly', name: 'Warmly', url: 'https://www.warmly.ai' },
    { id: 'mailgun', name: 'Mailgun', url: 'https://www.mailgun.com' },
    { id: 'other', name: 'Other SMTP', url: '' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-gray-400 mb-8">Connect your email and sending setup</p>

      {/* Email Connection */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4">📧 Connect Your Sending Email</h2>
        <p className="text-gray-400 text-sm mb-6">
          After generating your emails, you'll need a way to send them. 
          Choose your email provider and we'll help you set it up.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Your Sending Email</label>
            <input
              type="email"
              value={connectedEmail}
              onChange={(e) => setConnectedEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Provider</label>
            <div className="grid grid-cols-2 gap-3">
              {emailProviders.map((provider) => (
                <button
                  key={provider.id}
                  className="p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 flex items-center gap-3"
                >
                  <span className="text-xl">{provider.icon}</span>
                  <span>{provider.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sending Tool Integration */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Sending Tool Integration</h2>
        <p className="text-gray-400 text-sm mb-6">
          Where will you send the generated emails? Select your sending tool.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Your Sending Platform</label>
            <select
              value={sendingTool}
              onChange={(e) => setSendingTool(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">Select your sending tool</option>
              {sendingTools.map((tool) => (
                <option key={tool.id} value={tool.id}>{tool.name}</option>
              ))}
            </select>
          </div>

          {sendingTool && (
            <div className="p-4 rounded-xl bg-purple-500/20 border border-purple-500/50">
              <h3 className="font-semibold mb-2">Setup Guide for {sendingTools.find(t => t.id === sendingTool)?.name}</h3>
              
              {sendingTool === 'instantly' && (
                <div className="text-sm text-gray-300 space-y-2">
                  <p>1. Go to <a href="https://app.instantly.ai" target="_blank" className="text-purple-400 underline">Instantly.ai</a> and create account</p>
                  <p>2. Connect your Gmail/Outlook in Settings → Email Accounts</p>
                  <p>3. Upload the CSV we generated to your campaign</p>
                  <p>4. Set your sending schedule and warmup preferences</p>
                  <p className="text-gray-500 mt-2">💡 Tip: Start with 10-20 emails/day, then scale up gradually.</p>
                </div>
              )}

              {sendingTool === 'smartlead' && (
                <div className="text-sm text-gray-300 space-y-2">
                  <p>1. Go to <a href="https://app.smartlead.ai" target="_blank" className="text-purple-400 underline">Smartlead.ai</a> and create account</p>
                  <p>2. Connect your sending email in "Email Accounts"</p>
                  <p>3. Import your CSV via "Campaigns → Import"</p>
                  <p>4. Configure warmup and rotation settings</p>
                  <p className="text-gray-500 mt-2">💡 Tip: Their inbox rotation helps with deliverability.</p>
                </div>
              )}

              {sendingTool === 'warmly' && (
                <div className="text-sm text-gray-300 space-y-2">
                  <p>1. Go to <a href="https://app.warmly.ai" target="_blank" className="text-purple-400 underline">Warmly.ai</a> and create account</p>
                  <p>2. Connect Gmail/Google Workspace in settings</p>
                  <p>3. Create campaign and upload our CSV</p>
                  <p>4. Enable "AI Warmup" for best results</p>
                </div>
              )}

              {sendingTool === 'mailgun' && (
                <div className="text-sm text-gray-300 space-y-2">
                  <p>1. Create Mailgun account at mailgun.com</p>
                  <p>2. Verify your sending domain (DNS setup)</p>
                  <p>3. Get SMTP credentials from Settings → API</p>
                  <p>4. Use with any SMTP-compatible tool</p>
                </div>
              )}

              {sendingTool === 'other' && (
                <div className="text-sm text-gray-300 space-y-2">
                  <p>1. Get your email provider's SMTP settings</p>
                  <p>2. Use our CSV with any email tool that supports CSV import</p>
                  <p>3. Common settings for Gmail:</p>
                  <ul className="ml-4 text-gray-500">
                    <li>SMTP Host: smtp.gmail.com</li>
                    <li>Port: 587 (TLS) or 465 (SSL)</li>
                    <li>Enable "Less Secure Apps" or use App Password</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">❓ Need Help?</h2>
        <p className="text-gray-400 text-sm mb-4">
          Having trouble connecting your email? Here are common solutions:
        </p>

        <div className="space-y-4">
          <details className="cursor-pointer">
            <summary className="font-semibold text-purple-400">Gmail: "Less Secure Apps" error</summary>
            <div className="mt-2 text-sm text-gray-400 pl-4">
              <p>1. Go to myaccount.google.com → Security</p>
              <p>2. Enable 2-Factor Authentication</p>
              <p>3. Go to App Passwords and generate a new password</p>
              <p>4. Use that password in your sending tool</p>
            </div>
          </details>

          <details className="cursor-pointer">
            <summary className="font-semibold text-purple-400">Outlook: Can't connect</summary>
            <div className="mt-2 text-sm text-gray-400 pl-4">
              <p>1. Make sure you're using an "App Password" if you have 2FA</p>
              <p>2. Or enable POP/IMAP in Outlook settings</p>
              <p>3. Check: account.microsoft.com → Security → Advanced options</p>
            </div>
          </details>

          <details className="cursor-pointer">
            <summary className="font-semibold text-purple-400">Emails going to spam</summary>
            <div className="mt-2 text-sm text-gray-400 pl-4">
              <p>1. Warm up your email gradually (start with 10/day)</p>
              <p>2. Add SPF/DKIM records for your domain</p>
              <p>3. Don't send to spam traps (clean your prospect list)</p>
              <p>4. Personalize your emails (our AI helps with this!)</p>
            </div>
          </details>

          <details className="cursor-pointer">
            <summary className="font-semibold text-purple-400">How to use our CSV with your tool</summary>
            <div className="mt-2 text-sm text-gray-400 pl-4">
              <p>1. Generate your campaign in SendGem</p>
              <p>2. Click "Export CSV"</p>
              <p>3. Go to your sending tool → Create new campaign</p>
              <p>4. Import our CSV as your contact list</p>
              <p>5. Map the "Subject" and "Body" fields to your email template</p>
            </div>
          </details>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50">
          <p className="text-green-400 font-semibold">💬 Still stuck?</p>
          <p className="text-sm text-gray-300">Email us at support@sendgem.ai — we'll help you get set up!</p>
        </div>
      </div>
    </div>
  );
}