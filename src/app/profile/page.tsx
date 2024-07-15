'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function ProfilePage () {
    const router = useRouter()
    const[data, setData] =useState("nothing")

    const getUserDetail = async()=>{
      try {
       const res =  await axios.post("/api/users/me")
        console.log(res.data.data._id)
        setData(res.data.data._id)

        
      } catch (error:any) {
        console.log(error)
        toast.error(error.message
        )
        
      }
    }
  
    const logout = async()=>{
        
          try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successfully")
            router.push("/login")

        }catch (error:any) {
          console.log(error)
          toast.error(error.message
          )
      }
    }
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py2'>

      <h1>Profile Page</h1>
      <hr />
      <h2>{data === "nothing" ? "Nothing" : <Link href={`profile/ ${data}`}>Test{data}</Link>}</h2>
      <hr />
      <button className='bg-blue-500 text-white text-center p-2 hover:bg-blue-950 rounded-lg shadow-md mt-3 hover:shadow-xl' onClick={logout}>logout</button>
      <button className='bg-green-900 mt-3 text-white text-center p-2 hover:bg-blue-950 rounded-lg shadow-md hover:shadow-xl' onClick={getUserDetail}>GetUserDetails</button>

    </div>
  )
}

