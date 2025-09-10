-- Enable Row Level Security
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on songs" ON songs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on images" ON images
  FOR SELECT USING (is_active = true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Allow authenticated users full access to songs" ON songs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to images" ON images
  FOR ALL USING (auth.role() = 'authenticated');
