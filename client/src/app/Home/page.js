
import React  from 'react'
import Filters from './filters'
import SeoMeta from '@/components/seo';
function page() {

  return (
    <>
    
    <SeoMeta title="Home" description="Home" url="/" />
    <main className='mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 mt-8'>
 
   <Filters/>
 
    </main>
    </>
  )
}

export default page
