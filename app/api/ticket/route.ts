import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Tickets from "@/lib/models/tickets";
const ObjectId = require("mongoose").Types.ObjectId;

export async function GET() {
    try {
        // Connects first to mongodb server if not connected.
        await connect();
        const tickets = await Tickets.find();

        return NextResponse.json(tickets);
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "💢 Their was an error while fetching tickets."}, { status: 500})
    }
};

export async function POST(request: Request) {
    /**
     * Ticket data should be
     * username: string
     * title: string
     * description: string
     */
    try {
        await connect();

        const body = await request.json();

        const ticket = await new Tickets(body).save();

        return NextResponse.json({ ticket, message: "✅ The ticket was created successfully!"}, { status: 200 })
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "💢 Their was an error while creating the ticket."}, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        await connect();

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("ticketId");

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ message: "💢 Invalid ticket id."}, { status: 400 })
        };

        const ticket = await Tickets.findByIdAndDelete(id);

        if (!ticket) {
            return NextResponse.json({ message: "💢 Ticket not found."}, { status: 404 })
        }

        return NextResponse.json({ message: "✅ The ticket was deleted successfully!"}, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: "💢 Their was an error while deleting the ticket."}, { status: 500 })
    }
};

export async function PATCH(request: Request) {
    try {
        await connect();

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("ticketId");

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ message: "💢 Invalid ticket id."}, { status: 400 })
        };
        const body = await request.json();

        const ticket = await Tickets.findByIdAndUpdate(id, body, { new: true });

        if (!ticket) {
            return NextResponse.json({ message: "💢 Ticket not found."}, { status: 404 })
        }

        return NextResponse.json({ ticket, message: "✅ The ticket was updated successfully!"}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "💢 Their was an error while patching the ticket."}, { status: 500 })

    }
}