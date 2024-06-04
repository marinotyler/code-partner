'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Room } from '@/db/schema';
import TagsList from '@/components/tagsList';
import { splitTags } from '@/lib/utils';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { deleteRoomAction } from './actions';

export function UserRoomCard({room}: {room: Room}){
    return(
      <Card>
        <CardHeader className='relative' >
          <Button size = "icon" className='absolute top-3 right-3'>
            <Link
            href ={`/edit-room/${room.id}`} >
            <PencilIcon/>
            </Link>
          </Button>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
        <TagsList tags = {splitTags(room.tags)}></TagsList>
          {room.githubRepo &&
          <Link href={room.githubRepo} className='flex items-center gap-2'
              target='_blank' 
              rel='noopener noreferrer'
  
          >
          Github Repo</Link>}
          
        </CardContent>
        <CardFooter className='flex gap-2'>
          <Button asChild><Link href={`rooms/${room.id}`}>Join Room</Link></Button>

          
          <AlertDialog>
  <AlertDialogTrigger>
  <Button variant={'destructive'}> <TrashIcon className='w-4 h-4 mr-2'/>Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently this room.
      </AlertDialogDescription>
    </AlertDialogHeader>  
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{
          deleteRoomAction(room.id)
        }}>Confirm Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

        </CardFooter>
      </Card>
  
    )
  }