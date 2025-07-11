-- Create projects table to store renewable energy data from NREL API
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nrel_id TEXT UNIQUE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity DECIMAL,
  location TEXT,
  status TEXT,
  year INTEGER,
  developer TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (renewable energy data is generally public)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create policy for admins to manage projects
CREATE POLICY "Admins can manage projects" 
ON public.projects 
FOR ALL 
USING (get_current_user_role() = 'admin'::app_role);

-- Create indexes for better performance
CREATE INDEX idx_projects_type ON public.projects(type);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_year ON public.projects(year);
CREATE INDEX idx_projects_location ON public.projects(location);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();