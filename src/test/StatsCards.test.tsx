import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { StatsCards } from '../components/dashboard/StatsCards';
import { Project } from '../data/mockData';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Solar Farm A',
    type: 'Solar PV',
    capacity: 150,
    location: 'California, USA',
    status: 'Operational',
    year: 2023,
    developer: 'Solar Solutions',
  },
  {
    id: '2',
    name: 'Wind Farm B',
    type: 'Wind',
    capacity: 300,
    location: 'Texas, USA',
    status: 'Operational',
    year: 2022,
    developer: 'Wind Energy Corp',
  },
  {
    id: '3',
    name: 'Solar Farm C',
    type: 'Solar PV',
    capacity: 200,
    location: 'Arizona, USA',
    status: 'Under Construction',
    year: 2024,
    developer: 'Desert Solar LLC',
  },
];

describe('StatsCards', () => {
  it('calculates total capacity correctly', () => {
    const { getByText } = render(<StatsCards projects={mockProjects} />);
    
    expect(getByText('650 MW')).toBeInTheDocument();
  });

  it('counts active projects correctly', () => {
    const { getByText } = render(<StatsCards projects={mockProjects} />);
    
    expect(getByText('2')).toBeInTheDocument(); // 2 operational projects
  });

  it('displays all stat card titles', () => {
    const { getByText } = render(<StatsCards projects={mockProjects} />);
    
    expect(getByText('Total Capacity')).toBeInTheDocument();
    expect(getByText('Active Projects')).toBeInTheDocument();
    expect(getByText('Total Projects')).toBeInTheDocument();
    expect(getByText('Solar Projects')).toBeInTheDocument();
  });

  it('handles empty projects array', () => {
    const { getByText } = render(<StatsCards projects={[]} />);
    
    expect(getByText('0 MW')).toBeInTheDocument();
  });
});