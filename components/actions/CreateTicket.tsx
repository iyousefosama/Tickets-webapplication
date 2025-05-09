"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import { useAtom } from 'jotai'
import { ticketsAtom } from '@/utils/atoms'
import { useSession } from 'next-auth/react'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
})

const CreateTicket = ({ component }: { component: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [dialogKey, setDialogKey] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tickets, setTickets] = useAtom(ticketsAtom)
  const { data: session } = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const createTicket = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user) {
      console.warn("You must be logged in to submit a ticket.")
      return
    }

    const ticketData = {
      username: session.user.name,
      email: session.user.email,
      title: values.title,
      description: values.description,
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('http://localhost:3000/api/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      })

      if (!res.ok) {
        throw new Error("Failed to create ticket.")
      }

      const data = await res.json()
      setTickets((prev) => [...prev, data.ticket])
      form.reset()
      setOpen(false)
      setDialogKey((prev) => prev + 1)
      // toast.success("Ticket submitted successfully!")
    } catch (error) {
      console.error("Error creating ticket:", error)
      // toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createTicket(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent key={dialogKey} className="dark text-foreground">
        <DialogHeader>
          <DialogTitle>🎫 Submit a new ticket!</DialogTitle>
          <DialogDescription>
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTicket
