// Authentication utilities for StoryWeave
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { User } from "./mongodb"

if (!process.env.JWT_SECRET) {
  throw new Error("Please add your JWT_SECRET to .env.local")
}

const JWT_SECRET = process.env.JWT_SECRET

export interface JWTPayload {
  userId: string
  username: string
  email: string
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user._id!,
    username: user.username,
    email: user.email,
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.substring(7)
}

// Middleware for protecting API routes
export function requireAuth(handler: Function) {
  return async (req: any, res: any) => {
    const token = extractTokenFromHeader(req.headers.authorization)

    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return res.status(401).json({ error: "Invalid token" })
    }

    req.user = payload
    return handler(req, res)
  }
}

// Achievement system
export const ACHIEVEMENTS = {
  FIRST_STORY: {
    type: "first_story",
    name: "First Story",
    description: "Created your first story",
    icon: "🌱",
  },
  POPULAR_AUTHOR: {
    type: "popular_author",
    name: "Popular Author",
    description: "Reached 1000 readers",
    icon: "⭐",
  },
  COLLABORATOR: {
    type: "collaborator",
    name: "Collaborator",
    description: "Contributed to 50 threads",
    icon: "🤝",
  },
  TRENDING_WRITER: {
    type: "trending_writer",
    name: "Trending Writer",
    description: "Had a story trending",
    icon: "🔥",
  },
  COMMUNITY_FAVORITE: {
    type: "community_favorite",
    name: "Community Favorite",
    description: "Received 500 likes",
    icon: "❤️",
  },
  MASTER_WEAVER: {
    type: "master_weaver",
    name: "Master Weaver",
    description: "Contributed to 100 threads",
    icon: "🕸️",
  },
}

export async function checkAndAwardAchievements(userId: string, stats: any) {
  const { getUserAchievementCollection } = await import("./mongodb")
  const achievementCollection = await getUserAchievementCollection()

  const achievements = []

  // Check for achievements based on stats
  if (stats.storiesCreated >= 1) {
    const exists = await achievementCollection.findOne({
      userId,
      achievementType: ACHIEVEMENTS.FIRST_STORY.type,
    })
    if (!exists) {
      achievements.push({
        userId,
        achievementType: ACHIEVEMENTS.FIRST_STORY.type,
        earnedAt: new Date(),
        metadata: { storiesCreated: stats.storiesCreated },
      })
    }
  }

  if (stats.totalReaders >= 1000) {
    const exists = await achievementCollection.findOne({
      userId,
      achievementType: ACHIEVEMENTS.POPULAR_AUTHOR.type,
    })
    if (!exists) {
      achievements.push({
        userId,
        achievementType: ACHIEVEMENTS.POPULAR_AUTHOR.type,
        earnedAt: new Date(),
        metadata: { totalReaders: stats.totalReaders },
      })
    }
  }

  if (stats.threadsContributed >= 50) {
    const exists = await achievementCollection.findOne({
      userId,
      achievementType: ACHIEVEMENTS.COLLABORATOR.type,
    })
    if (!exists) {
      achievements.push({
        userId,
        achievementType: ACHIEVEMENTS.COLLABORATOR.type,
        earnedAt: new Date(),
        metadata: { threadsContributed: stats.threadsContributed },
      })
    }
  }

  if (stats.totalLikes >= 500) {
    const exists = await achievementCollection.findOne({
      userId,
      achievementType: ACHIEVEMENTS.COMMUNITY_FAVORITE.type,
    })
    if (!exists) {
      achievements.push({
        userId,
        achievementType: ACHIEVEMENTS.COMMUNITY_FAVORITE.type,
        earnedAt: new Date(),
        metadata: { totalLikes: stats.totalLikes },
      })
    }
  }

  if (stats.threadsContributed >= 100) {
    const exists = await achievementCollection.findOne({
      userId,
      achievementType: ACHIEVEMENTS.MASTER_WEAVER.type,
    })
    if (!exists) {
      achievements.push({
        userId,
        achievementType: ACHIEVEMENTS.MASTER_WEAVER.type,
        earnedAt: new Date(),
        metadata: { threadsContributed: stats.threadsContributed },
      })
    }
  }

  // Insert new achievements
  if (achievements.length > 0) {
    await achievementCollection.insertMany(achievements)
  }

  return achievements
}
