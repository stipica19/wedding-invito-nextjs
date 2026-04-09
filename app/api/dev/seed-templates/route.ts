import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/Template";

export async function GET() {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ message: "Not allowed in production" }, { status: 403 });
    }

    await connectToDatabase();

    const templateSeeds = [
      {
        name: "Classic Wedding",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default", "gold", "ivory"],
        defaultData: {
          layout: "classic",
          title: "Ana i Marko",
          subtitle: "Zajedno slavimo nas poseban dan",
          date: "12 June 2026",
          time: "17:00",
          location: "Sarajevo",
          hosts: "Porodice Horvat i Kovac",
          dressCode: "Elegantno",
          note: "Molimo potvrdu dolaska do 1.6.2026.",
        },
      },
      {
        name: "Garden Romance",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["rose", "ivory", "default"],
        defaultData: {
          layout: "garden",
          title: "Miro i Slava",
          subtitle: "Vecer ljubavi pod zvijezdama",
          date: "05 August 2026",
          time: "18:30",
          location: "Vrt Villa Green, Mostar",
          hosts: "Obitelj Bolic",
          dressCode: "Pastel chic",
          note: "Dodite ranije na koktel dobrodoslice.",
        },
      },
      {
        name: "Modern Minimal",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default", "ivory", "gold"],
        defaultData: {
          layout: "modern",
          title: "Lea i Ivan",
          subtitle: "Minimalno, elegantno, nase",
          date: "20 September 2026",
          time: "16:00",
          location: "Art Hall Zagreb",
          hosts: "Lea, Ivan i prijatelji",
          dressCode: "Black tie optional",
          note: "Veselimo se zajednickoj proslavi.",
        },
      },
    ] as const;

    const results = await Promise.all(
      templateSeeds.map(async (seed) => {
        const updated = await Template.findOneAndUpdate(
          { name: seed.name },
          { $set: seed },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        ).lean();

        return {
          id: updated ? String(updated._id) : "",
          name: seed.name,
        };
      })
    );

    return NextResponse.json({
      ok: true,
      message: "Templates seeded",
      data: results,
    });
  } catch (error) {
    console.error("Seed template error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}