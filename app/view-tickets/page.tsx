import React from 'react'
import TicketsList from '@/components/parts/TicketsList';

const page = async () => {
  return (
    <div className='min-h-screen bg-background text-foreground dark p-4'>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-10 uppercase">
        🎫 Tickets
      </h2>
      <TicketsList />
    </div>
  )
}

export default page