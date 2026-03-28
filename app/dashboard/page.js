import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-gray-400 text-sm">Total Campaigns</div>
          <div className="text-2xl font-bold mt-1">0</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-gray-400 text-sm">Prospects</div>
          <div className="text-2xl font-bold mt-1">0</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-gray-400 text-sm">Emails Sent</div>
          <div className="text-2xl font-bold mt-1">0</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-gray-400 text-sm">Reply Rate</div>
          <div className="text-2xl font-bold mt-1">—%</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">🚀 Start a Campaign</h2>
          <p className="text-gray-400 text-sm mb-4">
            Create a new email campaign with AI-generated personalized emails.
          </p>
          <Link 
            href="/dashboard/onboarding"
            className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
          >
            New Campaign
          </Link>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">📤 Upload Prospects</h2>
          <p className="text-gray-400 text-sm mb-4">
            Add your prospect list to generate personalized emails.
          </p>
          <Link 
            href="/dashboard/prospects"
            className="inline-block px-6 py-2 rounded-lg bg-gray-700 font-semibold hover:bg-gray-600"
          >
            Upload List
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center text-gray-400">
          No campaigns yet. Start your first campaign to see results here.
        </div>
      </div>
    </div>
  );
}