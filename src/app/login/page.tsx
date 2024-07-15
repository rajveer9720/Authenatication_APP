"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
 import {toast} from "react-hot-toast"
 import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState ({
  email:"",
  password:"" ,


  })
  const [disableButton, setDisableButton]= useState(false)
  const[loading , setloading] = useState(false)
  const onLogin = async() =>{
  try {
    setloading(true)
    const response = axios.post("/api/users/login",user)
    console.log("Login  Succesfilly",(await response).data)
    router.push('/profile')
    setDisableButton(true)
    
    
  } catch (error:any) {
    console.log("Signup Failed")
    toast.error(error.message)
    
  }
  }
  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 ){
      setDisableButton(false)
    }else{
      setDisableButton(true)
    }
  },[user])
   return(
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className="top-2 py-8">{loading? "Processing":"SIGNUP"}</h1>
      <hr />
     

    
      <label className="py-4" htmlFor="email">Email</label>
      <input className='p-2 rounded-md  text-black' id="email" value={user.email} onChange =
      {(e)=>setUser({...user,email:e.target.value})}
      type="text" placeholder='email' />

 
      <label className="py-4" htmlFor="password">Password</label>
      <input className='p-2 rounded-md  text-black' id="password" value={user.password} onChange =
      {(e)=>setUser({...user,password:e.target.value})}
      type="text" placeholder='Enter Your Password' />
      <button onClick={onLogin}

      className=" p-2 border  border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 ">{disableButton ? "No Login":"Login Form"}</button>
      <Link className="bg-white rounded-lg shadow-2xl text-black px-2 py-2 mx-2" href={"/signup"}>Visit Signup Page</Link>
    </div>

 )
}


