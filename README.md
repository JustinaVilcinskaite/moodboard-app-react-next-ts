# Moodboard App – Frontend

A React/Next.js frontend for an in-progress full-stack visual research workspace.

Moodboard is designed as one focused place for artists, designers, and other visually oriented users to collect image references, organize them into project boards and folders, and move from scattered inspiration toward a clearer creative direction.

## Current Status

The project is currently in active development.

The frontend currently includes authentication pages, `AuthContext` for global authentication state, protected routes, reusable layout/navigation, My Boards and Explore pages, board list/card components, and API integration for authentication and board data.

The board detail workspace, folder/image frontend integration, Create Board modal form, and full visual workspace UI are still planned or in progress.

This frontend is built to work with a separate Node.js/Express backend API.

## Tech Stack

- Next.js
- React
- TypeScript
- Axios
- js-cookie
- CSS Modules
- ESLint

## Implemented Frontend Features

### Authentication & Protected Routes

- Login and signup pages connected to the backend authentication API
- Client-side validation for required fields, email, and password
- JWT handling with `js-cookie`
- `AuthContext` for current user state, loading state, derived authentication state, and logout
- Token validation on app load through the backend current-user endpoint
- Protected route wrapper that redirects unauthenticated users to the login page

### Pages & Routing

- Protected My Boards page (`/boards`) connected to the authenticated boards endpoint
- Public Explore page connected to the public boards endpoint

### Board Listings

- Reusable board list and card components
- Board card variants for My Boards and Explore contexts
- Loading, error, and empty states for board list pages
- My Boards cards display board title, thumbnail, image count, updated date, and public/private status
- Explore cards display public board listings

### Layout, Navigation & UI

- Reusable page template with header, navigation, and footer
- Navigation adapts based on authentication state
- Authenticated users can access My Boards and log out
- Unauthenticated users can access login and signup links
- Reusable UI components for buttons, messages, and loading states
- Responsive navigation with burger menu and overlay state

### API, Types & Utilities

- Shared Axios instance using `NEXT_PUBLIC_API_URL`
- API functions for authentication and board operations
- TypeScript types for users, boards, and board card variants
- Utility helpers for relative date formatting and user initials
- Shared validation helpers for email and password rules

## Planned Frontend Improvements

- Complete the Create Board modal and connect the full board creation flow
- Build the board detail workspace with owner and public read-only states
- Add frontend folder and image API integration
- Build folder and image management UI, including URL-based image creation for the current implementation phase
- Add image notes and tags UI
- Add two board viewing modes: a folder-based view showing folders with their images, and an overview view showing all board images together
- Refine the visual design and responsive workspace UI
- Improve the landing page and Explore page
- Add search, filtering, and sorting functionality
- Add real image upload support once external image storage is integrated
- Add drag-and-drop interactions for reordering folders and images
- Longer-term plans include collaboration, private board invitations, personal favorites, and color-based organization

## Project Structure

```text
moodboard-app-react-next-ts/
├── api/                    # Axios instance and API request functions
├── assets/                 # Icons and visual assets
├── components/             # Reusable UI and layout components
├── context/                # Authentication context
├── pages/                  # Next.js pages and routes
│   ├── boards/             # Protected My Boards page
│   ├── explore/            # Public Explore page
│   ├── login/
│   ├── signup/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx           # Landing page
├── styles/                 # Global and modular styles
├── types/                  # TypeScript types
├── utils/                  # Helper functions
├── validations/            # Frontend validation helpers
├── next.config.ts
├── next-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Local Development

This repository is currently best reviewed as an in-progress frontend codebase for the Moodboard full-stack project.

The app can be run locally with the setup below. To use API-connected features, run the separate backend API as well.

### 1. Clone the repository

```bash
git clone https://github.com/JustinaVilcinskaite/moodboard-app-react-next-ts.git
cd moodboard-app-react-next-ts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

### 4. Run the development server

```bash
npm run dev
```

The frontend will be available at:

```bash
http://localhost:3000
```

### 5. Related Backend

This frontend connects to a separate Node.js/Express backend API:

[moodboard-api-node-express](https://github.com/JustinaVilcinskaite/moodboard-api-node-express)
