"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoomsPage() {
  const [user, setUser] = useState<{ username: string; isGuest: boolean } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const isGuest = localStorage.getItem('isGuest') === 'true';

    if (!userId || !username) {
      router.push('/login');
    } else {
      setUser({ username, isGuest });
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {user.username}!
            {user.isGuest && (
              <span className="text-sm text-gray-500 ml-2">(Guest)</span>
            )}
          </h1>
          <p className="text-gray-600">You're now logged in!</p>
          
          <button
            onClick={() => {
              localStorage.clear();
              router.push('/login');
            }}
            className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}