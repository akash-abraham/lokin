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
} from "@/components/ui/navigation-menu";
import {  signOut,useSession } from "next-auth/react"
import { useRouter } from "next/navigation";




export function Nav() {
    const {data:session} = useSession();
    const email = session?.user?.email;
    const router = useRouter();

  return (
    <div className="fixed top-10 inset-x-0  max-w-screen-xl mx-auto z-50 ">
      <div className="flex justify-between items-center"></div>
    <NavigationMenu className="">
      <NavigationMenuList>
        <NavigationMenuItem className="font-bold text-2xl">
            <Link href='/'>
          Lokin
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className='cursor-pointer' onClick={()=>router.push('/signUp')}>
            SignUp

        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink onClick={()=>signOut()} className={navigationMenuTriggerStyle()}>
              Logout
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
            {
                <p>{email}</p>
            }
        </NavigationMenuItem>
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
