import { NextResponse, type NextRequest } from "next/server";
import connect from "@/lib/db";
import Tickets from "@/lib/models/tickets";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // change path as needed
import mongoose from "mongoose";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "💢 Invalid ticket id." },
        { status: 400 }
      );
    }

    const ticket = await Tickets.findById(id);

    if (!ticket) {
      return NextResponse.json(
        { message: "💢 Ticket not found." },
        { status: 404 }
      );
    }

    if (
      ticket.email !== session.user.email &&
      session.user.email == process.env.ADMIN_EMAIL
    ) {
      return NextResponse.json(
        { message: "❌ You do not have permission to delete this ticket." },
        { status: 403 }
      );
    }

    await ticket.deleteOne();

    return NextResponse.json(
      { message: "✅ The ticket was deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "💢 There was an error while deleting the ticket." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "💢 Invalid ticket id." },
        { status: 400 }
      );
    }
    const body = await request.json();

    const ticket = await Tickets.findByIdAndUpdate(id, body, { new: true });

    if (!ticket) {
      return NextResponse.json(
        { message: "💢 Ticket not found." },
        { status: 404 }
      );
    }

    if (
      ticket.email !== session.user.email &&
      session.user.email == process.env.ADMIN_EMAIL
    ) {
      return NextResponse.json(
        { message: "❌ You do not have permission to delete this ticket." },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { ticket, message: "✅ The ticket was updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "💢 Their was an error while patching the ticket." },
      { status: 500 }
    );
  }
}
