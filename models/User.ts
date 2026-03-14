import { Schema, model, models, type Model } from "mongoose";

export type UserRole = "user" | "admin";

export type UserDocument = {
    email: string;
    passwordHash: string;
    role: UserRole;
};

const UserSchema = new Schema<UserDocument>(
    {
        email: { type: String, required: true, unique: true, trim: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

export const User: Model<UserDocument> =
    models.User || model<UserDocument>("User", UserSchema);
