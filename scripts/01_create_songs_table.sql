-- Create songs table for managing Spotify tracks
CREATE TABLE IF NOT EXISTS songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) DEFAULT 'MX2Twins',
  spotify_embed_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_songs_display_order ON songs(display_order);
CREATE INDEX IF NOT EXISTS idx_songs_active ON songs(is_active);

-- Insert sample data
INSERT INTO songs (title, spotify_embed_url, display_order) VALUES
('Track 1', 'https://open.spotify.com/embed/track/2XWx3JKApcGgOR2AaBbJsc', 1),
('Track 2', 'https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh', 2),
('Track 3', 'https://open.spotify.com/embed/track/1301WleyT98MSxVHPZCA6M', 3);
