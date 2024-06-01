import { getRoom } from "@/data-access/rooms";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"

export default async function RoomPage(props: {params: {roomId: string}}) {
    const roomId = props.params.roomId;
    const room= await getRoom(roomId);

    if(!room){
        console.log(`No room with this id (${roomId}) found`)
        return <div>No room with this id found</div> 
    }

    const languages = room?.language.split(",").map(lang=> lang.trim())
    return (
        <div className="grid grid-cols-3 min-h-screen">
            <div className="col-span-3 p-2">
                <div className= "rounded-lg border bg-card text-card-foreground shadow-sm p-4">video player</div>
            </div>
            <div className="col-span-1 p-2">
                <div className= "rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    {room.name}
                </div>
                    {room.githubRepo &&
                    <Link href={room.githubRepo} 
                        className='flex items-center gap-2 text-center text-sm self-center'
                        target='_blank' 
                        rel='noopener noreferrer'
                    ></Link>}
                </div>
                    <h1 className="text-base">{room?.name}</h1>
                    <p className="text-base text-gray-700">{room?.description}</p>
                    <div className="flex gap-2 flex-wrap">
                    {languages.map(lang =>(
                    <Badge className="w-fit" key={lang}>
                        {lang}
                        </Badge>)
                    )}
                
            </div>
        </div>
  )
}
