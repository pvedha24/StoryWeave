import { type NextRequest, NextResponse } from "next/server"
import { getStoryCollection, getStoryNodeCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, genre, description, content, tags, coverImage } = body

    // Validate required fields
    if (!title || !genre || !description || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // For now, use a mock user ID (in real app, get from auth)
    const authorId = new ObjectId().toString()

    // Create the story document
    const storyCollection = await getStoryCollection()
    const storyNodeCollection = await getStoryNodeCollection()

    // Create the root node first
    const rootNode = {
      storyId: "", // Will be updated after story creation
      authorId,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        likes: 0,
        readers: 0,
      },
      treeData: {
        depth: 0,
        path: "0",
        childrenIds: [],
      },
    }

    const nodeResult = await storyNodeCollection.insertOne(rootNode)
    const rootNodeId = nodeResult.insertedId.toString()

    // Create the story document
    const story = {
      title,
      description,
      genre,
      coverImageUrl: coverImage || "",
      authorId,
      rootNodeId,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        totalThreads: 1,
        totalReaders: 0,
        totalLikes: 0,
        isTrending: false,
      },
    }

    const storyResult = await storyCollection.insertOne(story)
    const storyId = storyResult.insertedId.toString()

    // Update the root node with the story ID
    await storyNodeCollection.updateOne({ _id: nodeResult.insertedId }, { $set: { storyId } })

    return NextResponse.json({
      success: true,
      storyId,
      message: "Story created successfully!",
    })
  } catch (error) {
    console.error("Error creating story:", error)
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const storyCollection = await getStoryCollection()
    const stories = await storyCollection.find({}).sort({ createdAt: -1 }).limit(20).toArray()

    return NextResponse.json({ stories })
  } catch (error) {
    console.error("Error fetching stories:", error)
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}
