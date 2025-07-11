# 🌱 Renewable Energy Dashboard

A modern, real-time dashboard for tracking renewable energy projects across the United States. Built with React, TypeScript, and powered by real data from the National Renewable Energy Laboratory (NREL) API.

![Renewable Energy Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-orange)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## ✨ Features

### 🔥 Core Features
- **Real-time Data Integration** - Live data from NREL API
- **Interactive Dashboard** - Comprehensive project statistics and charts
- **Advanced Filtering** - Search, filter, and sort by multiple criteria
- **Infinite Scrolling** - Seamless pagination for large datasets
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Role-based Access Control** - Admin and user roles with different permissions
- **Secure Authentication** - Email/password login with profile management

### 📊 Data Visualization
- **Total Capacity Tracking** - Monitor renewable energy capacity across projects
- **Project Status Overview** - Operational, Under Construction, and Planned projects
- **Energy Type Distribution** - Solar, Wind, Hydro, Geothermal, and Biomass breakdowns
- **Yearly Trends** - Capacity growth over time
- **Geographic Distribution** - Projects mapped across US states

### 🔧 Technical Features
- **Modern Tech Stack** - React 18, TypeScript, Tailwind CSS
- **Real API Integration** - NREL (National Renewable Energy Laboratory) API
- **Edge Functions** - Serverless backend with Supabase
- **Caching Strategy** - Intelligent data caching for performance
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Loading States** - Smooth loading experiences throughout the app

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- A NREL API key (free registration required)
- Supabase account for backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Get your NREL API key at [developer.nrel.gov](https://developer.nrel.gov/signup/)
   - Configure secrets in your Supabase project settings

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── auth/           # Authentication components
│   └── ui/             # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── data/               # Data types and mock data
├── integrations/       # Third-party integrations
└── test/               # Test files
```

### Backend Architecture
- **Supabase Database** - PostgreSQL with Row Level Security
- **Edge Functions** - Serverless functions for API integration
- **Real-time Updates** - Live data synchronization
- **Authentication** - Built-in user management

### Data Flow
1. **NREL API** → Edge Function → Supabase Database → Frontend
2. **Caching Strategy** - Database caching with refresh capabilities
3. **Pagination** - Efficient data loading with infinite scroll

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Recharts** - Beautiful and responsive charts
- **Lucide React** - Consistent and customizable icons

### Backend & Services
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Edge Functions** - Serverless TypeScript/JavaScript functions
- **NREL API** - National Renewable Energy Laboratory data source
- **Row Level Security** - Database-level security policies

### Development Tools
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities
- **ESLint** - Code linting and style enforcement
- **TypeScript** - Static type checking

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
- **Component Tests** - UI component functionality and rendering
- **Hook Tests** - Custom hook behavior and state management
- **Integration Tests** - API integration and data flow
- **Accessibility Tests** - WCAG compliance and screen reader support

## 📊 API Integration

### NREL API Integration
The application integrates with the National Renewable Energy Laboratory (NREL) API to fetch real renewable energy project data.

**Supported Data Sources:**
- Wind Toolkit API - Wind energy projects
- Solar Resource API - Solar installations
- Geothermal API - Geothermal projects
- Biomass API - Biomass energy facilities

**Data Processing:**
- Real-time data fetching via Supabase Edge Functions
- Intelligent caching to reduce API calls
- Data normalization and validation
- Error handling and fallback mechanisms

## 🔐 Authentication & Security

### User Management
- **Role-based Access** - Admin and User roles
- **Secure Authentication** - Email/password with optional 2FA
- **Profile Management** - User profiles with customizable settings
- **Session Management** - Secure token handling and refresh

### Security Features
- **Row Level Security** - Database-level access control
- **CORS Protection** - Secure cross-origin requests
- **Input Validation** - Comprehensive data validation
- **Audit Logging** - Track user actions and system events

## 🚀 Deployment

This project is built with Lovable and can be deployed with one click!

### Quick Deployment
Simply open [Lovable](https://lovable.dev/projects/5d435ced-3690-4b69-a037-a885844873ab) and click on Share → Publish.

### Custom Domain
Yes, you can connect a custom domain! Navigate to Project → Settings → Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **TypeScript** - Strict mode enabled
- **ESLint** - Follow the established rules
- **Testing** - Add tests for new features
- **Documentation** - Update docs for API changes

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **NREL** - For providing comprehensive renewable energy data
- **Supabase** - For the excellent backend-as-a-service platform
- **shadcn/ui** - For the beautiful and accessible UI components
- **Lovable** - For making development fast and enjoyable

## 🗺️ Project Roadmap

### Phase 1: ✅ Core Dashboard (Completed)
- [x] Basic dashboard with mock data
- [x] Authentication system
- [x] User management and roles

### Phase 2: ✅ Real API Integration (Completed)
- [x] NREL API integration
- [x] Data caching and pagination
- [x] Infinite scrolling

### Phase 3: ✅ Testing & Documentation (Current)
- [x] Unit test suite
- [x] Comprehensive documentation
- [x] GitHub repository setup

### Phase 4: 🚧 Advanced Features (Next)
- [ ] Real-time data updates
- [ ] Advanced analytics and reporting
- [ ] Export functionality (PDF, CSV)
- [ ] Mobile app development

---

**Built with 💚 for a sustainable future**

*This dashboard is part of our commitment to promoting renewable energy adoption and providing transparent access to clean energy data.*