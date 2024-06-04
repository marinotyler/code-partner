"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LogOut, LogInIcon, DeleteIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { deleteAccountAction } from "./actions"


function AccountDropdown(){
    const session = useSession()
    const [open, setOpen] = useState(false)

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>  
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick= {async ()=>{
                        await deleteAccountAction()
                        signOut({callbackUrl: "/"});
                    }}>Confirm Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                    <DropdownMenuItem onClick={()=> signOut({
                        callbackUrl: "/",
                    })}>
                        <LogOut className="mr-2"/>Sign Out
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>{
                            setOpen(true)
                        }}>
                        <DeleteIcon className="mr-2"/ >Delete Account
                    </DropdownMenuItem>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        </>
      );
}



export function Header(){
   const session = useSession()
   const isLoggedIn = !!session.data
    return (
        <header className='bg-gray-100 py-4 dark:bg-gray-900 z-10 relative'>
            <div className="container flex justify-between items-center">
                <Link href="/" className= "flex gap-2 items-center hover:underline">
                <Image
                src="/icon.jpg"
                width="50"
                height="50"
                alt="app icon of a programmer"
                />
                Code Partner
                </Link>

                <nav className="flex gap-8 ">
                  
                    {isLoggedIn&&(
                        <>
                           <Link 
                           className="hover:underline"
                           href="/your-rooms" >Your Rooms
                           </Link>
                           <Link 
                           className="hover:underline"
                           href="/browse" >Browse
                           </Link>
                        </>
                        
                    )}  
                </nav>

                <div className="flex items-center gap-4">
                    {isLoggedIn && <AccountDropdown/>}
                    {!isLoggedIn && 
                    <Button 
                    onClick={()=>
                        signIn("google", {
                            callbackUrl: "/",
                        })
                        }
                        variant="link"
                    >
                    <LogInIcon className="mr-2"/>
                    Sign In
                    </Button>

                    }
                <ModeToggle/>
                </div>
            </div>
        </header>
    )
}
