"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, GitBranch, Users, Heart, Calendar, Edit, Settings, Trophy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock user data
const userData = {
  username: "CosmicDreamer",
  email: "cosmic@example.com",
  bio: "Passionate storyteller exploring the mysteries of the universe through collaborative fiction. Love sci-fi, fantasy, and anything that makes you question reality.",
  joinDate: "January 2024",
  avatar: "/placeholder.svg?height=100&width=100",
  stats: {
    storiesCreated: 12,
    threadsContributed: 89,
    totalReaders: 15420,
    totalLikes: 1247,
  },
  achievements: [
    { name: "First Story", description: "Created your first story", icon: "🌱", earned: true },
    { name: "Popular Author", description: "Reached 1000 readers", icon: "⭐", earned: true },
    { name: "Collaborator", description: "Contributed to 50 threads", icon: "🤝", earned: true },
    { name: "Trending Writer", description: "Had a story trending", icon: "🔥", earned: true },
    { name: "Community Favorite", description: "Received 500 likes", icon: "❤️", earned: true },
    { name: "Master Weaver", description: "Contributed to 100 threads", icon: "🕸️", earned: false },
  ],
}

const myStories = [
  {
    id: 1,
    title: "The Last Stargazer",
    genre: "Sci-Fi",
    coverImage: "/space-observatory-stars.png",
    threads: 47,
    readers: 1203,
    likes: 89,
    status: "Active",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    title: "Digital Echoes",
    genre: "Cyberpunk",
    coverImage: "/cyberpunk-digital-city-neon.png",
    threads: 23,
    readers: 567,
    likes: 45,
    status: "Active",
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    title: "The Clockwork Garden",
    genre: "Steampunk",
    coverImage: "/steampunk-garden-clockwork.png",
    threads: 12,
    readers: 234,
    likes: 18,
    status: "Completed",
    lastUpdated: "1 week ago",
  },
]

const myContributions = [
  {
    id: 1,
    storyTitle: "The Sunken City of Aeridor",
    threadTitle: "The Ancient Guardian",
    author: "DeepSeaScribe",
    genre: "Fantasy",
    likes: 34,
    readers: 156,
    addedDate: "3 days ago",
  },
  {
    id: 2,
    storyTitle: "Whispers in the Void",
    threadTitle: "The Signal's Origin",
    author: "VoidWalker",
    genre: "Horror",
    likes: 28,
    readers: 98,
    addedDate: "5 days ago",
  },
  {
    id: 3,
    storyTitle: "The Memory Thief",
    threadTitle: "The Detective's Revelation",
    author: "MindBender",
    genre: "Mystery",
    likes: 41,
    readers: 203,
    addedDate: "1 week ago",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

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
            <Link href="/discover" className="text-gray-600 hover:text-purple-600 transition-colors">
              Discover
            </Link>
            <Link href="/create" className="text-gray-600 hover:text-purple-600 transition-colors">
              Create
            </Link>
            <Link href="/profile" className="text-purple-600 font-medium">
              Profile
            </Link>
          </nav>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{userData.username[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold">{userData.username}</h1>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">{userData.bio}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {userData.joinDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userData.stats.storiesCreated}</div>
                <div className="text-sm text-gray-600">Stories Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userData.stats.threadsContributed}</div>
                <div className="text-sm text-gray-600">Threads Contributed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userData.stats.totalReaders.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{userData.stats.totalLikes.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Likes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stories">My Stories</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Stories */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Stories</CardTitle>
                  <CardDescription>Your latest story creations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myStories.slice(0, 3).map((story) => (
                      <div key={story.id} className="flex items-center gap-3">
                        <Image
                          src={story.coverImage || "/placeholder.svg"}
                          alt={story.title}
                          width={60}
                          height={40}
                          className="rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{story.title}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Badge variant="outline" className="text-xs">
                              {story.genre}
                            </Badge>
                            <span>{story.threads} threads</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Contributions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Contributions</CardTitle>
                  <CardDescription>Your latest thread additions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myContributions.slice(0, 3).map((contribution) => (
                      <div key={contribution.id} className="space-y-1">
                        <p className="font-medium text-sm">{contribution.threadTitle}</p>
                        <p className="text-sm text-gray-600">in "{contribution.storyTitle}"</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Heart className="h-3 w-3" />
                          {contribution.likes}
                          <span>•</span>
                          <span>{contribution.addedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stories" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-32">
                    <Image
                      src={story.coverImage || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-white/90">
                        {story.genre}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant={story.status === "Active" ? "default" : "secondary"}>{story.status}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
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
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {story.likes}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">Last updated {story.lastUpdated}</p>

                    <div className="flex gap-2">
                      <Button size="sm" asChild>
                        <Link href={`/story/${story.id}`}>View Story</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/story/${story.id}/map`}>Story Map</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contributions" className="mt-6">
            <div className="space-y-4">
              {myContributions.map((contribution) => (
                <Card key={contribution.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{contribution.threadTitle}</h3>
                        <p className="text-gray-600 mb-2">
                          Added to "{contribution.storyTitle}" by {contribution.author}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <Badge variant="outline">{contribution.genre}</Badge>
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {contribution.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {contribution.readers}
                          </span>
                          <span>{contribution.addedDate}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Thread
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData.achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`${achievement.earned ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200" : "opacity-60"}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.earned && (
                      <Badge className="mt-3 bg-yellow-500 hover:bg-yellow-600">
                        <Trophy className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
