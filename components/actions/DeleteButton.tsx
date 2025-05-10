"use client";

import React from 'react'
import { Button } from '../ui/button';
import { MdDelete } from "react-icons/md";
import { ticket } from '@/utils/types';
import { useTicketOperations } from './hooks/useTicketOperations';

const DeleteButton = ({ ticket }: { ticket: ticket}) => {
    const { deleteTicket, isUserAuthorized } = useTicketOperations();

    return (
        <Button 
            variant={"destructive"} 
            className='hover:bg-red-300 hover:scale-105' 
            onClick={() => deleteTicket(ticket._id)} 
            disabled={!isUserAuthorized(ticket.email)}
        >
            <MdDelete className='inline-block mr-2' /> Delete
        </Button>
    )
}

export default DeleteButton;