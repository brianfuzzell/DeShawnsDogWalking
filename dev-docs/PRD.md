<!-- Last updated: 2026-05-20 -->
<!-- Last change: Initial PRD creation -->

# DeShawn's Dog Walking - Product Requirements Document

## Problem Statement

DeShawn's Dog Walking needs a web application to manage its service. Staff need to track dogs in the system, the walkers who serve them, and the cities where those walkers operate. Currently there is no tool to assign walkers to dogs, manage service areas, or keep the roster up to date. This app solves that by providing a simple interface for all of those tasks.

## Target Users

Internal staff at DeShawn's Dog Walking who manage day-to-day operations: adding dogs and walkers, assigning walkers to dogs, and keeping city coverage current.

## Core Requirements

All nine user stories from the assignment spec are in scope. Each story includes acceptance criteria in Given/When/Then format.

### Dogs

1. **View all dogs** - Home page displays every dog in the system.
2. **View dog details** - Clicking a dog's name shows its details and current walker (if any).
3. **Add a dog** - An "Add Dog" button leads to a form; submitting saves the dog and navigates to its detail view.
4. **Delete a dog** - A "Remove" button on the dog list removes a dog immediately.

### Walkers

5. **View walkers by city** - The "Walkers" nav link shows all walkers; an optional city dropdown filters the list.
6. **Assign walker to dog** - An "Add Dog" button next to each walker shows eligible dogs (same city, not already assigned to that walker); clicking a dog assigns the walker and shows the dog's detail view.
7. **Delete a walker** - A "Remove" button removes the walker and clears the walker assignment from all their dogs.

### Cities

8. **Add a city** - The "Cities" nav link shows existing cities; a text input and "Add" button appends a new city to the list.

### Walker Cities

9. **Manage walker cities** - Clicking a walker's name opens an edit form with checkboxes for all cities; submitting updates the walker's city list and redirects to the walkers list.

## Technical Stack

### Stack Decisions

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React 18, React Router v6 | Already in template; matches course curriculum |
| UI components | Reactstrap (Bootstrap) | Already installed in template |
| Frontend build | Vite with proxy to `https://localhost:5001` | Already configured; routes `/api/*` to the .NET backend |
| Backend | .NET 8 Minimal API (C#) | Course pattern for Book 2 |
| Data access | In-memory `List<T>` + LINQ | Course pattern for Book 2; a real database is introduced in Book 3 |
| API testing | Swagger (already configured) | Comes with the template |

### API Route Convention

All backend routes are prefixed with `/api` to match the Vite proxy configuration (example: `GET /api/dogs`).

## Data Model

Four in-memory collections live at the top of `Program.cs`:

```
List<Dog>        - Id, Name, CityId, WalkerId (nullable int)
List<Walker>     - Id, Name
List<City>       - Id, Name
List<WalkerCity> - Id, WalkerId, CityId   (joining table for many-to-many)
```

Key relationships:
- A dog lives in one city and may have zero or one walker.
- A walker serves one or more cities (many-to-many via `WalkerCity`).
- Deleting a walker must also null out `WalkerId` on all their assigned dogs.

## Scope

### In Scope (v1)

- All 9 user stories listed above
- Feature-by-feature development: build the API endpoint and the React component for each story together before moving to the next
- ERD and wireframes created before coding begins (per assignment instructions)
- GitHub project board with one issue per user story (per assignment instructions)
- Feature branches named `feature/{issue-number}/{short-description}`

### Out of Scope

- Authentication or user accounts
- Persistent database storage (comes in Book 3)
- Unit tests
- Edit dog details (no user story requires it)
- Edit city names
- Pagination or search

## Success Criteria

- All 9 user stories pass their Given/When/Then acceptance criteria when tested in the browser.
- The API returns correct HTTP status codes (200, 201, 204, 404 as appropriate).
- Deleting a walker clears walker assignments on affected dogs.
- The city dropdown on the walkers page reflects live data (not stale).
- The "Add Dog" flow for a walker only shows dogs in the walker's cities that are not already assigned to that walker.

## Learning Goals

- Build and test Minimal API endpoints in .NET 8 following course conventions.
- Model a many-to-many relationship (walkers/cities) using a joining collection and LINQ.
- Consume a REST API from React using `fetch` and the `apiManager.js` pattern.
- Organize React routes and components using React Router v6 with nested routes.
- Practice the full-stack, feature-by-feature workflow the course recommends.
