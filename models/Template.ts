import { Schema, model, models, type Model } from "mongoose";

export type TemplateDocument = {
    name: string;
    category: string;
    previewImage?: string;
    colorVariants: string[];
    defaultData: Record<string, unknown>;
};

const TemplateSchema = new Schema<TemplateDocument>(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        previewImage: { type: String },
        colorVariants: { type: [String], default: [] },
        defaultData: { type: Schema.Types.Mixed, default: {} },
    },
    { timestamps: true }
);

export const Template: Model<TemplateDocument> =
    models.Template || model<TemplateDocument>("Template", TemplateSchema);
