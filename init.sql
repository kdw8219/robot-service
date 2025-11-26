-- Create robots table if not exists
CREATE TABLE IF NOT EXISTS robots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    robot_id VARCHAR(255) NOT NULL UNIQUE,
    robot_secret VARCHAR(255) NOT NULL,
    model VARCHAR(255),
    firmware_version VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on robot_id for faster queries
CREATE INDEX IF NOT EXISTS idx_robot_id ON robots(robot_id);