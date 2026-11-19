# Moodboard App – Frontend

A React/Next.js frontend built with TypeScript for a full-stack visual research workspace.

Moodboard is designed as one focused place for artists, designers, and other visually oriented users to collect image references, organize them into project boards and folders, and move from scattered inspiration toward a clearer creative direction.

The frontend uses `AuthContext` for global authentication state and includes protected routes. It supports board and folder management, image collection and organization, and public board browsing. The board workspace uses a responsive masonry layout and an image details panel for editing notes and moving images between folders.

The frontend connects to a separate Node.js/Express backend API.

## Tech Stack

- Next.js
- React
- TypeScript
- Axios
- js-cookie
- react-responsive-masonry
- CSS Modules
- ESLint

## Features

### Authentication & Protected Routes

- Login and signup pages connected to the backend authentication API
- JWT handling with `js-cookie`
- `AuthContext` for user and authentication state, session validation on app load, and logout
- `ProtectedRoute` for the My Boards page (`/boards`), redirecting unauthenticated users to login

### Pages & Routing

- Landing page with a main link that changes based on authentication state
- My Boards page (`/boards`) displaying owned boards with thumbnails, image counts, updated dates, and visibility status
- Explore page (`/explore`) displaying public boards
- Dynamic board detail page (`/board/[id]`) with owner editing controls and public read-only access
- Loading, error, and empty states for board listings

### Board & Folder Management

- Create, edit, and delete boards, including title, description, and public/private visibility settings
- Create, rename, and delete folders within boards
- Automatically created default General folder that cannot be renamed or deleted
- Deleting a folder moves its images to General rather than deleting them
- Confirmation dialogs for board and folder deletion

### Images & Board Workspace

- Add images by URL to selected folders, including directly from individual folders
- Display images grouped by folder in a responsive masonry layout with lazy loading
- Select images to open a details panel, with read-only access for non-owners
- Owners can edit image notes, move images between folders using a folder selector, and delete images with confirmation

### Layout, Navigation & UI

- Reusable page template with header and footer
- Authentication-aware navigation with a responsive mobile menu
- Reusable buttons, action menus, modals, messages, and loading indicators
- Editing and management controls displayed conditionally based on board ownership
- Responsive board workspace and image details panel

### API, Types & Validation

- Shared Axios instance using `NEXT_PUBLIC_API_URL`
- API functions for authentication, board, folder, and image operations
- TypeScript types for users, boards, folders, and images
- Shared client-side validation helpers for authentication, boards, folders, and images

## Screenshots

<!-- add screenshots -->

## Future Improvements

- Add a board overview mode displaying all images together
- Support image file uploads with external image storage
- Add drag-and-drop reordering for folders and images
- Add search, filtering, and sorting for boards

<!-- later adjust the structure because i will add docs with screenshots -->

## Project Structure

```text
moodboard-app-react-next-ts/
├── api/                    # Axios instance and API request functions
├── assets/                 # Icons and visual assets
├── components/             # Reusable UI, board, folder, and image components
├── context/                # Authentication context
├── pages/                  # Next.js pages and routes
│   ├── board/
│   │   └── [id].tsx        # Board detail page
│   ├── boards/             # Protected My Boards page
│   ├── explore/            # Public Explore page
│   ├── login/
│   ├── signup/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx           # Landing page
├── public/                 # Public assets
├── styles/                 # Global and landing page styles
├── types/                  # TypeScript types
├── utils/                  # Helper functions
├── validations/            # Frontend validation helpers
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

To use the API-connected features, run the [separate backend API](https://github.com/JustinaVilcinskaite/moodboard-api-node-express) alongside the frontend.

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

```text
http://localhost:3000
```
