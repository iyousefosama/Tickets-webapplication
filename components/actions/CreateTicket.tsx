"use client"

import React, { useRef, useEffect } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTicketForm } from './hooks/useTicketForm';
import { useSession } from 'next-auth/react';

const TicketForm = ({ form, onSubmit, isSubmitting }: any) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Ticket title" {...field} />
            </FormControl>
            <FormDescription>
              The title of your ticket.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Ticket's detailed description" {...field} />
            </FormControl>
            <FormDescription>
              A detailed description of your ticket.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  </Form>
);

const CreateTicket = ({ component }: { component: React.ReactNode }) => {
  const { open, setOpen, dialogKey, isSubmitting, form, createTicket } = useTicketForm();
  const { data: session } = useSession();
  const isEmojiPickerOpen = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '.' && e.metaKey) {
        isEmojiPickerOpen.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === '.' && e.metaKey) {
        isEmojiPickerOpen.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    if (!session?.user && newOpen) {
      // Prevent opening if not logged in
      return;
    }
    
    // Don't close if emoji picker is open
    if (!newOpen && isEmojiPickerOpen.current) {
      return;
    }
    
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {component}
      </DialogTrigger>
      <DialogContent key={dialogKey} className="dark text-foreground">
        <DialogHeader>
          <DialogTitle>🎫 Submit a new ticket!</DialogTitle>
          <DialogDescription>
            <TicketForm 
              form={form} 
              onSubmit={createTicket} 
              isSubmitting={isSubmitting} 
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTicket;
