// Mock renewable energy project data
export const mockProjects = [
  {
    id: "1",
    name: "Sunfield Solar Farm",
    type: "Solar PV",
    capacity: 150,
    location: "California, USA",
    status: "Operational",
    year: 2023,
    developer: "SolarTech Solutions"
  },
  {
    id: "2",
    name: "WindPower Ridge",
    type: "Wind",
    capacity: 300,
    location: "Texas, USA",
    status: "Operational",
    year: 2022,
    developer: "GreenWind Energy"
  },
  {
    id: "3",
    name: "Hydroelectric Dam Alpha",
    type: "Hydro",
    capacity: 500,
    location: "Washington, USA",
    status: "Operational",
    year: 2021,
    developer: "AquaPower Corp"
  },
  {
    id: "4",
    name: "Desert Solar Complex",
    type: "Solar PV",
    capacity: 200,
    location: "Arizona, USA",
    status: "Under Construction",
    year: 2024,
    developer: "Desert Energy LLC"
  },
  {
    id: "5",
    name: "Offshore Wind Project",
    type: "Wind",
    capacity: 800,
    location: "Atlantic Coast, USA",
    status: "Under Construction",
    year: 2024,
    developer: "OceanWind Partners"
  },
  {
    id: "6",
    name: "Biomass Energy Plant",
    type: "Biomass",
    capacity: 75,
    location: "Oregon, USA",
    status: "Operational",
    year: 2020,
    developer: "BioEnergy Solutions"
  },
  {
    id: "7",
    name: "Mountain Wind Farm",
    type: "Wind",
    capacity: 250,
    location: "Colorado, USA",
    status: "Planned",
    year: 2025,
    developer: "Alpine Energy"
  },
  {
    id: "8",
    name: "Coastal Solar Array",
    type: "Solar PV",
    capacity: 180,
    location: "Florida, USA",
    status: "Operational",
    year: 2023,
    developer: "Coastal Renewables"
  },
  {
    id: "9",
    name: "River Hydro Station",
    type: "Hydro",
    capacity: 120,
    location: "Montana, USA",
    status: "Under Construction",
    year: 2024,
    developer: "RiverFlow Energy"
  },
  {
    id: "10",
    name: "Prairie Wind Project",
    type: "Wind",
    capacity: 400,
    location: "Kansas, USA",
    status: "Operational",
    year: 2022,
    developer: "Prairie Power Co"
  },
  {
    id: "11",
    name: "Urban Solar Initiative",
    type: "Solar PV",
    capacity: 90,
    location: "New York, USA",
    status: "Planned",
    year: 2025,
    developer: "Urban Green Energy"
  },
  {
    id: "12",
    name: "Geothermal Plant Beta",
    type: "Geothermal",
    capacity: 110,
    location: "Nevada, USA",
    status: "Operational",
    year: 2021,
    developer: "GeoThermal Systems"
  }
];

export type Project = typeof mockProjects[0];