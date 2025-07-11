import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface CapacityChartProps {
  projects: any[];
}

export const CapacityChart = ({ projects }: CapacityChartProps) => {
  // Prepare data for capacity by year
  const capacityByYear = projects.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year] += project.capacity || 0;
    return acc;
  }, {} as Record<number, number>);

  const yearData = Object.entries(capacityByYear)
    .map(([year, capacity]) => ({ year: parseInt(year), capacity }))
    .sort((a, b) => a.year - b.year)
    .slice(-10); // Last 10 years

  // Prepare data for energy type distribution
  const typeDistribution = projects.reduce((acc, project) => {
    const type = project.type;
    if (!acc[type]) {
      acc[type] = { type, count: 0, capacity: 0 };
    }
    acc[type].count += 1;
    acc[type].capacity += project.capacity || 0;
    return acc;
  }, {} as Record<string, { type: string; count: number; capacity: number }>);

  const pieData = Object.values(typeDistribution);
  
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))', '#8884d8'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="shadow-energy">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Capacity Trends by Year
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} MW`, 'Capacity']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Bar dataKey="capacity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-energy">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🥧 Energy Type Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, 'Projects']}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};