'use client'

import React,{ useState} from 'react'

import { useauth } from '../../context/auth'


function user() {
  const { auth }  = useauth( );
 
  return (

   
    <>

    <div>
      <h1>This is Dashboard</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    

    </div>
    </>
  )
}

export default user;

//usamarabbani@gmail.com