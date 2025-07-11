import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Wind, Sun } from "lucide-react";

interface StatsCardsProps {
  projects: any[];
}

export const StatsCards = ({ projects }: StatsCardsProps) => {
  const totalCapacity = projects.reduce((sum, project) => sum + (project.capacity || 0), 0);
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Operational').length;
  const solarProjects = projects.filter(p => p.type?.toLowerCase().includes('solar')).length;

  const stats = [
    {
      title: "Total Capacity",
      value: `${totalCapacity.toLocaleString()} MW`,
      icon: Zap,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Active Projects",
      value: activeProjects.toString(),
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Total Projects",
      value: totalProjects.toString(),
      icon: Wind,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Solar Projects",
      value: solarProjects.toString(),
      icon: Sun,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-energy hover:shadow-glow transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};