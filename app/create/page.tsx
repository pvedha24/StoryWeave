"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Upload, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const genres = [
  "Sci-Fi",
  "Fantasy",
  "Mystery",
  "Horror",
  "Romance",
  "Thriller",
  "Adventure",
  "Drama",
  "Comedy",
  "Historical Fiction",
  "Cyberpunk",
  "Steampunk",
]

export default function CreateStoryPage() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    description: "",
    content: "",
    coverImage: "",
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In real app, would submit to API and redirect
    console.log("Story created:", { ...formData, tags: selectedTags })
    setIsSubmitting(false)
  }

  const wordCount = formData.content.split(/\s+/).filter((word) => word.length > 0).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              StoryWeave
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/discover">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Discover
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Plant a New Story Seed
          </h1>
          <p className="text-xl text-gray-600">Start a collaborative narrative that others can build upon</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Story Details</CardTitle>
              <CardDescription>Give your story a compelling title and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Story Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., The Last Stargazer"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="genre">Genre *</Label>
                <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Story Description *</Label>
                <Textarea
                  id="description"
                  placeholder="A brief description that will entice readers to explore your story..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-2 min-h-[100px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
              <CardDescription>Add a visual that captures the essence of your story</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                <Button type="button" variant="outline" className="mt-4 bg-transparent">
                  Choose File
                </Button>
              </div>
              {formData.coverImage && (
                <div className="mt-4">
                  <Image
                    src={formData.coverImage || "/placeholder.svg"}
                    alt="Cover preview"
                    width={200}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add tags to help readers discover your story</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "Space",
                  "Mystery",
                  "Adventure",
                  "Science",
                  "Discovery",
                  "Conspiracy",
                  "Future",
                  "Technology",
                  "Exploration",
                  "Aliens",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-purple-100"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Story Content */}
          <Card>
            <CardHeader>
              <CardTitle>Opening Chapter *</CardTitle>
              <CardDescription>
                Write the first chapter of your story. This is where other writers will branch from.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Begin your story here... Set the scene, introduce characters, and create a compelling hook that will inspire others to continue your narrative."
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                className="min-h-[400px] font-mono text-sm leading-relaxed"
                required
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{wordCount} words</span>
                <span>Minimum 100 words recommended</span>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {formData.title && formData.content && (
            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Preview
                </CardTitle>
                <CardDescription>Here's how your story will appear to readers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    {formData.genre && <Badge variant="secondary">{formData.genre}</Badge>}
                    {selectedTags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{formData.title}</h3>
                  <p className="text-gray-600 mb-4">{formData.description}</p>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-800 leading-relaxed line-clamp-6">{formData.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !formData.title || !formData.genre || !formData.content}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Story...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Plant Story Seed
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
