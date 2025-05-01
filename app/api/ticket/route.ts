import { NextResponse, type NextRequest } from "next/server";
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

export async function POST(request: NextRequest) {
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
};