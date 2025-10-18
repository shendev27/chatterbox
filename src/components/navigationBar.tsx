"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function NavigationBar() {
  return (
    <div className="w-full p-4 bg-white shadow-sm">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg font-medium">
              Home
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col w-48 p-2">
                <Link href="/join-room" legacyBehavior passHref>
                  <NavigationMenuLink className="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 text-gray-700 hover:text-gray-900">
                    Join Room
                  </NavigationMenuLink>
                </Link>
                <Link href="/create-room" legacyBehavior passHref>
                  <NavigationMenuLink className="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 text-gray-700 hover:text-gray-900">
                    Create Room
                  </NavigationMenuLink>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}