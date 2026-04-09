import { Schema, model, models, type Model, Types } from "mongoose";

export type InvitationStatus = "draft" | "published" | "pending";

export type InvitationDocument = {
  ownerId: Types.ObjectId;
  templateId: Types.ObjectId;
  slug: string;
  status: InvitationStatus;
  data: Record<string, unknown>;
  selectedColor?: string;
};

const InvitationSchema = new Schema<InvitationDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    templateId: { type: Schema.Types.ObjectId, ref: "Template", required: true },
    slug: { type: String, required: true, unique: true, trim: true },
    status: {
      type: String,
      enum: ["draft", "published", "pending"],
      default: "draft",
    },
    data: { type: Schema.Types.Mixed, default: {} },
    selectedColor: { type: String },
  },
  { timestamps: true }
);

export const Invitation: Model<InvitationDocument> =
  models.Invitation || model<InvitationDocument>("Invitation", InvitationSchema);
