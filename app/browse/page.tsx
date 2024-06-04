import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getRooms } from '@/data-access/rooms';
import { SearchBar } from './search-bar';
import { RoomCard } from './room-card';
import { unstable_noStore } from 'next/cache';
import Image from "next/image"



export default async function Home({searchParams}: {
  searchParams: {
    search: string
  }
}) {
  const rooms = await getRooms(searchParams.search);
  unstable_noStore();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl">Find Rooms</h1>
      <Button asChild>
        <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
      <SearchBar/>
      </div>
      
      <div className="grid grid-cols-3 gap-4 ">
        {rooms.map(room =>{
          return <RoomCard key={room.id} room = {room}/>
        })}
      </div>
        {rooms.length === 0 &&(
          <div className='flex flex-col gap-4 justify-center items-center '>
            <h1 className='text-3xl'>Just you and the void. No rooms available</h1>
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
