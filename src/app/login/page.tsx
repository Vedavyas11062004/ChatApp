"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const onSubmit = () => {
  }
  return (
    <div className='w-100 flex flex-col gap-5 justify-center items-center mt-20'>
      <h1>Login</h1>
      <hr />
      <form onSubmit={onSubmit} className='w-48 flex flex-col gap-5'>
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
        <button className='border border-black mx-5'>Login</button>
      </form>
      <Link href='/signup'>go to SignUp</Link>
    </div>
  )
}
