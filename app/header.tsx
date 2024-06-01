"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LogOut, LogInIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

function AccountDropdown(){
    const session = useSession()
    const isLoggedIn = !!session.data
    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="link">
            <Avatar className="mr-2">
                <AvatarImage src={session.data?.user?.image ?? ""}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {session.data?.user?.name}
            </Button>
        </DropdownMenuTrigger>
            <DropdownMenuContent>
                {isLoggedIn ? (
                <DropdownMenuItem onClick={()=> signOut()}>
                    <LogOut className="mr-2"/>Sign Out
                </DropdownMenuItem>
                ): (
                <DropdownMenuItem onClick={()=> signIn("google")}>
                    <LogInIcon className="mr-2"/>Sign In
                </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
      );
}



export function Header(){
    return (
        <header className='bg-gray-100 py-4 dark:bg-gray-900 container mx-auto'>
            <div className="flex justify-between items-center">
                <Link href="/" className= "flex gap-2 items-center hover:underline">
                <Image
                src="/icon.jpg"
                width="50"
                height="50"
                alt="app icon of a programmer"
                />
                Code Partner
                </Link>
                <div className="flex items-center gap-4">
                <AccountDropdown/>
                <ModeToggle/>
                </div>
            </div>
        </header>
    )
}
