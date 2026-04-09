import { Schema, model, models, type Model, Types } from "mongoose";

export type RSVPStatus = "yes" | "no" | "maybe";

export type RSVPDocument = {
  invitationId: Types.ObjectId; // bitno: Types.ObjectId
  name: string;
  attending: RSVPStatus;
  guestsCount: number;
  message?: string;
};

const RSVPSchema = new Schema<RSVPDocument>(
  {
    invitationId: {
      type: Schema.Types.ObjectId, // ovdje ostaje Schema.Types.ObjectId
      ref: "Invitation",
      required: true,
    },
    name: { type: String, required: true },
    attending: {
      type: String,
      enum: ["yes", "no", "maybe"],
      required: true,
    },
    guestsCount: { type: Number, default: 0 },
    message: { type: String },
  },
  { timestamps: true }
);

export const RSVP: Model<RSVPDocument> =
  models.RSVP || model<RSVPDocument>("RSVP", RSVPSchema);