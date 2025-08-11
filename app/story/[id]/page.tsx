"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, GitBranch, Heart, Share2, Bookmark, ArrowLeft, ArrowRight, Map } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data - in real app this would come from API
const storyData = {
  id: 1,
  title: "The Last Stargazer",
  author: "CosmicDreamer",
  genre: "Sci-Fi",
  coverImage: "/space-observatory-stars-night.png",
  description:
    "In a world where the stars have begun to disappear one by one, Maya discovers she might be the only person who can still see them. As an astronomer at the last functioning observatory, she must uncover the truth behind the vanishing cosmos before darkness consumes everything.",
  totalThreads: 47,
  totalReaders: 1203,
  likes: 89,
  bookmarks: 156,
  currentNode: {
    id: "root",
    content: `Maya pressed her eye against the telescope's eyepiece, her breath fogging the cold metal in the pre-dawn darkness. The Andromeda Galaxy should have been there—a magnificent spiral of light stretching across the void. Instead, she saw only empty blackness.

"Another one," she whispered, her voice barely audible in the silence of the observatory dome.

It had been three months since the first star disappeared. Not dimmed, not obscured by cosmic dust—simply gone, as if it had never existed. The scientific community had dismissed the early reports as equipment failures or atmospheric anomalies. But Maya knew better. She had been watching the sky every night for fifteen years, and she could feel the universe shrinking around her.

The heavy door to the observatory creaked open behind her, and she turned to see Dr. Harrison climbing the spiral staircase, his weathered face etched with concern.

"Any luck tonight?" he asked, though his tone suggested he already knew the answer.

Maya stepped back from the telescope, rubbing her tired eyes. "The Pleiades cluster is gone now. Seven sisters, reduced to empty space." She gestured toward the star charts scattered across her desk. "That's forty-three stellar objects in three months, Harrison. Forty-three."

Dr. Harrison moved to the window, gazing out at what remained of the night sky. The few visible stars seemed dimmer than usual, as if they too were preparing to fade away.

"The board is talking about shutting down the observatory," he said quietly. "They say there's no point in studying a sky that's disappearing."

Maya felt her heart sink. The Meridian Observatory had been her home for over a decade, the place where she had made her most important discoveries. More than that, it might be humanity's last hope of understanding what was happening to their universe.

"We can't give up now," she said, her voice gaining strength. "I think I'm close to finding a pattern in the disappearances. There's something connecting them—something the others aren't seeing."

She moved to her computer, pulling up a three-dimensional map of the local galaxy. Red dots marked the locations of vanished stars, creating a strange, almost organic pattern through space.

"Look at this," Maya said, rotating the display. "The disappearances aren't random. They're following a specific trajectory, moving inward toward our solar system like..." She paused, struggling to find the right words. "Like something is consuming them."

Dr. Harrison leaned closer, his eyes widening as he studied the pattern. "My God, Maya. If you're right, and this continues at the current rate..."

"Earth's sun will be next," Maya finished. "We have maybe six months before whatever is doing this reaches us."

The weight of that realization settled over them both. Outside, the first hints of dawn were beginning to lighten the eastern horizon, but Maya knew that soon, there might be no dawn at all.

As she prepared to close down the telescope for the night, something caught her eye—a faint glimmer in the constellation Orion, right where Betelgeuse should have been. But Betelgeuse had vanished two weeks ago.

"Harrison," she called, her voice tight with excitement and fear. "Come look at this."`,
    author: "CosmicDreamer",
    createdAt: "2024-01-15",
    likes: 23,
    children: [
      {
        id: "choice-1",
        preview:
          "Maya decides to investigate the mysterious glimmer in Orion, believing it might be connected to the disappearing stars...",
        author: "StarSeeker",
        likes: 15,
      },
      {
        id: "choice-2",
        preview:
          "Dr. Harrison suggests they contact the International Space Agency immediately to warn them of Maya's discovery...",
        author: "CosmicDreamer",
        likes: 18,
      },
      {
        id: "choice-3",
        preview:
          "Maya realizes she needs to check the observatory's historical records to see if this has happened before...",
        author: "VoidWatcher",
        likes: 12,
      },
    ],
  },
}

export default function StoryReaderPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

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
            <Button variant="outline" size="sm" asChild>
              <Link href={`/story/${params.id}/map`}>
                <Map className="h-4 w-4 mr-2" />
                Story Map
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Story Header */}
        <div className="mb-8">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <Image
              src={storyData.coverImage || "/placeholder.svg"}
              alt={storyData.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className="mb-2 bg-white/20 text-white border-white/30">{storyData.genre}</Badge>
              <h1 className="text-4xl font-bold mb-2">{storyData.title}</h1>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>{storyData.author[0]}</AvatarFallback>
                </Avatar>
                <span className="text-lg">by {storyData.author}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <GitBranch className="h-4 w-4" />
                {storyData.totalThreads} threads
              </span>
              <span>{storyData.totalReaders} readers</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={liked ? "text-red-600 border-red-200" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
                {storyData.likes + (liked ? 1 : 0)}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBookmarked(!bookmarked)}
                className={bookmarked ? "text-blue-600 border-blue-200" : ""}
              >
                <Bookmark className={`h-4 w-4 mr-1 ${bookmarked ? "fill-current" : ""}`} />
                {bookmarked ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{storyData.description}</p>
        </div>

        {/* Story Content */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>{storyData.currentNode.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{storyData.currentNode.author}</p>
                  <p className="text-sm text-gray-500">{storyData.currentNode.createdAt}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-1" />
                {storyData.currentNode.likes}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              {storyData.currentNode.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Story Choices */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">What happens next?</h3>
          <div className="grid gap-4">
            {storyData.currentNode.children.map((choice, index) => (
              <Card key={choice.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">Path by {choice.author}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Heart className="h-3 w-3" />
                          {choice.likes}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{choice.preview}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Add New Thread */}
        <Card className="border-dashed border-2 border-purple-200 bg-purple-50/50">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Weave Your Own Thread</h3>
            <p className="text-gray-600 mb-4">Don't see the path you want? Add your own continuation to this story!</p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <GitBranch className="h-4 w-4 mr-2" />
              Add New Thread
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
