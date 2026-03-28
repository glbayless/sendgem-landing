'use client';

import { useState } from 'react';

export default function Prospects() {
  const [prospects, setProspects] = useState([]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Prospects</h1>
        <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 font-semibold">
          Upload More
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search prospects..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Empty State */}
      {prospects.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
          <div className="text-5xl mb-4">👥</div>
          <h2 className="text-xl font-semibold mb-2">No prospects yet</h2>
          <p className="text-gray-400 mb-6">Upload your prospect list to generate personalized emails.</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Name</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Email</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Company</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3">John Smith</td>
                <td className="px-4 py-3 text-gray-400">john@techstartup.com</td>
                <td className="px-4 py-3">TechStartup Inc</td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}