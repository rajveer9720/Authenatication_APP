'use client'

import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function verifyEmail(){
  const [token, setToken] = useState("")
  const [verified,setVerified] = useState(false)
  const [error, setError] = useState(false)
  // const router  = useRouter()
  const verifyEmail =async()=>{
      try {
          await axios.post("/api/users/verifyEmail",{token})
          setVerified(true)
      } catch (error:any) {
        setError(true)  
        console.log(error.response.data)
        
      }
    }
    useEffect(()=>{
      setError(false)
       const urlToken = window.location.search.split("=")[1]
       setToken(urlToken || "")

      //  const {query} = router
      //  const urlTokenN = query.token 
    
    })
    useEffect(()=>{
      setError(false)
        if(token.length>0){
            verifyEmail()
        }
    },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen  py-4'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='p-2 bg-white text-black'>{token ?`${token}`:"No Token"}</h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login"></Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
          
        </div>
      )}
    </div>
  )
}


