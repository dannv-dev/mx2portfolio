import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// GET /api/images - Fetch all images
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Check if user is authenticated for admin access
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    const { searchParams } = new URL(request.url)
    const section = searchParams.get("section")

    let query = supabase.from("images").select("*").order("section, display_order")

    // If not authenticated, only return active images
    if (authError || !user) {
      query = query.eq("is_active", true)
    }

    // Filter by section if provided
    if (section) {
      query = query.eq("section", section)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/images - Create new image
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
    const { title, image_url, alt_text, section, display_order } = body

    // Validate required fields
    if (!title || !image_url || !section) {
      return NextResponse.json({ error: "Title, image URL, and section are required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("images")
      .insert([
        {
          title,
          image_url,
          alt_text: alt_text || "",
          section,
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
