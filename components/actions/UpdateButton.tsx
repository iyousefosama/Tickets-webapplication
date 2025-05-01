"use client";

import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { ticketsAtom } from '@/utils/atoms';
import { useAtom } from 'jotai';
import { ticket } from '@/utils/types';

const UpdateButton = ({ ticket }: { ticket: ticket}) => {
    const [tickets, setTickets] = useAtom(ticketsAtom);

    const onUpdate = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/ticket/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: tickets.find((ticket: ticket) => ticket._id === id)?.status === "open" ? "closed" : "open",
                }),
            });
            if (res.ok) {
                const data = await res.json();
                setTickets((prev) => prev.map((ticket: ticket) => ticket._id === id ? { ...ticket, status: data.ticket.status } : ticket));
            } else {
                console.error("Failed to update ticket");
            }
            
        } catch (error) {
            console.error("Error updating ticket:", error);
        }

    }
  return (
    <Button onClick={() => onUpdate(ticket._id)} variant={"secondary"}>
        <FaRegEdit className='inline-block mr-2'/> Change Status
    </Button>
  )
}

export default UpdateButton