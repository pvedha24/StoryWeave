import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, GitBranch, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const featuredStories = [
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
    lastUpdated: "2 hours ago",
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
    lastUpdated: "1 day ago",
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
    lastUpdated: "3 hours ago",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              StoryWeave
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/discover" className="text-gray-600 hover:text-purple-600 transition-colors">
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            Where Stories Branch Into Infinite Possibilities
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join a collaborative storytelling platform where every choice creates a new path. Start a story, weave new
            threads, or explore the branching narratives created by our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              asChild
            >
              <Link href="/discover">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Stories
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/create">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Writing
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Collaborative Writing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Write together with authors from around the world. Every story becomes a community creation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <GitBranch className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Branching Narratives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create multiple story paths from any point. Readers choose their own adventure through your narrative
                  web.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Interactive Story Maps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualize the entire story structure as an interactive tree. Jump between branches and explore
                  alternate timelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-gray-800">Featured Stories</h3>
          <Button variant="outline" asChild>
            <Link href="/discover">View All</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={story.coverImage || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {story.genre}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-1">{story.title}</CardTitle>
                <CardDescription>by {story.author}</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{story.snippet}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Weave Your Story?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of writers creating the future of interactive storytelling
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold">StoryWeave</span>
              </div>
              <p className="text-gray-400">
                The collaborative platform for branching narratives and interactive storytelling.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/discover" className="hover:text-white transition-colors">
                    Discover Stories
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="hover:text-white transition-colors">
                    Create Story
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/writers" className="hover:text-white transition-colors">
                    Featured Writers
                  </Link>
                </li>
                <li>
                  <Link href="/contests" className="hover:text-white transition-colors">
                    Writing Contests
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="hover:text-white transition-colors">
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StoryWeave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
