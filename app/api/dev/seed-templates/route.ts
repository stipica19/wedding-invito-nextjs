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
        name: "Golden Elegance",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "elegance",
          title: "Mia & Tomislav",
          couple: "Mia & Tomislav",
          date: "19. kolovoza 2023. godine",
          time: "17:00",
          venue: "Crkva sv. Ante, Zadar",
          address: "Restoran More",
          rsvpDeadline: "01. 08. 2023.",
          note: "Veselimo se Vašem dolasku!",
        },
      },
      {
        name: "Luxe Minimalist",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "luxe",
          title: "Isabella & Alexander",
          couple: "Isabella & Alexander",
          date: "Saturday, the Fourteenth of June",
          year: "Two Thousand and Twenty-Six",
          time: "17:00",
          venue: "Grand Hotel Excelsior",
          address: "Obala Kneza Domagoja 1, Split",
          reception: "Reception to follow at the venue",
          rsvpDeadline: "01. lipnja 2026.",
          note: "Black tie preferred.",
        },
      },
      {
        name: "Watercolor Floral",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "watercolor",
          title: "Sophia & William",
          couple: "Sophia & William",
          tagline: "Together with their families",
          date: "Saturday, June 14th, 2026",
          time: "17:00",
          venue: "Villa Rosmarino, Dubrovnik",
          address: "Lapadska obala 35, Dubrovnik",
          reception: "Dinner & dancing to follow",
          rsvpDeadline: "01. lipnja 2026.",
          note: "Semi-formal attire requested.",
        },
      },
      {
        name: "Floral Illustration",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "floral",
          title: "Emma & Oliver",
          couple: "Emma & Oliver",
          intro: "joyfully invite you to celebrate",
          date: "14. lipnja 2026.",
          time: "17:00",
          venue: "Botanički vrt, Zagreb",
          address: "Ilica 10, Zagreb",
          reception: "Dinner & dancing to follow",
          rsvpDeadline: "01. lipnja 2026.",
          note: "Garden attire encouraged.",
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