"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { VscLock } from "react-icons/vsc"
import { useState, useEffect } from "react"
import axios from "axios"

export function Nav() {
  const { data: session } = useSession()
  const email = session?.user?.email
  const id = session?.user?.id as string | undefined
  const router = useRouter()
  const [points, setPoints] = useState<number | undefined>()

  useEffect(() => {
    const fetchCoins = async () => {
      if (id) {
        try {
          const response = await axios.get('/api/coingetter', { params: { id } })
          setPoints(response.data.points)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }
    fetchCoins()
  }, [id])

  return (
    <div className="fixed top-0 inset-x-0 flex justify-between items-center max-w-screen-xl mx-auto z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left side: Logo */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="font-bold text-2xl">
            <Link href="/" className="flex flex-row items-center">
              Lokin <VscLock className="ml-1" />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side: SignUp, Logout, Email, and Points */}
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">
          <NavigationMenuItem>
            <button
              onClick={() => router.push("/signUp")}
              className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
            >
              SignUp
            </button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <button
              onClick={() => signOut()}
              className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
            >
              Logout
            </button>
          </NavigationMenuItem>
          {email && (
            <NavigationMenuItem>
              <p className="text-sm text-muted-foreground">{email}</p>
            </NavigationMenuItem>
          )}
          {points !== undefined && (
            <NavigationMenuItem>
              <p className="text-sm font-medium">Points: {points}</p>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"