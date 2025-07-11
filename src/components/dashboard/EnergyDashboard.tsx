import { useState, useMemo, useEffect, useCallback } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { StatsCards } from "./StatsCards";
import { FilterControls } from "./FilterControls";
import { CapacityChart } from "./CapacityChart";
import { ProjectCard } from "./ProjectCard";
import { useProjects } from "../../hooks/useProjects";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";

export const EnergyDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Use the projects hook for real API data
  const { projects, loading, error, hasMore, loadMore, refreshProjects, totalProjects } = useProjects();

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
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
  }, [projects, searchQuery, selectedType, selectedStatus, sortBy]);

  // Infinite scrolling
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    if (hasMore) {
      loadMore();
    }
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Renewable Energy Projects</h2>
            <p className="text-muted-foreground">
              {totalProjects > 0 && `${totalProjects} projects loaded from NREL API`}
            </p>
          </div>
          <Button 
            onClick={refreshProjects} 
            disabled={loading}
            variant="outline"
            className="gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Refresh Data
          </Button>
        </div>

        <StatsCards projects={projects} />
        
        <CapacityChart projects={projects} />
        
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
        
        {/* Loading indicator for infinite scroll */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading more projects...</span>
          </div>
        )}
        
        {/* Load more button as fallback */}
        {!loading && hasMore && filteredProjects.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button onClick={loadMore} variant="outline" className="gap-2">
              Load More Projects
            </Button>
          </div>
        )}
        
        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              {error ? `Error: ${error}` : "Try adjusting your filters or search terms"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};