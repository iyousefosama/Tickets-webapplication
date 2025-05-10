import { useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAtom } from 'jotai';
import { ticketsAtom } from '@/utils/atoms';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(50, "Title must be less than 50 characters"),
    description: z.string().min(2, "Description must be at least 2 characters").max(500, "Description must be less than 500 characters"),
});

type FormData = z.infer<typeof formSchema>;

export const useTicketForm = () => {
    const [open, setOpen] = useState(false);
    const [dialogKey, setDialogKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tickets, setTickets] = useAtom(ticketsAtom);
    const { data: session } = useSession();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const handleOpenChange = useCallback((newOpen: boolean) => {
        if (!newOpen) {
            // Reset form and increment dialog key when closing
            form.reset();
            setDialogKey(prev => prev + 1);
        }
        setOpen(newOpen);
    }, [form]);

    const createTicket = async (values: FormData) => {
        if (!session?.user) {
            console.warn("You must be logged in to submit a ticket.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: session.user.name,
                    email: session.user.email,
                    ...values,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Failed to create ticket");
            }

            const data = await res.json();
            setTickets((prev) => [...prev, data.ticket]);
            form.reset();
            handleOpenChange(false);
        } catch (error) {
            console.error("Error creating ticket:", error);
            // You might want to show an error toast here
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        open,
        setOpen: handleOpenChange,
        dialogKey,
        isSubmitting,
        form,
        createTicket,
    };
}; 