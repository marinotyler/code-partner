import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserRooms } from '@/data-access/rooms';
import { UserRoomCard } from './user-room-card';
import { unstable_noStore } from 'next/cache';
import Image from "next/image"

export default async function YourRoomsPage() {
  const rooms = await getUserRooms();
  unstable_noStore();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl">Your Rooms</h1>
      <Button asChild>
        <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        {rooms.map(room =>{
          return <UserRoomCard key={room.id} room = {room}/>
        })}
      </div>
        {rooms.length === 0 &&(
          <div className='flex flex-col gap-4 justify-center items-center '>
            <h1 className='text-3xl'>Just you and the void. You have no rooms. Create a room <a href="/create-room" className="hover:underline">here</a></h1>
            <Image
            className=""
            src="/void.png"
            width = "1000"
            height = "1000"
            alt="a picture of the void"></Image>
          </div>  
        )}
    </main>
  );
}
