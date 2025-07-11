import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Project {
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

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refreshProjects: () => void;
  totalProjects: number;
}

export const useProjects = (): UseProjectsResult => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const { toast } = useToast();

  const fetchProjects = useCallback(async (pageNum: number = 1, refresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      // First try to get cached data from Supabase
      const { data: cachedProjects, error: dbError } = await supabase
        .from('projects')
        .select('*')
        .range((pageNum - 1) * 20, pageNum * 20 - 1)
        .order('created_at', { ascending: false });

      if (dbError) {
        console.error('Database error:', dbError);
      }

      // If we have cached data and not refreshing, use it
      if (!refresh && cachedProjects && cachedProjects.length > 0) {
        if (pageNum === 1) {
          setProjects(cachedProjects);
        } else {
          setProjects(prev => [...prev, ...cachedProjects]);
        }
        setHasMore(cachedProjects.length === 20);
        setTotalProjects(cachedProjects.length);
        setLoading(false);
        return;
      }

      // Fetch fresh data from NREL API via Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('fetch-renewable-projects', {
        body: { page: pageNum, limit: 20, refresh }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to fetch projects');
      }

      if (data?.projects) {
        if (pageNum === 1) {
          setProjects(data.projects);
        } else {
          setProjects(prev => [...prev, ...data.projects]);
        }
        setHasMore(data.hasMore || false);
        setTotalProjects(data.total || data.projects.length);
        
        if (refresh) {
          toast({
            title: "Projects Updated",
            description: `Fetched ${data.projects.length} renewable energy projects from NREL API`,
          });
        }
      } else {
        throw new Error('No projects data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProjects(nextPage, false);
    }
  }, [loading, hasMore, page, fetchProjects]);

  const refreshProjects = useCallback(() => {
    setPage(1);
    setProjects([]);
    fetchProjects(1, true);
  }, [fetchProjects]);

  useEffect(() => {
    fetchProjects(1, false);
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    hasMore,
    loadMore,
    refreshProjects,
    totalProjects,
  };
};