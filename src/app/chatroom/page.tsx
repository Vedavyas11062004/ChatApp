"use client"
import React from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast";

export default function ChatRoom() {
    const router = useRouter();
    const handleLogout=async()=>{
        try {
            const user = await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')

        } catch (error: any) {
            toast.error(error.message); 
        }
    }

  return (
    <div>
        <h1>Chat Room</h1>
        <button className='border border-black mt-5' onClick={handleLogout}>logout</button>
    </div>
  )
}
