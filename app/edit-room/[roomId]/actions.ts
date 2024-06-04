'use server'
import { editRoom, getRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId"> ){
    const session = await getSession();
    
    if(!session) {
        throw new Error("Must be logged in to create a room")
    }

    //confirm created room
    
    const room = await getRoom(roomData.id);

    if(room?.userId!==session.user.id){
        throw new Error("Must be the creator of the room to delete it")
    }
    await editRoom({ ...roomData, userId: room.userId});

    revalidatePath("/your-rooms")
    revalidatePath(`edit-room/${roomData.id}`)
    redirect("/your-rooms")
}

