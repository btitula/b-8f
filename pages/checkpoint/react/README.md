# React + TypeScript Base Project

A production-ready React + TypeScript base project with modern tooling and best practices.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool with HMR
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Re-usable components built with Radix UI
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # Shadcn UI components
│   ├── layout/       # Layout components
│   └── auth/         # Auth-related components
├── pages/            # Page components
├── store/            # Redux store
│   └── slices/       # Redux slices
├── services/         # API services
├── hooks/            # Custom hooks
├── types/            # TypeScript types
├── constants/        # Constants and config
├── lib/              # Utility functions
└── index.css         # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm preview
```

## Code Guidelines

Following the cursor rules defined in `.cursor/rules/project-overview.mdc`:

- Use early returns for better readability
- Use TailwindCSS for all styling
- Descriptive naming with "handle" prefix for event handlers
- Implement accessibility features
- Use consts instead of functions
- Follow DRY principle
- No TODOs or placeholders

## Path Aliases

Use `@/` prefix for imports:

```typescript
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'
```

## Adding Shadcn Components

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
```
