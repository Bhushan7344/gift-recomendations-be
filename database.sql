-- Users Table
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences Table
CREATE TABLE user_preferences (
    id CHAR(36) PRIMARY KEY, 
    user_id CHAR(36) NOT NULL,
    interests JSON, 
    favorite_categories JSON, 
    age INT,
    gender VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Relationships Table (Friends/Family)
CREATE TABLE user_relationships (
    id CHAR(36) PRIMARY KEY, 
    user_id CHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    relationship_type VARCHAR(50), -- e.g., "friend", "brother", "mother"
    birthdate DATE,
    anniversary DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Relationship Preferences Table
CREATE TABLE user_relationship_preferences (
    id CHAR(36) PRIMARY KEY, 
    relationship_id CHAR(36) NOT NULL,
    interests JSON, 
    favorite_categories JSON, 
    age INT,
    gender VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (relationship_id) REFERENCES user_relationships(id) ON DELETE CASCADE
);

-- Gifts Table
CREATE TABLE gifts (
    id CHAR(36) PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(255),
    age_range VARCHAR(50), -- Example: "0-10,11-18,19-30"
    gender ENUM('male', 'female', 'unisex') NOT NULL, 
    interest_tags JSON, -- JSON Array of tags
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gift History Table
CREATE TABLE gift_history (
    id CHAR(36) PRIMARY KEY, 
    user_id CHAR(36) NOT NULL,
    relationship_id CHAR(36) NOT NULL,
    gift_id CHAR(36) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (relationship_id) REFERENCES user_relationships(id) ON DELETE CASCADE,
    FOREIGN KEY (gift_id) REFERENCES gifts(id) ON DELETE CASCADE
);

-- Notifications Table
CREATE TABLE notifications (
    id CHAR(36) PRIMARY KEY, 
    user_id CHAR(36) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
