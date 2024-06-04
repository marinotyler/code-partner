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
import { Room } from '@/db/schema';
import TagsList from '@/components/tagsList';
import { splitTags } from '@/lib/utils';

export function RoomCard({room}: {room: Room}){
    return(
      <Card>
        <CardHeader>
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
        <CardFooter>
          <Button asChild><Link href={`rooms/${room.id}`}>Join Room</Link></Button>
        </CardFooter>
      </Card>
  
    )
  }