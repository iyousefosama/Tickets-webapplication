"use client";

import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { ticket } from '@/utils/types';
import { useTicketOperations } from './hooks/useTicketOperations';

const UpdateButton = ({ ticket }: { ticket: ticket}) => {
    const { updateTicketStatus, isUserAuthorized } = useTicketOperations();

    return (
        <Button 
            onClick={() => updateTicketStatus(ticket._id)} 
            variant={"secondary"} 
            disabled={!isUserAuthorized(ticket.email)} 
            className='hover:bg-blue-300 hover:scale-105'
        >
            <FaRegEdit className='inline-block mr-2'/> Change Status
        </Button>
    )
}

export default UpdateButton;