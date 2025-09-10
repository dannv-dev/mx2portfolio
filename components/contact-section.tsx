"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to work with us? Let's discuss bookings, collaborations, or just connect
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading font-bold text-card-foreground">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-bold text-card-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-envelope text-primary text-lg"></i>
                    <span className="text-muted-foreground">mx2twins@email.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-phone text-primary text-lg"></i>
                    <span className="text-muted-foreground">Available on request</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-map-marker-alt text-primary text-lg"></i>
                    <span className="text-muted-foreground">Available for bookings worldwide</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-bold text-card-foreground mb-4">Follow Our Journey</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/mx2twins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <i className="fab fa-instagram text-lg"></i>
                    <span>@mx2twins</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@mx2twins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <i className="fab fa-tiktok text-lg"></i>
                    <span>@mx2twins</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@MX2twins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <i className="fab fa-youtube text-lg"></i>
                    <span>MX2twins</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-heading font-bold mb-2">Ready to Book?</h3>
                <p className="mb-4">We're available for shows, collaborations, and studio sessions</p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
