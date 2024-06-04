'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createRoomAction } from "./actions"  
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
 
const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(1). max(250),
    githubRepo: z.string().min(1).max(100),
    tags: z.string().min(1).max(250)
  })

  
export function CreateRoomForm() {
  const {toast} = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          githubRepo: "",
          tags: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        const room = await createRoomAction(values)
        toast({
          title: "Room created",
          description: "Your room has been created",
          duration: 5000,
        })
        router.push(`/rooms/${room.id}`)
      }
      return (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public room name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe the purpose for this room</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Working on..."/>
                  </FormControl>
                  <FormDescription>
                    This is your room description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="JavaScript, Angular, etc..."/>
                  </FormControl>
                  <FormDescription>
                    List your programming langs, frameworks etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Git Repo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://github.com/{reponame}"/>
                  </FormControl>
                  <FormDescription>
                    Include link to projects repository
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
}