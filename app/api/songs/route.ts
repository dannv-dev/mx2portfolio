import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// GET /api/songs - Fetch all songs
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Check if user is authenticated for admin access
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    const { data: allSongs } = await supabase.from("songs").select("*").order("display_order")
    console.log("[v0] All songs in database:", allSongs)
    console.log("[v0] User authenticated:", !!user)

    let query = supabase.from("songs").select("*").order("display_order")

    // If not authenticated, only return active songs
    if (authError || !user) {
      query = query.eq("is_active", true)
      console.log("[v0] Filtering for active songs only")
    } else {
      console.log("[v0] Returning all songs (authenticated)")
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Fetched songs from database:", data)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/songs - Create new song
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, artist, spotify_embed_url, display_order } = body

    // Validate required fields
    if (!title || !spotify_embed_url) {
      return NextResponse.json({ error: "Title and Spotify URL are required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("songs")
      .insert([
        {
          title,
          artist: artist || "MX2Twins",
          spotify_embed_url,
          display_order: display_order || 0,
          is_active: true,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
