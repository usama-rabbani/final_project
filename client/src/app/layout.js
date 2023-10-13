'use client'
import './globals.css'
import { Inter } from 'next/font/google'
// import Navbar from '../components/navbar'
import Navb from '../app/navb/page'
import Footer from '../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Authprovider } from '@/context/auth';
const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

function RootLayout({ children }) {
  return (
    <Authprovider>
    <html lang="en">
           <body className={inter.className}>
        {/* <Navbar/> */}
        <Navb/>
        <ToastContainer />
        {children}
        <Footer/>
        </body>
    </html>
    </Authprovider>
  )
}
export default RootLayout