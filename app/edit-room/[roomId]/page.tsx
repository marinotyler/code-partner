import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";

export async function EditRoomPage({params}: {params: {roomId: string}}) {
    const room = await getRoom(params.roomId)
    
    if(!room) return <div> Room not found</div>

    return (
        <div className='container mx-auto flex flex-col gap-8 pt-12'>
            <h1 className='text-4xl font-bold'>Edit Room</h1>
            
            <EditRoomForm room = {room}/>   
        </div>
    )
}