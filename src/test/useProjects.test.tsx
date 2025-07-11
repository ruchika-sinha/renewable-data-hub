import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { useProjects } from '../hooks/useProjects';

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      range: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({
          data: [],
          error: null
        }))
      }))
    }))
  })),
  functions: {
    invoke: vi.fn(() => Promise.resolve({
      data: {
        projects: [
          {
            id: '1',
            name: 'Test Project',
            type: 'Solar PV',
            capacity: 100,
            location: 'Test Location',
            status: 'Operational',
            year: 2023,
            developer: 'Test Developer'
          }
        ],
        hasMore: false,
        total: 1
      },
      error: null
    }))
  }
};

// Mock toast hook
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast })
}));

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase
}));

describe('useProjects', () => {
  it('should initialize with expected initial state', () => {
    const { result } = renderHook(() => useProjects());
    
    expect(result.current.projects).toEqual([]);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.totalProjects).toBe(0);
    expect(typeof result.current.loadMore).toBe('function');
    expect(typeof result.current.refreshProjects).toBe('function');
  });
});