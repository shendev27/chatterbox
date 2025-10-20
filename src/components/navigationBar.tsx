import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function AppleNavbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="relative backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-white/20 dark:border-gray-700/30">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1" />

            <div className="absolute left">
              <DropdownMenu>
                <DropdownMenuTrigger className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300/50 dark:focus:ring-gray-600/50">
                  <Link href="/">Home</Link>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <DropdownMenu>
                <DropdownMenuTrigger className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300/50 dark:focus:ring-gray-600/50">
                  Menu
                </DropdownMenuTrigger>
                <DropdownMenuContent className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-white/20 dark:border-gray-700/30 shadow-xl rounded-xl mt-2">
                  <DropdownMenuItem className="text-sm py-2.5 cursor-pointer hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-colors duration-150 rounded-lg">
                    <Link href="/join-room">Join Room</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm py-2.5 cursor-pointer hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-colors duration-150 rounded-lg">
                    <Link href="/create-room">Create Room</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300/50 dark:focus:ring-gray-600/50">
                  <Link href="/login">Account</Link>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
