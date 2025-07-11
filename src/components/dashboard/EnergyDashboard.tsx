import { useState, useMemo } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { StatsCards } from "./StatsCards";
import { FilterControls } from "./FilterControls";
import { CapacityChart } from "./CapacityChart";
import { ProjectCard } from "./ProjectCard";
import { mockProjects, Project } from "../../data/mockData";

export const EnergyDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = mockProjects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.developer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === "all" || 
                         project.type.toLowerCase().includes(selectedType.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || 
                           project.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesType && matchesStatus;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "capacity":
          return b.capacity - a.capacity;
        case "year":
          return b.year - a.year;
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedType, selectedStatus, sortBy]);

  const hasActiveFilters = searchQuery !== "" || selectedType !== "all" || selectedStatus !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedStatus("all");
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="p-4 lg:p-6 max-w-7xl mx-auto">
        <StatsCards projects={mockProjects} />
        
        <CapacityChart projects={mockProjects} />
        
        <FilterControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        )}
      </main>
    </div>
  );
};