"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SongsManager from "./songs-manager"
import ImagesManager from "./images-manager"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MX2Twins Admin Dashboard</h1>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="songs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="songs" className="data-[state=active]:bg-gray-700">
              <i className="fas fa-music mr-2"></i>
              Manage Songs
            </TabsTrigger>
            <TabsTrigger value="images" className="data-[state=active]:bg-gray-700">
              <i className="fas fa-images mr-2"></i>
              Manage Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value="songs" className="mt-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Songs Management</CardTitle>
              </CardHeader>
              <CardContent>
                <SongsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Images Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ImagesManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
