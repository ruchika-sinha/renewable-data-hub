import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { Project } from '../data/mockData';

const mockProject: Project = {
  id: '1',
  nrel_id: 'test_1',
  name: 'Test Solar Farm',
  type: 'Solar PV',
  capacity: 150,
  location: 'California, USA',
  status: 'Operational',
  year: 2023,
  developer: 'Test Solar Solutions',
  latitude: 40.7128,
  longitude: -74.0060,
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    const { getByText } = render(<ProjectCard project={mockProject} />);
    
    expect(getByText('Test Solar Farm')).toBeInTheDocument();
    expect(getByText('Solar PV')).toBeInTheDocument();
    expect(getByText('150 MW')).toBeInTheDocument();
    expect(getByText('California, USA')).toBeInTheDocument();
    expect(getByText('Operational')).toBeInTheDocument();
    expect(getByText('2023')).toBeInTheDocument();
    expect(getByText('Test Solar Solutions')).toBeInTheDocument();
  });

  it('displays correct status badge color for operational projects', () => {
    const { getByText } = render(<ProjectCard project={mockProject} />);
    
    const statusBadge = getByText('Operational');
    expect(statusBadge).toHaveClass('bg-success');
  });

  it('displays correct icon for solar projects', () => {
    const { getByText } = render(<ProjectCard project={mockProject} />);
    
    // The solar icon should be displayed (☀️ emoji)
    expect(getByText('☀️')).toBeInTheDocument();
  });

  it('displays correct icon for wind projects', () => {
    const windProject = { ...mockProject, type: 'Wind' };
    const { getByText } = render(<ProjectCard project={windProject} />);
    
    // The wind icon should be displayed (💨 emoji)
    expect(getByText('💨')).toBeInTheDocument();
  });
});