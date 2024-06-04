'use client'

import React from 'react'
import { Badge, badgeVariants } from './ui/badge'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function TagsList({tags }: {tags: string[]}) {
  const router = useRouter()
  return (
    <div className="flex gap-2 flex-wrap">
        {tags.map(tag =>(
        <button onClick = {()=>{
          router.push(`/?search=${tag}`)
          }}
          className={cn(badgeVariants())} 
          key={tag}
          >
        {tag}
        </button>
        ))} 
    </div>
  )
}