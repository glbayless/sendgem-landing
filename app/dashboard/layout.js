'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../lib/auth-context';
import { isSupabaseConfigured } from '../lib/supabase';

export default function DashboardLayout({ children }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isSupabaseConfigured()) {
      // Demo mode - allow access
      return;
    }

    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            SendGem
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-300 hover:text-white text-sm">🏠 Home</Link>
            <Link href="/dashboard/campaigns" className="text-gray-300 hover:text-white text-sm">Campaigns</Link>
            <Link href="/dashboard/prospects" className="text-gray-300 hover:text-white text-sm">Prospects</Link>
            <Link href="/dashboard/onboarding" className="text-gray-300 hover:text-white text-sm">New Campaign</Link>
            <Link href="/dashboard/credits" className="text-gray-300 hover:text-white text-sm">💎 Credits</Link>
            <Link href="/dashboard/settings" className="text-gray-300 hover:text-white text-sm">📧 Setup Email</Link>
            <button 
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white text-sm"
            >
              Sign Out
            </button>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-semibold">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
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