"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast";
import axios from "axios"

export default function SignUp() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    })
    const router = useRouter();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/users/signup", user);
            console.log("resClient: ",response);
            router.push('/verifyemail')
        } catch (error: any) {
            toast.error(error.message);
        }
    }
    return (
        <div className='w-100 flex flex-col gap-5 justify-center items-center mt-20'>
            <h1>SignUp</h1>
            <hr />
            <form onSubmit={onSubmit} className='w-48 flex flex-col gap-5'>
                <label htmlFor="name">User Name:</label>
                <input type="text" className='border border-black' value={user.username} onChange={(e) => {
                    setUser({ ...user, username: e.target.value })
                }}
                    placeholder='User Name' />
                <label htmlFor="email">Email:</label>
                <input type="email" className='border border-black' value={user.email} onChange={(e) => {
                    setUser({ ...user, email: e.target.value })
                }}
                    placeholder='Email' />
                <label htmlFor="password">Password:</label>
                <input type="password" className='border border-black' value={user.password} onChange={(e) => {
                    setUser({ ...user, password: e.target.value })

                }}
                    placeholder='Password' />
                <button className='border border-black mx-5'>SignUp</button>
            </form>
            <Link href='/login'>go to login</Link>
        </div>
    )
}
