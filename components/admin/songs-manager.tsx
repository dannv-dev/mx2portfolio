"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase/client"

interface Song {
  id: string
  title: string
  artist: string
  spotify_embed_url: string
  display_order: number
  is_active: boolean
}

export default function SongsManager() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSong, setEditingSong] = useState<Song | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    artist: "MX2Twins",
    spotify_embed_url: "",
    display_order: 0,
  })

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    try {
      const { data, error } = await supabase.from("songs").select("*").order("display_order")

      if (error) throw error
      setSongs(data || [])
    } catch (error) {
      console.error("Error fetching songs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingSong) {
        const { error } = await supabase.from("songs").update(formData).eq("id", editingSong.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("songs").insert([formData])

        if (error) throw error
      }

      await fetchSongs()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error saving song:", error)
    }
  }

  const handleEdit = (song: Song) => {
    setEditingSong(song)
    setFormData({
      title: song.title,
      artist: song.artist,
      spotify_embed_url: song.spotify_embed_url,
      display_order: song.display_order,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this song?")) {
      try {
        const { error } = await supabase.from("songs").delete().eq("id", id)

        if (error) throw error
        await fetchSongs()
      } catch (error) {
        console.error("Error deleting song:", error)
      }
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase.from("songs").update({ is_active: !isActive }).eq("id", id)

      if (error) throw error
      await fetchSongs()
    } catch (error) {
      console.error("Error updating song:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      artist: "MX2Twins",
      spotify_embed_url: "",
      display_order: 0,
    })
    setEditingSong(null)
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading songs...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Current Songs</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-white text-black hover:bg-gray-200">
              <i className="fas fa-plus mr-2"></i>
              Add Song
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>{editingSong ? "Edit Song" : "Add New Song"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Artist</label>
                <Input
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Spotify Embed URL</label>
                <Input
                  value={formData.spotify_embed_url}
                  onChange={(e) => setFormData({ ...formData, spotify_embed_url: e.target.value })}
                  placeholder="https://open.spotify.com/embed/track/..."
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) })}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                  {editingSong ? "Update" : "Add"} Song
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {songs.map((song) => (
          <Card key={song.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{song.title}</h4>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                  <p className="text-gray-500 text-xs mt-1">Order: {song.display_order}</p>
                  <p className={`text-xs mt-1 ${song.is_active ? "text-green-400" : "text-red-400"}`}>
                    {song.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(song.id, song.is_active)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <i className={`fas ${song.is_active ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(song)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(song.id)}
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
