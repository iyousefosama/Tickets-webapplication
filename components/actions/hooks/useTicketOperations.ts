import { useAtom } from 'jotai';
import { ticketsAtom } from '@/utils/atoms';
import { ticket } from '@/utils/types';
import { useSession } from 'next-auth/react';

export const useTicketOperations = () => {
    const [tickets, setTickets] = useAtom(ticketsAtom);
    const { data: session } = useSession();

    const deleteTicket = async (id: string) => {
        try {
            const res = await fetch(`/api/ticket/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            
            if (!res.ok) throw new Error("Failed to delete ticket");
            setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    const updateTicketStatus = async (id: string) => {
        try {
            const currentTicket = tickets.find((t: ticket) => t._id === id);
            if (!currentTicket) throw new Error("Ticket not found");

            const res = await fetch(`/api/ticket/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: currentTicket.status === "open" ? "closed" : "open",
                }),
            });

            if (!res.ok) throw new Error("Failed to update ticket");

            const data = await res.json();
            setTickets((prev) => 
                prev.map((t: ticket) => 
                    t._id === id ? { ...t, status: data.ticket.status } : t
                )
            );
        } catch (error) {
            console.error("Error updating ticket:", error);
        }
    };

    const isUserAuthorized = (ticketEmail: string) => {
        // If no session, user is not authorized
        if (!session?.user?.email) return false;
        
        // If user is admin, they are authorized
        if (session.user.email === process.env.ADMIN_EMAIL) return true;
        
        // If user is the ticket owner, they are authorized
        return session.user.email === ticketEmail;
    };

    const isAdmin = () => {
        return session?.user?.email === process.env.ADMIN_EMAIL;
    };

    return {
        tickets,
        session,
        deleteTicket,
        updateTicketStatus,
        isUserAuthorized,
        isAdmin
    };
}; 