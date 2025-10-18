"use client";

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [roomSize, setRoomSize] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  const roomSizes = [2, 4, 6, 8, 10];

  const handleCreate = () => {
    if (roomName.trim()) {
      console.log('Creating room:', { roomName, roomSize });
      // Add your room creation logic here
    } else {
      alert('Please enter a room name');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4">
      <div className="bg-[#D9D9D9] rounded-3xl p-12 shadow-2xl max-w-xl w-full animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center space-y-8">
          {/* Title */}
          <div className="bg-[#B0B0B0] rounded-3xl px-16 py-6 w-full max-w-md">
            <h1 className="text-4xl font-semibold text-black text-center">
              Create Room
            </h1>
          </div>

          {/* Room Name Section */}
          <div className="w-full max-w-md space-y-3">
            <label className="text-xl text-black font-normal block text-center">
              Room name: (max 24 characters)
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value.slice(0, 24))}
              placeholder="Enter room name"
              maxLength={24}
              className="w-full bg-[#808080] text-white placeholder-gray-300 rounded-full px-8 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-gray-500 focus:shadow-lg transition-all duration-200"
            />
          </div>

          {/* Room Size Section */}
          <div className="w-full max-w-md space-y-3">
            <label className="text-xl text-black font-normal block text-center">
              Room size:
            </label>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="w-full bg-[#808080] text-white rounded-full px-8 py-4 text-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-500 focus:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                  <span>{roomSize}</span>
                  <svg
                    className={`w-5 h-5 text-white transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#808080] border-none rounded-2xl p-2 min-w-[200px]">
                {roomSizes.map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => setRoomSize(size)}
                    className="text-white text-lg cursor-pointer hover:bg-[#6B6B6B] rounded-xl py-3 justify-center focus:bg-[#6B6B6B] focus:text-white"
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            className="bg-[#732B2B] hover:bg-[#8B3535] text-black text-xl font-medium px-16 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}