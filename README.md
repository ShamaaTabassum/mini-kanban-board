# Mini Kanban Board

Mini Kanban Board is a modern task management application built using Next.js, TypeScript, and Tailwind CSS. It provides an intuitive drag-and-drop interface for organizing tasks using the Kanban methodology. This project demonstrates advanced React patterns, state management, and modern UI/UX design principles.

## Features

- **Drag & Drop Interface**: Seamlessly move tasks within and between columns using @hello-pangea/dnd
- **Task Management**: Create, edit, and delete tasks with inline editing capabilities
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices
- **Modern UI**: Beautiful glassmorphism design with premium gradients and smooth animations
- **State Management**: Robust state handling using useReducer and useContext patterns
- **Type Safety**: Built with TypeScript in strict mode for enhanced code reliability
- **Performance Optimized**: Implements React.memo, useCallback, and efficient re-rendering strategies

## Getting Started

To get started with the Kanban Board, follow these steps:

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm package manager

### Installation

Clone the project repository from GitHub:

```bash
git clone https://github.com/ShamaaTabassum/mini-kanban-board.git
```

Install the project dependencies:

```bash
cd mini-kanban-board
npm install
# or
yarn install
# or
pnpm install
```

### Running Locally

To start the local development server, run the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

This project uses Turbopack for faster development builds.

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Technology Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Runtime**: React 19.0.0
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4.1.10
- **State Management**: useReducer + useContext
- **Data Fetching**: TanStack Query 5.80.7
- **Drag & Drop**: @hello-pangea/dnd 18.0.1
- **Animations**: Framer Motion 12.18.1
- **Icons**: Lucide React 0.517.0

## Testing

Run type checking:

```bash
npm run type-check
```

Build verification:

```bash
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
