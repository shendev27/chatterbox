"use client";

import Link from "next/link";

export default function RoomInterface() {
  const handleJoinRoom = (): void => {
    console.log("Join Room clicked");
  };

  const handleCreateRoom = (): void => {
    console.log("Create Room clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <Link href="/join-room" legacyBehavior>
          <button
            onClick={handleJoinRoom}
            className="w-full group relative overflow-hidden rounded-2xl bg-white px-12 py-12 text-5xl font-light text-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">Join Room</span>
          </button>
        </Link>

        <Link href="/create-room" legacyBehavior>
          <button
            onClick={handleCreateRoom}
            className="mt-20 w-full group relative overflow-hidden rounded-2xl bg-white px-12 py-12 text-5xl font-light text-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">Create Room</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
