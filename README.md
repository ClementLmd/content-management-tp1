# Content Management System (CMS)

A modern, full-stack content management application built with Next.js, React, and TypeScript. This application provides a comprehensive platform for managing articles, users, and content with role-based access control and a beautiful, responsive interface.

## 🚀 Features

### Core Functionality

- **Article Management**: Create, edit, delete, and publish articles with rich content
- **User Management**: Comprehensive user administration with role-based permissions
- **Authentication System**: Secure login/registration with mock authentication
- **Dashboard Analytics**: Real-time statistics and insights about your content
- **Role-Based Access Control**: Four user roles (Admin, Editor, Author, Viewer) with granular permissions

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Real-time Updates**: Instant feedback and state management with Zustand

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Component Testing**: Comprehensive test suite with Jest and React Testing Library
- **State Management**: Efficient state management with Zustand
- **Modern Build Tools**: Next.js 15 with Turbopack for fast development

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint
- **Build Tool**: Turbopack

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd content-management-tp1
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode

## 📱 Main Features Overview

### 1. Authentication & User Management

- **Login/Registration**: Secure authentication system with form validation
- **User Roles**: Four distinct roles with different permission levels:
  - **Admin**: Full system access and user management
  - **Editor**: Content creation, editing, and publishing
  - **Author**: Content creation and editing (no publishing)
  - **Viewer**: Read-only access to content
- **User Dashboard**: Comprehensive user management with filtering, sorting, and bulk actions

### 2. Article Management

- **CRUD Operations**: Create, read, update, and delete articles
- **Rich Content**: Support for categories, tags, and content organization
- **Publishing Workflow**: Draft and published states with toggle functionality
- **Search & Filter**: Advanced filtering by category, status, and search terms
- **Author Attribution**: Track article authors and creation dates

### 3. Dashboard & Analytics

- **Statistics Overview**: Total articles, published content, drafts, and user-specific metrics
- **Trend Analysis**: Content creation trends and publication rates
- **Category Distribution**: Visual breakdown of content by category
- **Recent Activity**: Latest articles and user activity
- **Popular Tags**: Most used tags across all content

### 4. User Interface

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Theme Support**: Light and dark mode with system preference detection
- **Component Library**: Reusable UI components (Buttons, Cards, Inputs, etc.)
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🧪 Testing

The application includes a comprehensive test suite:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

**Test Coverage:**

- Component unit tests
- Store/state management tests
- User interaction tests
- Accessibility tests

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── articles/          # Article management pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard and analytics
│   └── users/             # User management pages
├── components/            # Reusable React components
│   ├── articles/          # Article-specific components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── layout/            # Layout components (Header, etc.)
│   ├── ui/                # Generic UI components
│   └── users/             # User management components
├── data/                  # Mock data and fixtures
├── stores/                # Zustand state management
├── types/                 # TypeScript type definitions
└── tests/                 # Test files and utilities
```

## 🔧 Configuration

### Environment Setup

The application uses mock authentication and data, so no additional environment configuration is required for development.

### Tailwind CSS

The project uses Tailwind CSS 4 with custom configuration for:

- Dark mode support
- Responsive breakpoints
- Custom color schemes
- Component utilities

### TypeScript

Strict TypeScript configuration with:

- Strict mode enabled
- Path mapping for clean imports
- Comprehensive type definitions
- Interface-based architecture

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Vercel Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Connect your GitHub repository
2. Vercel will automatically detect Next.js
3. Deploy with zero configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow TypeScript best practices with strict typing
- Use Tailwind CSS utility classes for styling
- Write tests for new components and features
- Follow the established component structure
- Use conventional commit messages
- Ensure responsive design for all new features

## 🐛 Known Issues

- Authentication is currently mock-based (demo mode)
- Data persistence is session-based (resets on page refresh)
- No backend integration (frontend-only application)

## 📄 License

This project is part of a web development course and is intended for educational purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)

---

**Note**: This is a demo application with mock authentication and data. All changes are temporary and will reset on page refresh.
