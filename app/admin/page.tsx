import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
