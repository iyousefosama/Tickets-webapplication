"use client";

import React from 'react'
import { Button } from '../ui/button';
import { MdDelete } from "react-icons/md";
import { ticket } from '@/utils/types';
import { useAtom } from 'jotai';
import { ticketsAtom } from '@/utils/atoms';
import { useSession } from 'next-auth/react';

const DeleteButton = ({ ticket }: { ticket: ticket}) => {
    const [tickets, setTickets] = useAtom(ticketsAtom);
    const { data: session } = useSession();

    const onDelete = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/ticket/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
            } else {
                console.error("Failed to delete ticket");
            }
            
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }

    }

    return (
        <Button variant={"destructive"} className='hover:bg-red-300 hover:scale-105' onClick={() => onDelete(ticket._id)} disabled={session?.user?.email !== ticket.email && session?.user?.email == process.env.ADMIN_EMAIL}>
            <MdDelete className='inline-block mr-2' /> Delete
        </Button>
    )
}

export default DeleteButton;