-- Seed data for StoryWeave

-- Insert sample users
INSERT INTO users (id, username, email, password_hash, bio, stories_created, threads_contributed, total_readers, total_likes) VALUES
('user_001', 'CosmicDreamer', 'cosmic@example.com', '$2b$10$hash1', 'Passionate storyteller exploring the mysteries of the universe through collaborative fiction.', 3, 15, 2500, 189),
('user_002', 'DeepSeaScribe', 'deepsea@example.com', '$2b$10$hash2', 'Marine biologist turned fantasy writer. Love underwater adventures and ancient mysteries.', 2, 23, 1800, 145),
('user_003', 'MindBender', 'mind@example.com', '$2b$10$hash3', 'Mystery and thriller enthusiast. Crafting stories that keep you guessing until the end.', 1, 8, 900, 67),
('user_004', 'StarSeeker', 'star@example.com', '$2b$10$hash4', 'Science fiction lover and amateur astronomer. Writing the future, one story at a time.', 0, 12, 0, 45),
('user_005', 'VoidWatcher', 'void@example.com', '$2b$10$hash5', 'Horror writer fascinated by cosmic dread and the unknown. Sweet dreams!', 1, 19, 750, 89);

-- Insert sample stories
INSERT INTO stories (id, title, description, genre, author_id, total_threads, total_readers, total_likes, is_trending) VALUES
('story_001', 'The Last Stargazer', 'In a world where the stars have begun to disappear one by one, Maya discovers she might be the only person who can still see them.', 'Sci-Fi', 'user_001', 47, 1203, 89, TRUE),
('story_002', 'The Sunken City of Aeridor', 'When marine archaeologist Dr. Elena Vasquez discovers breathing apparatus that shouldn\'t exist, she finds herself drawn into the depths of an impossible mystery.', 'Fantasy', 'user_002', 89, 2156, 156, TRUE),
('story_003', 'The Memory Thief', 'Detective Sarah Chen thought she\'d seen everything until she encountered a criminal who steals memories instead of valuables.', 'Mystery', 'user_003', 34, 892, 67, FALSE),
('story_004', 'Whispers in the Void', 'Space station Omega-7 receives a transmission from the edge of known space. The message is simple: "We are coming home."', 'Horror', 'user_005', 41, 723, 52, FALSE);

-- Insert root story nodes
INSERT INTO story_nodes (id, story_id, parent_node_id, author_id, title, content, depth, path, likes, readers) VALUES
('node_001', 'story_001', NULL, 'user_001', 'The Observatory', 'Maya pressed her eye against the telescope\'s eyepiece, her breath fogging the cold metal in the pre-dawn darkness. The Andromeda Galaxy should have been there—a magnificent spiral of light stretching across the void. Instead, she saw only empty blackness...', 0, '/node_001', 23, 1203),
('node_002', 'story_002', NULL, 'user_002', 'The Discovery', 'Dr. Elena Vasquez had been diving these waters for fifteen years, but she had never seen anything like the artifact that now lay before her on the ocean floor...', 0, '/node_002', 31, 2156),
('node_003', 'story_003', NULL, 'user_003', 'The First Case', 'Detective Sarah Chen stared at the crime scene photos spread across her desk. Three victims, no physical evidence taken, but each one claiming they couldn\'t remember the last week of their lives...', 0, '/node_003', 18, 892),
('node_004', 'story_004', NULL, 'user_005', 'The Signal', 'Commander Torres had been stationed on Omega-7 for three years, and in all that time, the deep space monitoring array had never picked up anything more interesting than cosmic background radiation...', 0, '/node_004', 15, 723);

-- Insert child nodes (story branches)
INSERT INTO story_nodes (id, story_id, parent_node_id, author_id, title, content, depth, path, likes, readers) VALUES
-- Branches from The Last Stargazer
('node_005', 'story_001', 'node_001', 'user_004', 'The Mysterious Glimmer', 'Maya decided to investigate the mysterious glimmer in Orion, believing it might be connected to the disappearing stars. As she adjusted the telescope\'s focus, the glimmer began to pulse in a rhythm that seemed almost... intentional.', 1, '/node_001/node_005', 15, 456),
('node_006', 'story_001', 'node_001', 'user_001', 'Contact the Agency', 'Dr. Harrison suggested they contact the International Space Agency immediately. "Maya," he said, his voice tight with urgency, "if you\'re right about this pattern, we need to warn them before it\'s too late."', 1, '/node_001/node_006', 18, 567),
('node_007', 'story_001', 'node_001', 'user_005', 'Historical Records', 'Maya realized she needed to check the observatory\'s historical records. In the dusty archives beneath the main building, she might find clues about whether this cosmic phenomenon had occurred before.', 1, '/node_001/node_007', 12, 345),

-- Branches from The Sunken City
('node_008', 'story_002', 'node_002', 'user_001', 'The Ancient Guardian', 'As Elena approached the artifact, a massive shadow passed overhead. Looking up through the water, she saw something that defied explanation—a creature of impossible size and age, its eyes glowing with ancient intelligence.', 1, '/node_002/node_008', 34, 678),
('node_009', 'story_002', 'node_002', 'user_004', 'The Breathing Device', 'Elena carefully examined the breathing apparatus. Its design was unlike anything in the archaeological record, yet it seemed to be calling to her, as if it wanted to be worn.', 1, '/node_002/node_009', 28, 543);

-- Update stories with root node references
UPDATE stories SET root_node_id = 'node_001' WHERE id = 'story_001';
UPDATE stories SET root_node_id = 'node_002' WHERE id = 'story_002';
UPDATE stories SET root_node_id = 'node_003' WHERE id = 'story_003';
UPDATE stories SET root_node_id = 'node_004' WHERE id = 'story_004';

-- Insert sample user interactions
INSERT INTO user_likes (id, user_id, target_type, target_id) VALUES
('like_001', 'user_002', 'story', 'story_001'),
('like_002', 'user_003', 'story', 'story_001'),
('like_003', 'user_004', 'story', 'story_002'),
('like_004', 'user_005', 'story', 'story_002'),
('like_005', 'user_001', 'node', 'node_008'),
('like_006', 'user_004', 'node', 'node_005'),
('like_007', 'user_002', 'node', 'node_006');

-- Insert sample bookmarks
INSERT INTO user_bookmarks (id, user_id, story_id) VALUES
('bookmark_001', 'user_002', 'story_001'),
('bookmark_002', 'user_003', 'story_002'),
('bookmark_003', 'user_004', 'story_001'),
('bookmark_004', 'user_005', 'story_003');

-- Insert sample reading progress
INSERT INTO reading_progress (id, user_id, story_id, current_node_id, path_taken) VALUES
('progress_001', 'user_002', 'story_001', 'node_005', '["node_001", "node_005"]'),
('progress_002', 'user_003', 'story_002', 'node_008', '["node_002", "node_008"]'),
('progress_003', 'user_004', 'story_001', 'node_006', '["node_001", "node_006"]');

-- Insert sample achievements
INSERT INTO user_achievements (id, user_id, achievement_type, metadata) VALUES
('achieve_001', 'user_001', 'first_story', '{"story_id": "story_001"}'),
('achieve_002', 'user_001', 'popular_author', '{"readers_milestone": 1000}'),
('achieve_003', 'user_002', 'first_story', '{"story_id": "story_002"}'),
('achieve_004', 'user_002', 'collaborator', '{"threads_milestone": 20}'),
('achieve_005', 'user_004', 'collaborator', '{"threads_milestone": 10}');
