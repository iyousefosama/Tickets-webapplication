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
import { Button } from '@/components/ui/button'
import CreateTicket from '../actions/CreateTicket';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-background dark text-foreground p-4 shadow-md">
      <div className="flex items-center justify-between">
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
              <NavigationMenuItem>
                <Link href="/about" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Burger Icon */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="flex flex-col mt-4 space-y-2 md:hidden">
          <Link href="/" className="px-4 py-2 rounded hover:bg-muted">Home</Link>
          <Link href="/about" className="px-4 py-2 rounded hover:bg-muted">About</Link>
          <Link href="/contact" className="px-4 py-2 rounded hover:bg-muted">Contact</Link>

          <div className="px-4 pt-2 border-t">
            <p className="text-sm font-semibold mb-1">Manage Tickets</p>
            <Link href="/add-ticket" className="block py-1 px-2 rounded hover:bg-muted">Add Ticket</Link>
            <Link href="/view-tickets" className="block py-1 px-2 rounded hover:bg-muted">View Tickets</Link>
            <Link href="/update-ticket" className="block py-1 px-2 rounded hover:bg-muted">Update Ticket</Link>
            <Link href="/delete-ticket" className="block py-1 px-2 rounded hover:bg-muted">Delete Ticket</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
