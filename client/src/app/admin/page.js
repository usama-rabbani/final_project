import React from 'react'
import SeoMeta from '@/components/seo';
import Dashboard from './dashboard'
function Admin() {
  return (
    <>
    <SeoMeta title="Admin Dashboard" description="Admin" url="" />

  <main className=''>
    <Dashboard/>
  </main>
  
   
  </>
  )
}

export default Admin