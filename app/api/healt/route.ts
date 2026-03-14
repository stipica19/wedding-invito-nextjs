import { connectToDatabase } from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET() {
    try {
        await connectToDatabase()

        return NextResponse.json({
            status: "ok",
            database: "connected",
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error("Health check error:", error)

        return NextResponse.json(
            {
                status: "error",
                database: "disconnected",
            },
            { status: 500 }
        )
    }
}