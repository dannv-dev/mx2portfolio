-- Create images table for managing gallery and hero images
CREATE TABLE IF NOT EXISTS images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  section VARCHAR(50) NOT NULL DEFAULT 'gallery', -- 'hero', 'gallery', 'about'
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_images_section ON images(section);
CREATE INDEX IF NOT EXISTS idx_images_display_order ON images(display_order);
CREATE INDEX IF NOT EXISTS idx_images_active ON images(is_active);

-- Insert sample data with existing images
INSERT INTO images (title, image_url, alt_text, section, display_order) VALUES
('Studio Shot', '/images/mx2twins-studio.jpg', 'MX2Twins professional studio photo', 'hero', 1),
('Graffiti Wall', '/images/mx2twins-graffiti.jpg', 'MX2Twins against graffiti wall', 'gallery', 1),
('Athletic Wear', '/images/mx2twins-athletic.jpg', 'MX2Twins in athletic wear', 'gallery', 2),
('Outdoor Shot', '/images/mx2twins-outdoor.jpg', 'MX2Twins outdoor photo with sunglasses', 'gallery', 3),
('Street Photo', '/images/mx2twins-street.jpg', 'MX2Twins street photography', 'gallery', 4);
