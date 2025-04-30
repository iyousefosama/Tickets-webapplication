import { Schema, model, models } from "mongoose";

const ticketSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["open", "closed"],
            default: "open",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Ticket = models.Ticket || model("Ticket", ticketSchema);
export default Ticket;