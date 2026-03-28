import Link from 'next/link';

export default function Campaigns() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Link 
          href="/dashboard/onboarding"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
        >
          New Campaign
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 rounded-lg bg-purple-600 text-sm">All</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 text-sm text-gray-400">Draft</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 text-sm text-gray-400">Active</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 text-sm text-gray-400">Completed</button>
      </div>

      {/* Empty State */}
      <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
        <div className="text-5xl mb-4">📧</div>
        <h2 className="text-xl font-semibold mb-2">No campaigns yet</h2>
        <p className="text-gray-400 mb-6">Create your first campaign to start generating personalized emails.</p>
        <Link 
          href="/dashboard/onboarding"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
        >
          Create Campaign
        </Link>
      </div>
    </div>
  );
}