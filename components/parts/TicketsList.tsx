"use client";

import React, { useEffect } from 'react'
import UpdateButton from '../actions/UpdateButton';
import DeleteButton from '@/components/actions/DeleteButton';
import { ticketsAtom } from '@/utils/atoms';
import { useAtom } from 'jotai';
import { ticket } from '@/utils/types';

const TicketsList = () => {

    const [tickets, setTickets] = useAtom(ticketsAtom);

    useEffect(() => {
        const fetchTickets = async() => {
            const res = await fetch('/api/ticket');
            const data = await res.json();
            setTickets(data);
        }
        fetchTickets();
    }
    , [setTickets]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {tickets.map((ticket: ticket) => (
                <div key={ticket._id} className='bg-card p-4 rounded-lg shadow-md'>
                    <h2 className='text-xl font-bold'>{ticket.title}</h2>
                    <blockquote className="my-6 border-l-2 pl-6 italic">
                        {ticket.description}
                    </blockquote>
                    <p className='text-sm text-gray-500'>Created by: {ticket.username}</p>
                    <p className='text-sm text-gray-500'>Created at: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                    <p className='text-sm text-gray-500'>Status: {ticket.status == "open" ? (<span className='text-green-500'>Open</span>) : <span className='text-red-500'>Closed</span>}</p>
                    <div className='flex justify-end float-right mt-2 gap-4'>
                        <UpdateButton ticket={ticket} />
                        <DeleteButton ticket={ticket} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TicketsList