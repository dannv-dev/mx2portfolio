"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase/client"

interface Image {
  id: string
  title: string
  image_url: string
  alt_text: string
  section: string
  display_order: number
  is_active: boolean
}

export default function ImagesManager() {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [editingImage, setEditingImage] = useState<Image | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    alt_text: "",
    section: "gallery",
    display_order: 0,
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.from("images").select("*").order("section, display_order")

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingImage) {
        const { error } = await supabase.from("images").update(formData).eq("id", editingImage.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("images").insert([formData])

        if (error) throw error
      }

      await fetchImages()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error saving image:", error)
    }
  }

  const handleEdit = (image: Image) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      image_url: image.image_url,
      alt_text: image.alt_text,
      section: image.section,
      display_order: image.display_order,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        const { error } = await supabase.from("images").delete().eq("id", id)

        if (error) throw error
        await fetchImages()
      } catch (error) {
        console.error("Error deleting image:", error)
      }
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase.from("images").update({ is_active: !isActive }).eq("id", id)

      if (error) throw error
      await fetchImages()
    } catch (error) {
      console.error("Error updating image:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      image_url: "",
      alt_text: "",
      section: "gallery",
      display_order: 0,
    })
    setEditingImage(null)
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading images...</div>
  }

  const groupedImages = images.reduce(
    (acc, image) => {
      if (!acc[image.section]) {
        acc[image.section] = []
      }
      acc[image.section].push(image)
      return acc
    },
    {} as Record<string, Image[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Current Images</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-white text-black hover:bg-gray-200">
              <i className="fas fa-plus mr-2"></i>
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>{editingImage ? "Edit Image" : "Add New Image"}</DialogTitle>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="/images/photo.jpg or https://..."
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Alt Text</label>
                <Input
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Section</label>
                <Select
                  value={formData.section}
                  onValueChange={(value) => setFormData({ ...formData, section: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="gallery">Gallery</SelectItem>
                    <SelectItem value="about">About</SelectItem>
                  </SelectContent>
                </Select>
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
                  {editingImage ? "Update" : "Add"} Image
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

      <div className="space-y-6">
        {Object.entries(groupedImages).map(([section, sectionImages]) => (
          <div key={section}>
            <h4 className="text-md font-medium text-gray-300 mb-3 capitalize">{section} Images</h4>
            <div className="grid gap-4">
              {sectionImages.map((image) => (
                <Card key={image.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={image.image_url || "/placeholder.svg"}
                        alt={image.alt_text}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-white">{image.title}</h5>
                        <p className="text-gray-400 text-sm">{image.alt_text}</p>
                        <p className="text-gray-500 text-xs mt-1">Order: {image.display_order}</p>
                        <p className={`text-xs mt-1 ${image.is_active ? "text-green-400" : "text-red-400"}`}>
                          {image.is_active ? "Active" : "Inactive"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleActive(image.id, image.is_active)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <i className={`fas ${image.is_active ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(image)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(image.id)}
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
        ))}
      </div>
    </div>
  )
}
