import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, Calendar, Building } from "lucide-react";

interface Project {
  id: string;
  nrel_id?: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  status: string;
  year: number;
  developer: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
  updated_at?: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'bg-success text-success-foreground';
      case 'under construction':
        return 'bg-warning text-warning-foreground';
      case 'planned':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('solar')) return '☀️';
    if (lowerType.includes('wind')) return '💨';
    if (lowerType.includes('hydro')) return '💧';
    if (lowerType.includes('bio')) return '🌱';
    return '⚡';
  };

  return (
    <Card className="h-full hover:shadow-energy transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
          <Badge className={`ml-2 ${getStatusColor(project.status)}`}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getTypeIcon(project.type)}</span>
            <span className="font-medium text-primary">{project.type}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span className="font-semibold text-foreground">{project.capacity} MW</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{project.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{project.year}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="w-4 h-4" />
            <span className="text-sm">{project.developer}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};