'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin');
      return;
    }
    setUser(user);
    setLoading(false);
  }, [router]);

  // Check authentication on component mount
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="font-sans min-h-screen bg-gray-50">
      {/* Header */}
      <section className="w-full bg-custom-blue text-white py-8">
        <div className="w-3/4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Admin Dashboard</h1>
              <p className="text-lg">Manage your church website</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-200">Logged in as</p>
                <p className="font-semibold">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-custom-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-3/4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Service Times Management */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-custom-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-custom-blue">Service Times</h2>
              <p className="text-gray-600 mb-6">
                Update your church service times. Changes will appear immediately on your website.
              </p>
              <button
                onClick={() => router.push('/admin/service-times')}
                className="bg-custom-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-200 w-full"
              >
                Manage Service Times
              </button>
            </div>
          </div>

          {/* Events Calendar Management */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-green-600">Events Calendar</h2>
              <p className="text-gray-600 mb-6">
                Manage church events, special services, and activities. Create and edit events for your congregation.
              </p>
              <button
                onClick={() => router.push('/admin/events')}
                className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 w-full"
              >
                Manage Events
              </button>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-purple-600">Analytics</h2>
              <p className="text-gray-600 mb-6">
                Monitor website performance, user behavior, and Core Web Vitals. Track your SEO improvements.
              </p>
              <button
                onClick={() => router.push('/admin/analytics')}
                className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 w-full"
              >
                View Analytics Dashboard {/* Combined Dashboard */}
              </button>
            </div>
          </div>

        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-custom-blue">Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-custom-blue">3</div>
              <div className="text-gray-600">Service Times</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600">Upcoming Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">Active</div>
              <div className="text-gray-600">Admin Status</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Getting Started:</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• <strong>Service Times:</strong> Update your regular service schedule</li>
            <li>• <strong>Events Calendar:</strong> Add special events and activities</li>
            <li>• <strong>Analytics:</strong> Monitor website performance and user behavior</li>
            <li>• <strong>Real-time Updates:</strong> Changes appear immediately on your website</li>
            <li>• <strong>Secure Access:</strong> Only authenticated admins can make changes</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 