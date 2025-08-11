"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Users, GitBranch, Search, Filter, TrendingUp, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const stories = [
  {
    id: 1,
    title: "The Last Stargazer",
    author: "CosmicDreamer",
    genre: "Sci-Fi",
    coverImage: "/space-observatory-stars.png",
    snippet:
      "In a world where the stars have begun to disappear one by one, Maya discovers she might be the only person who can still see them...",
    threads: 47,
    readers: 1203,
    likes: 89,
    lastUpdated: "2 hours ago",
    trending: true,
  },
  {
    id: 2,
    title: "The Sunken City of Aeridor",
    author: "DeepSeaScribe",
    genre: "Fantasy",
    coverImage: "/underwater-ancient-city.png",
    snippet:
      "When marine archaeologist Dr. Elena Vasquez discovers breathing apparatus that shouldn't exist, she finds herself drawn into the depths of an impossible mystery...",
    threads: 89,
    readers: 2156,
    likes: 156,
    lastUpdated: "1 day ago",
    trending: true,
  },
  {
    id: 3,
    title: "The Memory Thief",
    author: "MindBender",
    genre: "Mystery",
    coverImage: "/noir-detective-memories-shadows.png",
    snippet:
      "Detective Sarah Chen thought she'd seen everything until she encountered a criminal who steals memories instead of valuables...",
    threads: 34,
    readers: 892,
    likes: 67,
    lastUpdated: "3 hours ago",
    trending: false,
  },
  {
    id: 4,
    title: "Digital Ghosts",
    author: "CyberSage",
    genre: "Cyberpunk",
    coverImage: "/cyberpunk-digital-ghosts-neon.png",
    snippet:
      "In 2087, when people die, their consciousness can be uploaded to the net. But what happens when those digital souls start to rebel?",
    threads: 23,
    readers: 445,
    likes: 34,
    lastUpdated: "5 hours ago",
    trending: false,
  },
  {
    id: 5,
    title: "The Clockwork Heart",
    author: "SteamDreamer",
    genre: "Steampunk",
    coverImage: "/steampunk-clockwork-heart.png",
    snippet:
      "In Victorian London, inventor Eliza Hartwell creates the first artificial heart, but her creation holds secrets that could change the world...",
    threads: 56,
    readers: 1034,
    likes: 78,
    lastUpdated: "6 hours ago",
    trending: false,
  },
  {
    id: 6,
    title: "Whispers in the Void",
    author: "VoidWalker",
    genre: "Horror",
    coverImage: "/cosmic-horror-void.png",
    snippet:
      "Space station Omega-7 receives a transmission from the edge of known space. The message is simple: 'We are coming home.'",
    threads: 41,
    readers: 723,
    likes: 52,
    lastUpdated: "8 hours ago",
    trending: false,
  },
]

const genres = ["All", "Sci-Fi", "Fantasy", "Mystery", "Horror", "Romance", "Thriller", "Cyberpunk", "Steampunk"]

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [sortBy, setSortBy] = useState("trending")

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.snippet.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "All" || story.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.readers - a.readers
      case "popular":
        return b.readers - a.readers
      case "recent":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "threads":
        return b.threads - a.threads
      default:
        return 0
    }
  })

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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/discover" className="text-purple-600 font-medium">
              Discover
            </Link>
            <Link href="/create" className="text-gray-600 hover:text-purple-600 transition-colors">
              Create
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Discover Stories
          </h1>
          <p className="text-xl text-gray-600">Explore branching narratives and find your next adventure</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search stories, authors, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Trending
                    </div>
                  </SelectItem>
                  <SelectItem value="popular">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Most Popular
                    </div>
                  </SelectItem>
                  <SelectItem value="recent">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Recently Updated
                    </div>
                  </SelectItem>
                  <SelectItem value="threads">
                    <div className="flex items-center">
                      <GitBranch className="h-4 w-4 mr-2" />
                      Most Threads
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Found {sortedStories.length} {sortedStories.length === 1 ? "story" : "stories"}
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStories.map((story) => (
            <Card
              key={story.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-md"
            >
              <Link href={`/story/${story.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={story.coverImage || "/placeholder.svg"}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {story.genre}
                    </Badge>
                    {story.trending && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {story.title}
                  </CardTitle>
                  <CardDescription>by {story.author}</CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{story.snippet}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <GitBranch className="h-4 w-4" />
                        {story.threads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {story.readers}
                      </span>
                    </div>
                    <span>{story.lastUpdated}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-purple-600 group-hover:text-white transition-colors bg-transparent"
                    >
                      Read Story
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/story/${story.id}/map`}>
                        <GitBranch className="h-4 w-4 mr-1" />
                        Story Map
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {sortedStories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
            <Button asChild>
              <Link href="/create">Create the First Story</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
