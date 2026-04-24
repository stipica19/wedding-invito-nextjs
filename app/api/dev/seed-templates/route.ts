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
      {
        name: "Botanic Minimal",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "botanic",
          title: "Olivia & Taylor",
          couple: "Olivia & Taylor",
          datetime: "AT 3PM, 30TH OCTOBER 2026",
          venue: "Anywhere Hotel",
          address: "123 Anywhere Street., Any City",
          subtitle: "REQUEST THE PLEASURE OF YOUR COMPANY\nAT THEIR WEDDING CELEBRATION",
          note: "Reception to Follow",
        },
      },
      {
        name: "White Floral",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "whiteFloral",
          title: "Daniel & Marceline",
          name1: "Daniel Olivia",
          name2: "Marceline Wilson",
          inviteTitle: "You Are Invited To",
          inviteSub: "The Wedding Of",
          month: "DECEMBER",
          dayOfWeek: "SATURDAY",
          dayNumber: "14",
          time: "AT 07:00 PM",
          year: "2030",
          address: "123 Anywhere St., Any City, ST 12345",
          reception: "Reception to follow",
        },
      },
      {
        name: "Golden Leaf",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "goldenLeaf",
          title: "Olivia & Daniel",
          couple: "Olivia & Daniel",
          subtitle: "with full hearts, joyfully invite you to their wedding",
          month: "AUGUST",
          dayOfWeek: "SATURDAY",
          dayNumber: "30",
          time: "8:30PM",
          year: "2032",
          address: "123 Anywhere St., Any City",
          reception: "reception to follow",
          rsvpDeadline: "01. 08. 2032.",
        },
      },
      {
        name: "Classic Floral",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "classicFloral",
          title: "Maria & Michael",
          couple: "Maria & Michael",
          month: "AUGUST",
          dayOfWeek: "SUNDAY",
          dayNumber: "19",
          timeOfDay: "AT 2 PM",
          year: "2023",
          address: "123 Anywhere St., Any City",
          rsvpDeadline: "01. 08. 2023.",
          note: "Veselimo se Vašem dolasku!",
        },
      },
      {
        name: "Monogram Classic",
        category: "Wedding",
        previewImage: "",
        colorVariants: ["default"],
        defaultData: {
          layout: "monogram",
          title: "Harumi & Morgan",
          couple: "Harumi & Morgan",
          dayOfWeek: "FRIDAY",
          month: "JUNE",
          day: "29",
          year: "2023",
          time: "AT 5 PM",
          venue: "AT SALFORD PARK",
          address: "123 Anywhere St., Any City, ST 12345",
          rsvpDate: "May 29 2023",
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