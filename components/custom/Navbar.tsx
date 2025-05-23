'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Menu, X } from 'lucide-react'
import { FaSignInAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import CreateTicket from '../actions/CreateTicket';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession();

  return (
    <nav className="bg-background dark text-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Button variant={"ghost"}>
          <h2 className="text-xl font-semibold">🎫 Ticket App</h2>
        </Button>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer">Manage Tickets</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[150px] w-64 text-center font-semibold">
                  <NavigationMenuLink asChild>
                    <CreateTicket component={<Button variant={"ghost"}>Add Ticket</Button>} />
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/view-tickets">View Tickets</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {session?.user ? (
                <>
                  <NavigationMenuItem>
                    <Link href="/api/auth/signout" passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Sign Out
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <p className='flex items-center space-x-2'>
                    <span className="text-sm font-semibold">👋 Welcome, {session.user.name}</span>
                  </p>
                </>
              ) : (
                <NavigationMenuItem>
                  <Link href="/api/auth/signin" passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Sign In
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col mt-4 space-y-2 md:hidden">
          <Link href="/" className="px-4 py-2 rounded hover:bg-muted">Home</Link>
          {session?.user ? (
            <>
              <Link href="/api/auth/signout" className="px-4 py-2 rounded hover:bg-muted">
                Sign Out
              </Link>
              <p className="px-4 py-2 text-sm font-semibold">👋 Welcome, {session.user.name}</p>
            </>
          ) : (
            <Link href="/api/auth/signin" className="px-4 py-2 rounded hover:bg-muted">
              Sign In
            </Link>
          )}

          <div className="px-4 pt-2 border-t">
            <p className="text-sm font-semibold mb-1">Manage Tickets</p>
            <Link href="/view-tickets" className="block py-1 px-2 rounded hover:bg-muted">View Tickets</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
