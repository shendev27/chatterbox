"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/components/navigationBar';
import Link from 'next/link';

export default function RoomsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      router.push('/login');
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            My Rooms
          </h1>
          
          <Link href="/join-room">
            <button className="w-full group relative overflow-hidden rounded-2xl bg-white px-12 py-12 text-5xl font-light text-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">Join Room</span>
            </button>
          </Link>

          <Link href="/create-room">
            <button className="w-full group relative overflow-hidden rounded-2xl bg-white px-12 py-12 text-5xl font-light text-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">Create Room</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}