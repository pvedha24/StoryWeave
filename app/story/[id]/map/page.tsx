"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Users, Heart } from "lucide-react"
import Link from "next/link"

// Mock story tree data
const storyTree = {
  id: "root",
  title: "The Last Stargazer - Opening",
  author: "CosmicDreamer",
  content: "Maya pressed her eye against the telescope's eyepiece...",
  likes: 23,
  readers: 1203,
  x: 400,
  y: 50,
  children: [
    {
      id: "choice-1",
      title: "The Mysterious Glimmer",
      author: "StarSeeker",
      content: "Maya decides to investigate the mysterious glimmer in Orion...",
      likes: 15,
      readers: 456,
      x: 200,
      y: 200,
      children: [
        {
          id: "choice-1-1",
          title: "The Signal",
          author: "CosmicDreamer",
          content: "The glimmer pulses in a pattern that seems almost like...",
          likes: 8,
          readers: 234,
          x: 100,
          y: 350,
          children: [],
        },
        {
          id: "choice-1-2",
          title: "The Artifact",
          author: "VoidWatcher",
          content: "Maya realizes the glimmer is reflecting off something metallic...",
          likes: 12,
          readers: 189,
          x: 300,
          y: 350,
          children: [
            {
              id: "choice-1-2-1",
              title: "First Contact",
              author: "AlienScribe",
              content: "The metallic object begins to move, revealing its true nature...",
              likes: 6,
              readers: 87,
              x: 300,
              y: 500,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "choice-2",
      title: "Contact the Agency",
      author: "CosmicDreamer",
      content: "Dr. Harrison suggests they contact the International Space Agency...",
      likes: 18,
      readers: 567,
      x: 400,
      y: 200,
      children: [
        {
          id: "choice-2-1",
          title: "The Cover-Up",
          author: "ConspiracyWeaver",
          content: "The agency already knows about the disappearing stars...",
          likes: 14,
          readers: 298,
          x: 400,
          y: 350,
          children: [],
        },
      ],
    },
    {
      id: "choice-3",
      title: "Historical Records",
      author: "VoidWatcher",
      content: "Maya realizes she needs to check the observatory's historical records...",
      likes: 12,
      readers: 345,
      x: 600,
      y: 200,
      children: [
        {
          id: "choice-3-1",
          title: "The Ancient Pattern",
          author: "HistorySeeker",
          content: "The records reveal this has happened before, every 10,000 years...",
          likes: 9,
          readers: 156,
          x: 600,
          y: 350,
          children: [],
        },
        {
          id: "choice-3-2",
          title: "The Predecessor",
          author: "TimeWeaver",
          content: "Maya finds notes from a previous astronomer who faced the same crisis...",
          likes: 7,
          readers: 123,
          x: 700,
          y: 350,
          children: [],
        },
      ],
    },
  ],
}

function getAllNodes(node: any): any[] {
  const nodes = [node]
  node.children?.forEach((child: any) => {
    nodes.push(...getAllNodes(child))
  })
  return nodes
}

function getAllConnections(node: any): Array<{ from: string; to: string }> {
  const connections: Array<{ from: string; to: string }> = []
  node.children?.forEach((child: any) => {
    connections.push({ from: node.id, to: child.id })
    connections.push(...getAllConnections(child))
  })
  return connections
}

export default function StoryMapPage({ params }: { params: { id: string } }) {
  const [selectedNode, setSelectedNode] = useState<any>(storyTree)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  const allNodes = getAllNodes(storyTree)
  const allConnections = getAllConnections(storyTree)

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node)
  }, [])

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.3))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

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
              <Link href={`/story/${params.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Story
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Story Map Visualization */}
        <div className="flex-1 relative overflow-hidden bg-white">
          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button size="sm" variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* SVG Canvas */}
          <div className="w-full h-full overflow-auto">
            <svg
              width="1000"
              height="800"
              className="w-full h-full"
              style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)` }}
            >
              {/* Connections */}
              {allConnections.map((connection, index) => {
                const fromNode = allNodes.find((n) => n.id === connection.from)
                const toNode = allNodes.find((n) => n.id === connection.to)
                if (!fromNode || !toNode) return null

                return (
                  <line
                    key={index}
                    x1={fromNode.x}
                    y1={fromNode.y + 30}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                )
              })}

              {/* Arrow marker definition */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#e5e7eb" />
                </marker>
              </defs>

              {/* Nodes */}
              {allNodes.map((node) => (
                <g key={node.id}>
                  {/* Node Background */}
                  <rect
                    x={node.x - 80}
                    y={node.y - 15}
                    width="160"
                    height="60"
                    rx="8"
                    fill={selectedNode?.id === node.id ? "#7c3aed" : "#ffffff"}
                    stroke={selectedNode?.id === node.id ? "#7c3aed" : "#e5e7eb"}
                    strokeWidth="2"
                    className="cursor-pointer hover:stroke-purple-400 transition-colors"
                    onClick={() => handleNodeClick(node)}
                  />

                  {/* Node Title */}
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className="text-sm font-medium cursor-pointer"
                    fill={selectedNode?.id === node.id ? "#ffffff" : "#374151"}
                    onClick={() => handleNodeClick(node)}
                  >
                    {node.title.length > 20 ? node.title.substring(0, 20) + "..." : node.title}
                  </text>

                  {/* Node Author */}
                  <text
                    x={node.x}
                    y={node.y + 20}
                    textAnchor="middle"
                    className="text-xs cursor-pointer"
                    fill={selectedNode?.id === node.id ? "#e5e7eb" : "#6b7280"}
                    onClick={() => handleNodeClick(node)}
                  >
                    by {node.author}
                  </text>

                  {/* Node Stats */}
                  <text
                    x={node.x}
                    y={node.y + 35}
                    textAnchor="middle"
                    className="text-xs cursor-pointer"
                    fill={selectedNode?.id === node.id ? "#e5e7eb" : "#9ca3af"}
                    onClick={() => handleNodeClick(node)}
                  >
                    ❤️ {node.likes} • 👥 {node.readers}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-96 border-l bg-white overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Story Map</h2>
              <p className="text-gray-600">Explore the branching narrative of "The Last Stargazer"</p>
            </div>

            {selectedNode && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{selectedNode.title}</CardTitle>
                    {selectedNode.id === "root" && <Badge variant="secondary">Root</Badge>}
                  </div>
                  <p className="text-sm text-gray-600">by {selectedNode.author}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-4">{selectedNode.content}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {selectedNode.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {selectedNode.readers}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/story/${params.id}`}>Read Chapter</Link>
                    </Button>
                    {selectedNode.children && selectedNode.children.length > 0 && (
                      <Button size="sm" variant="outline">
                        {selectedNode.children.length} Paths
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <span className="text-sm">Selected Chapter</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                  <span className="text-sm">Available Chapter</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-0.5 bg-gray-300"></div>
                  <span className="text-sm">Story Connection</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Story Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Chapters:</span>
                  <span className="text-sm font-medium">{allNodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Readers:</span>
                  <span className="text-sm font-medium">1,203</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Paths:</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Contributors:</span>
                  <span className="text-sm font-medium">6</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
