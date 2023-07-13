"use client"
import React, { useState ,useEffect } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast";

export default function ChatRoom() {
    const [userData,setUserData]:any = useState({})
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

    const getUser = async()=>{
        try {
            const user = await axios.get('/api/users/profile')
            console.log(user.data.data)
            setUserData(user.data)
        } catch (error: any) {
            toast.error(error.message); 
        }
    }
    useEffect(()=>{
        getUser()
    },[]);

  return (
    <div>
        <h1>Chat Room</h1>
        <button className='border border-black mt-5' onClick={handleLogout}>logout</button>
       {userData && <h2>{userData.data?.username}</h2>}
    </div>
  )
}
