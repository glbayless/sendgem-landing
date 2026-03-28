import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            SendGem
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/dashboard/campaigns" className="text-gray-300 hover:text-white text-sm">Campaigns</Link>
            <Link href="/dashboard/prospects" className="text-gray-300 hover:text-white text-sm">Prospects</Link>
            <Link href="/dashboard/onboarding" className="text-gray-300 hover:text-white text-sm">New Campaign</Link>
            <Link href="/dashboard/credits" className="text-gray-300 hover:text-white text-sm">💎 Credits</Link>
            <Link href="/dashboard/settings" className="text-gray-300 hover:text-white text-sm">📧 Setup Email</Link>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-semibold">
              G
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}