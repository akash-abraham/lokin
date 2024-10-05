import React from 'react'
import { getServerSession } from 'next-auth'
import { Next_AUTH_CONFIG } from "@/app/lib/auth"

const Count = async(setids) => {
    const session= await getServerSession(Next_AUTH_CONFIG)
  return (
    <div>{setids(session.user.id)}</div>
  )
}

export default Count