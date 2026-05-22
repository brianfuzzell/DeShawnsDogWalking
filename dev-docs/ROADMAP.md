<!-- Last updated: 2026-05-21 -->
<!-- Last change: Split steps 9 and 10 into separate read/write steps -->

# DeShawn's Dog Walking - Implementation Roadmap

Generated from: dev-docs/PRD.md

## Steps

- [x] **Step 1: Verify Project Setup**
  Confirm both servers start and the Vite proxy works end-to-end. Run `npm run dev` in the `client/` folder and start the .NET backend with `F5`. Open the browser, hit `https://localhost:5173`, and verify the existing `/api/hello` endpoint responds when called from the frontend. No new code is written here; this step just ensures your dev environment is wired up correctly before any feature work begins.

- [x] **Step 2: C# Models and Seed Data**
  Create the four C# record/class types (`Dog`, `Walker`, `City`, `WalkerCity`) and declare the four `List<T>` collections at the top of `Program.cs`. Pre-seed each list with enough sample records to exercise all future features (at least 3 cities, 3 walkers, 4 dogs, and several walker-city pairings). This is pure backend setup; no endpoints yet, but all later steps depend on these types and data being in place.

- [x] **Step 3: Cities - View and Add (US8)**
  Build the Cities feature end-to-end. Add `GET /api/cities` and `POST /api/cities` endpoints to `Program.cs`. Create `CityList.jsx` with the city list and the name-input/Add-button form. Wire the "Cities" nav link in `App.jsx` and add the `/cities` route in `index.jsx`. The city list is foundational: the Add Dog form in a later step needs `GET /api/cities` to populate its dropdown.

  **Acceptance Criteria:**
  - **Given** the app is running, **When** a user navigates to the Cities page, **Then** all seeded cities are displayed.
  - **Given** the user types a city name and clicks Add, **When** the form submits, **Then** the new city appears in the list without a page reload.

- [ ] **Step 4: View All Dogs (US1)**
  Add `GET /api/dogs` to `Program.cs`. The response must include each dog's `cityName` and `walkerName` (or null) inline, not just the foreign key IDs. Update `Home.jsx` to fetch from this endpoint and render the dog list. Add the "Home" nav link in `App.jsx` if it is not already there.

  **Acceptance Criteria:**
  - **Given** dogs are seeded, **When** the home page loads, **Then** each dog's name, city name, and walker name (or a "No walker" placeholder) are visible.

- [ ] **Step 5: View Dog Details (US2)**
  Add `GET /api/dogs/{id}` to `Program.cs`, returning 404 if the dog does not exist. Create `DogDetails.jsx` to display the dog's name, city, and current walker. Add the `/dogs/:id` route in `index.jsx` and make each dog name in `Home.jsx` a clickable link that navigates there.

  **Acceptance Criteria:**
  - **Given** a dog exists, **When** a user clicks its name on the home page, **Then** they land on a detail page showing the dog's name, city, and walker (or a clear "no walker" message).
  - **Given** an ID that does not match any dog, **When** the endpoint is called, **Then** the API returns 404.

- [ ] **Step 6: Add a Dog (US3)**
  Add `POST /api/dogs` to `Program.cs` (returns 201 with the new dog). Create `AddDogForm.jsx` with a name field and a city dropdown populated from `GET /api/cities`. On submit, save the dog and navigate to its detail page. Add an "Add Dog" button on `Home.jsx` that links to the form, and wire the `/dogs/add` route in `index.jsx`.

  **Acceptance Criteria:**
  - **Given** the user fills in a name and selects a city and submits, **When** the form posts to the API, **Then** the user is redirected to the new dog's detail page.
  - **Given** the Add Dog form loads, **When** the city dropdown renders, **Then** it lists all cities from the API (not hard-coded values).

- [ ] **Step 7: Delete a Dog (US4)**
  Add `DELETE /api/dogs/{id}` to `Program.cs` (returns 204). Add a "Remove" button next to each dog in `Home.jsx`. On click, call the delete endpoint and remove the dog from the displayed list.

  **Acceptance Criteria:**
  - **Given** a dog is in the list, **When** the user clicks Remove, **Then** the dog disappears from the list immediately and `GET /api/dogs` no longer returns it.

- [ ] **Step 8: View Walkers by City (US5)**
  Add `GET /api/walkers` to `Program.cs`. Support an optional `?cityId=` query parameter that filters the result to walkers who serve that city. Each walker response must include their city list. Create `WalkerList.jsx` showing all walkers with a city dropdown filter. Add the "Walkers" nav link in `App.jsx` and the `/walkers` route in `index.jsx`. This step lays the groundwork for the walker-specific features in the steps that follow.

  **Acceptance Criteria:**
  - **Given** the Walkers page loads with no filter, **When** the list renders, **Then** all walkers are shown with their cities.
  - **Given** the user selects a city from the dropdown, **When** the filter applies, **Then** only walkers who serve that city are shown.

- [ ] **Step 9: Fetch a Single Walker (US9 - part 1)**
  Add `GET /api/walkers/{id}` to `Program.cs`. The response should include the walker's name and their city list; return 404 if the walker does not exist. Make each walker name in `WalkerList.jsx` a clickable link that navigates to `/walkers/:id/edit`, and wire that route in `index.jsx`. No form yet; this step just gets the data and navigation in place.

  **Acceptance Criteria:**
  - **Given** a walker exists, **When** `GET /api/walkers/{id}` is called, **Then** the response includes the walker's name and their cities.
  - **Given** a walker name is clicked in the walkers list, **When** the link is followed, **Then** the browser navigates to `/walkers/:id/edit` without a 404.

- [ ] **Step 10: Walker City Edit Form (US9 - part 2)**
  Add `PUT /api/walkers/{id}` to `Program.cs`. It receives `{ CityIds: [int] }`, replaces all existing `WalkerCity` records for that walker with the new list, and returns 204. Create `WalkerForm.jsx` that fetches the walker via `GET /api/walkers/{id}`, renders a checkbox for every city (pre-checked for the walker's current cities), and on submit calls the PUT endpoint then redirects to the walkers list.

  **Acceptance Criteria:**
  - **Given** the user clicks a walker's name, **When** the edit form loads, **Then** all cities are shown as checkboxes with the walker's current cities already checked.
  - **Given** the user changes the selections and submits, **When** the PUT request completes, **Then** the walker's city list is updated and the user is redirected to the walkers list.

- [ ] **Step 11: View Eligible Dogs for a Walker (US6 - part 1)**
  Add `GET /api/walkers/{id}/dogs` to `Program.cs`. The endpoint returns only dogs whose `CityId` is in the walker's city list AND whose `WalkerId` is not equal to this walker's id. Create `EligibleDogs.jsx` that fetches and lists those dogs. Add an "Add Dog" button next to each walker in `WalkerList.jsx` that links to `/walkers/:id/dogs`, and wire that route in `index.jsx`.

  **Acceptance Criteria:**
  - **Given** a walker serves City A only, **When** `GET /api/walkers/{id}/dogs` is called, **Then** only dogs in City A are returned.
  - **Given** a dog in City A is already assigned to this walker, **When** the endpoint is called, **Then** that dog is excluded from the results.

- [ ] **Step 12: Assign a Dog to a Walker (US6 - part 2)**
  Add `PUT /api/dogs/{id}` to `Program.cs` (body: `{ WalkerId }`, returns 200 with the updated dog). Wire a click handler in `EligibleDogs.jsx` so that clicking a dog calls this endpoint and then navigates to that dog's detail page.

  **Acceptance Criteria:**
  - **Given** the user clicks a dog in the eligible list, **When** the assignment saves, **Then** they are redirected to that dog's detail page showing the walker's name.
  - **Given** the assignment is saved, **When** `GET /api/walkers/{id}/dogs` is called again, **Then** the newly assigned dog no longer appears in the eligible list.

- [ ] **Step 13: Delete a Walker (US7)**
  Add `DELETE /api/walkers/{id}` to `Program.cs`. Before removing the walker, set `WalkerId = null` on every dog currently assigned to them, then return 204. Add a "Remove" button next to each walker in `WalkerList.jsx`. On click, call the delete endpoint and remove the walker from the displayed list.

  **Acceptance Criteria:**
  - **Given** a walker has assigned dogs, **When** the user clicks Remove on that walker, **Then** the walker is gone from the list and each previously assigned dog's detail page shows no walker.
  - **Given** the delete endpoint is called, **When** it completes, **Then** it returns 204 and `GET /api/dogs` no longer shows that walker's name on any dog.
