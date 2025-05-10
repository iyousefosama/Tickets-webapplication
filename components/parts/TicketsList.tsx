"use client";

import React, { useEffect } from 'react'
import UpdateButton from '../actions/UpdateButton';
import DeleteButton from '@/components/actions/DeleteButton';
import { ticketsAtom } from '@/utils/atoms';
import { useAtom } from 'jotai';
import { ticket } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { useTicketOperations } from '../actions/hooks/useTicketOperations';

const TicketCard = ({ ticket }: { ticket: ticket }) => {
    const { isUserAuthorized, isAdmin } = useTicketOperations();
    const canEdit = isUserAuthorized(ticket.email);
    const admin = isAdmin();

    return (
        <div className='bg-card p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-bold'>{ticket.title}</h2>
            <blockquote className="my-6 border-l-2 pl-6 italic">
                {ticket.description}
            </blockquote>
            <div className="space-y-2">
                <p className='text-sm text-gray-500'>Created by: {ticket.username}</p>
                <p className='text-sm text-gray-500'>Created at: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                <p className='text-sm text-gray-500'>
                    Status: {ticket.status === "open" ? (
                        <span className='text-green-500 font-semibold'>Open</span>
                    ) : (
                        <span className='text-red-500 font-semibold'>Closed</span>
                    )}
                </p>
                {(canEdit || admin) && (
                    <div className='flex justify-end gap-4 mt-4 pt-4 border-t'>
                        <UpdateButton ticket={ticket} />
                        <DeleteButton ticket={ticket} />
                    </div>
                )}
            </div>
        </div>
    );
};

const TicketsList = () => {
    const [tickets, setTickets] = useAtom(ticketsAtom);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchTickets = async() => {
            const res = await fetch('/api/ticket');
            const data = await res.json();
            setTickets(data);
        }
        fetchTickets();
    }, [setTickets]);

    if (!session?.user) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-semibold mb-4">Please sign in to view tickets</h2>
                <p className="text-gray-500">You need to be signed in to view and manage tickets.</p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {tickets.map((ticket: ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
            ))}
        </div>
    );
}

export default TicketsList;