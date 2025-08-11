// MongoDB connection utility for StoryWeave
// This would be used in a real MERN implementation

import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Database schemas for MongoDB collections
export interface User {
  _id?: string
  username: string
  email: string
  passwordHash: string
  profileImageUrl?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
  stats: {
    storiesCreated: number
    threadsContributed: number
    totalReaders: number
    totalLikes: number
  }
}

export interface Story {
  _id?: string
  title: string
  description: string
  genre: string
  coverImageUrl?: string
  authorId: string
  rootNodeId?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  stats: {
    totalThreads: number
    totalReaders: number
    totalLikes: number
    isTrending: boolean
  }
}

export interface StoryNode {
  _id?: string
  storyId: string
  parentNodeId?: string
  authorId: string
  title?: string
  content: string
  createdAt: Date
  updatedAt: Date
  stats: {
    likes: number
    readers: number
  }
  treeData: {
    depth: number
    path: string
    childrenIds: string[]
  }
}

export interface UserLike {
  _id?: string
  userId: string
  targetType: "story" | "node"
  targetId: string
  createdAt: Date
}

export interface UserBookmark {
  _id?: string
  userId: string
  storyId: string
  createdAt: Date
}

export interface ReadingProgress {
  _id?: string
  userId: string
  storyId: string
  currentNodeId: string
  pathTaken: string[]
  lastReadAt: Date
}

export interface UserAchievement {
  _id?: string
  userId: string
  achievementType: string
  earnedAt: Date
  metadata: Record<string, any>
}

// Database helper functions
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db("storyweave")
}

export async function getUserCollection() {
  const db = await getDatabase()
  return db.collection<User>("users")
}

export async function getStoryCollection() {
  const db = await getDatabase()
  return db.collection<Story>("stories")
}

export async function getStoryNodeCollection() {
  const db = await getDatabase()
  return db.collection<StoryNode>("storyNodes")
}

export async function getUserLikeCollection() {
  const db = await getDatabase()
  return db.collection<UserLike>("userLikes")
}

export async function getUserBookmarkCollection() {
  const db = await getDatabase()
  return db.collection<UserBookmark>("userBookmarks")
}

export async function getReadingProgressCollection() {
  const db = await getDatabase()
  return db.collection<ReadingProgress>("readingProgress")
}

export async function getUserAchievementCollection() {
  const db = await getDatabase()
  return db.collection<UserAchievement>("userAchievements")
}

export default clientPromise
