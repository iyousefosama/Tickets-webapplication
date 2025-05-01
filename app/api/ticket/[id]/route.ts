import { NextResponse, type NextRequest } from "next/server";
import connect from "@/lib/db";
import Tickets from "@/lib/models/tickets";
const ObjectId = require("mongoose").Types.ObjectId;

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connect();

        const { id } = await params;

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ message: "💢 Invalid ticket id." }, { status: 400 });
        }

        const ticket = await Tickets.findByIdAndDelete(id);

        if (!ticket) {
            return NextResponse.json({ message: "💢 Ticket not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "✅ The ticket was deleted successfully!" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "💢 There was an error while deleting the ticket." }, { status: 500 });
    }
};

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connect();

        const { id } = await params;

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