'use client'
import './globals.css'
import { Inter } from 'next/font/google'
// import Navbar from '../components/navbar'
import Navb from '../app/navb/page'
import Footer from '../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Authprovider } from '@/context/auth';
import { SearchProvider } from '@/context/search'
import { CartProvider } from '@/context/cart'
const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

function RootLayout({ children }) {
  return (
    <Authprovider>
    <SearchProvider >
    <CartProvider>
    <html lang="en">
           <body className={inter.className}>
        {/* <Navbar/> */}
        <Navb/>
        <ToastContainer />
        {children}
        <Footer/>
        </body>
    </html>
    </CartProvider>
    </SearchProvider>
    </Authprovider>
  )
}
export default RootLayout