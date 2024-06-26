import React, {  ReactNode } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Meet Js | Made by Saurav Jadhav",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
};

const HomeLayout = ({children}: {children: ReactNode} ) => {
  return (
    <main className='relative'>
        <Navbar />
        <div className='flex'>
            <Sidebar />

            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pd-14 sm:px-14'>
                <div className='w-full'>
                    {children}  
                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout