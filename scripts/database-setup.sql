-- StoryWeave Database Schema
-- MongoDB-style collections represented as SQL for reference

-- Users Collection
CREATE TABLE users (
    id VARCHAR(24) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image_url VARCHAR(500),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Stats (could be computed fields)
    stories_created INT DEFAULT 0,
    threads_contributed INT DEFAULT 0,
    total_readers INT DEFAULT 0,
    total_likes INT DEFAULT 0
);

-- Stories Collection
CREATE TABLE stories (
    id VARCHAR(24) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    genre VARCHAR(50),
    cover_image_url VARCHAR(500),
    author_id VARCHAR(24) NOT NULL,
    root_node_id VARCHAR(24),
    tags JSON, -- Array of strings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Computed stats
    total_threads INT DEFAULT 0,
    total_readers INT DEFAULT 0,
    total_likes INT DEFAULT 0,
    is_trending BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Story Nodes (Chapters/Threads) Collection
CREATE TABLE story_nodes (
    id VARCHAR(24) PRIMARY KEY,
    story_id VARCHAR(24) NOT NULL,
    parent_node_id VARCHAR(24), -- NULL for root nodes
    author_id VARCHAR(24) NOT NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Stats
    likes INT DEFAULT 0,
    readers INT DEFAULT 0,
    
    -- Tree structure helpers
    depth INT DEFAULT 0,
    path VARCHAR(1000), -- Materialized path for efficient queries
    
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_node_id) REFERENCES story_nodes(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Interactions
CREATE TABLE user_likes (
    id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    target_type ENUM('story', 'node') NOT NULL,
    target_id VARCHAR(24) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (user_id, target_type, target_id)
);

CREATE TABLE user_bookmarks (
    id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    story_id VARCHAR(24) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bookmark (user_id, story_id)
);

-- Reading Progress
CREATE TABLE reading_progress (
    id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    story_id VARCHAR(24) NOT NULL,
    current_node_id VARCHAR(24) NOT NULL,
    path_taken JSON, -- Array of node IDs representing the path taken
    last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
    FOREIGN KEY (current_node_id) REFERENCES story_nodes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_progress (user_id, story_id)
);

-- User Achievements
CREATE TABLE user_achievements (
    id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    achievement_type VARCHAR(50) NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSON, -- Additional data about the achievement
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_achievement (user_id, achievement_type)
);

-- Indexes for performance
CREATE INDEX idx_stories_author ON stories(author_id);
CREATE INDEX idx_stories_genre ON stories(genre);
CREATE INDEX idx_stories_trending ON stories(is_trending, created_at);
CREATE INDEX idx_story_nodes_story ON story_nodes(story_id);
CREATE INDEX idx_story_nodes_parent ON story_nodes(parent_node_id);
CREATE INDEX idx_story_nodes_author ON story_nodes(author_id);
CREATE INDEX idx_story_nodes_path ON story_nodes(path);
CREATE INDEX idx_user_likes_target ON user_likes(target_type, target_id);
CREATE INDEX idx_reading_progress_user ON reading_progress(user_id);
