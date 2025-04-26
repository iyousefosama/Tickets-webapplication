import React from 'react'
import { Button } from '../ui/button'
import CreateTicket from '../actions/CreateTicket';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='bg-background text-foreground dark flex flex-col items-center justify-center p-4 min-h-[calc(100vh-68px)]'>
      <h1 className='text-4xl font-bold text-center'>Welcome to the Ticket App</h1>
      <p className='text-center mt-4'>Manage your tickets efficiently and effectively.</p>
      <div className='flex justify-center mt-6 space-x-5'>
        <CreateTicket component={<Button>Get Started</Button>} />
        <Link href={"/view-tickets"} passHref>
          <Button variant={"outline"}>View Tickets</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero