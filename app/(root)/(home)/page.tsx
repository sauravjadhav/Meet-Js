import React, { useState, useEffect } from 'react';
import CallList from '@/components/ui/CallList';
import MeetingTypeList from '@/components/ui/MeetingTypeList';
import Link from 'next/link';

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
  const [date, setDate] = useState((new Intl.DateTimeFormat("en-IN", { dateStyle: 'full' })).format(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
      setDate((new Intl.DateTimeFormat("en-IN", { dateStyle: 'full' })).format(now));
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>
       
      <MeetingTypeList />
      
      <h1 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meetings</h1>
      <CallList type="upcoming"/>
    </section>
  );
}

export default Home;
