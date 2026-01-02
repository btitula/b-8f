# Implementation Plan: Homepage Frontend with Header & Exclusive Deals

**Project:** Order.uk Homepage
**Date:** 2026-01-02
**Tech Stack:** React (JavaScript), Vite, TailwindCSS, shadcn/ui, react-router-dom, Redux Toolkit, react-hook-form, Zod

---

## Executive Summary

Building a React-based homepage with:
- **Header:** Logo, navigation menu, Login/Signup dialog with full form validation
- **Exclusive Deals Section:** Category-filtered deal cards with mock data
- **Routing:** Home page + 404 Not Found
- **State Management:** Redux Toolkit for authentication state
- **Forms:** react-hook-form + Zod validation with best practices

---

## Table of Contents

- [A. Setup & Configuration Phase](#a-setup--configuration-phase)
- [B. Project Architecture](#b-project-architecture)
- [C. Implementation Details](#c-implementation-details)
- [D. State Management Patterns](#d-state-management-patterns)
- [E. Form Validation Best Practices](#e-form-validation-best-practices)
- [F. Responsive Design Strategy](#f-responsive-design-strategy)
- [G. Implementation Sequence](#g-implementation-sequence)
- [H. Assumptions & Decisions](#h-assumptions--decisions)
- [I. Success Criteria](#i-success-criteria)
- [J. Next Steps After Implementation](#j-next-steps-after-implementation)

---

## A. SETUP & CONFIGURATION PHASE

### Task 1: Install Missing Dependencies

```bash
# Core dependencies
npm install @reduxjs/toolkit react-router-dom react-hook-form zod @hookform/resolvers

# TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui dependencies
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-tabs
npm install lucide-react
```

**Post-install actions:**
1. Configure `tailwind.config.js`
2. Update `src/index.css` with Tailwind directives
3. Create `src/lib/utils.js` for shadcn's `cn()` utility
4. Create `components.json` for shadcn configuration

---

### Task 2: TailwindCSS Configuration

**File: `tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors based on design
        primary: {
          orange: '#FC8A06',
          dark: '#03081F',
        },
      },
    },
  },
  plugins: [],
}
```

**File: `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Task 3: shadcn/ui Setup

**File: `components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**File: `src/lib/utils.js`**

```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

**Install shadcn components:**

```bash
npx shadcn@latest add dialog
npx shadcn@latest add tabs
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
```

---

### Task 4: Vite Path Alias Configuration

**File: `vite.config.js`**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

---

## B. PROJECT ARCHITECTURE

### Folder Structure

```
src/
├── assets/              # Static assets (not used initially)
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components
│   │   └── Header.jsx
│   ├── home/           # Homepage-specific components
│   │   ├── ExclusiveDeals.jsx
│   │   ├── DealCard.jsx
│   │   └── CategoryTabs.jsx
│   └── auth/           # Authentication components
│       └── AuthDialog.jsx
├── pages/              # Route pages
│   ├── Home.jsx
│   └── NotFound.jsx
├── store/              # Redux store
│   ├── index.js       # Store configuration
│   └── slices/
│       └── authSlice.js
├── lib/                # Utilities
│   └── utils.js
├── hooks/              # Custom hooks (future)
├── data/               # Mock data
│   └── dealsData.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## C. IMPLEMENTATION DETAILS

### 1. Redux Store Setup

**File: `src/store/slices/authSlice.js`**

**Purpose:** Manage authentication state

**State Shape:**
```javascript
{
  user: null | { id, email, name, token },
  isAuthenticated: false,
  loading: false
}
```

**Actions:**
- `loginSuccess(user)` - Set user data after login
- `signupSuccess(user)` - Set user data after signup
- `logout()` - Clear user data
- `setLoading(boolean)` - Set loading state

**Implementation approach:**
- Use `createSlice` from Redux Toolkit
- Store user data in Redux state
- Later: persist to localStorage (not in initial scope)

---

**File: `src/store/index.js`**

**Purpose:** Configure Redux store

```javascript
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
```

---

### 2. React Router Setup

**File: `src/main.jsx`**

**Changes:**
- Wrap `<App />` with `<Provider>` from react-redux
- Wrap with `<BrowserRouter>` from react-router-dom

**File: `src/App.jsx`**

**Purpose:** Route configuration

**Routes:**
- `/` → `<Home />`
- `*` → `<NotFound />`

**Implementation:**
- Use `<Routes>` and `<Route>` from react-router-dom
- Layout wrapper includes `<Header />` (shown on all routes except maybe 404)

---

### 3. Header Component

**File: `src/components/layout/Header.jsx`**

**Responsibilities:**
1. Display brand logo/name (left)
2. Navigation menu (center)
3. Login/Signup button (right)
4. Trigger auth dialog

**Component Structure:**
```
<Header>
  ├── Brand Logo (left)
  ├── Navigation (center)
  │   ├── Home (active state: orange bg, rounded)
  │   ├── Browse Menu
  │   ├── Special Offers
  │   ├── Restaurants
  │   └── Track Order
  └── Auth Button (right)
      └── Opens <AuthDialog>
```

**State (local):**
- `isAuthDialogOpen` - boolean to control dialog visibility

**Navigation Implementation:**
- Use `<NavLink>` from react-router-dom for Home
- Other nav items are `<button>` or `<a>` (no routes yet)
- Active state: orange background (`bg-[#FC8A06]`), white text, rounded pill

**Styling:**
- Container: full width, padding, flex justify-between
- Responsive: hamburger menu on mobile (future enhancement - not now)
- Desktop-first approach

**Props:** None (self-contained)

**Events:**
- `onClick` on Login/Signup button → set `isAuthDialogOpen = true`

---

### 4. Auth Dialog Component

**File: `src/components/auth/AuthDialog.jsx`**

**Responsibilities:**
1. shadcn/ui Dialog wrapper
2. Tabs for Login / Signup toggle
3. Two forms: LoginForm, SignupForm
4. Form validation with react-hook-form + Zod
5. Dispatch Redux actions on submit

**Component Structure:**
```
<Dialog>
  <DialogContent>
    <Tabs defaultValue="login">
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <LoginForm />
      </TabsContent>

      <TabsContent value="signup">
        <SignupForm />
      </TabsContent>
    </Tabs>
  </DialogContent>
</Dialog>
```

**Props:**
- `open` - boolean (controlled by Header)
- `onOpenChange` - callback to update Header state

---

#### LoginForm Sub-component

**File: Can be in same file or separate `LoginForm.jsx`**

**Fields:**
1. Email (required, email format)
2. Password (required, min 8 chars)

**Zod Schema:**
```javascript
const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
})
```

**react-hook-form setup:**
- Use `useForm` with `zodResolver`
- Form state management
- Error display under each field

**Submit behavior:**
- Mock authentication (no real API)
- Dispatch `loginSuccess({ id: 1, email, name: "Mock User", token: "mock-token" })`
- Close dialog
- Show success feedback (future: toast notification)

**Best Practices:**
- Field-level error messages
- Submit button disabled during loading
- Clear form on successful submit
- Accessible labels + error announcements

---

#### SignupForm Sub-component

**Fields:**
1. Name (required, min 2 chars)
2. Email (required, email format)
3. Password (required, min 8 chars, must include number + special char)
4. Confirm Password (required, must match password)

**Zod Schema:**
```javascript
const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
```

**Submit behavior:**
- Mock signup (no real API)
- Dispatch `signupSuccess({ id: 2, email, name, token: "mock-token" })`
- Close dialog
- Show success feedback

---

### 5. Exclusive Deals Section

**File: `src/components/home/ExclusiveDeals.jsx`**

**Responsibilities:**
1. Section title
2. Category tabs
3. Display filtered deal cards

**Component Structure:**
```
<ExclusiveDeals>
  ├── Section Title: "Up to -40% Order.uk exclusive deals"
  ├── <CategoryTabs> (filter selector)
  └── <div className="deal-cards-grid">
      └── {filteredDeals.map(deal => <DealCard key={deal.id} {...deal} />)}
```

**State (local):**
- `selectedCategory` - string ('vegan' | 'sushi' | 'pizza' | 'others')
- Default: `'pizza'`

**Data Source:**
- Import mock data from `src/data/dealsData.js`
- Filter deals by `selectedCategory`

**Styling:**
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Gap between cards

---

**File: `src/data/dealsData.js`**

**Mock Data Structure:**
```javascript
export const dealsData = [
  {
    id: 1,
    category: 'pizza',
    discount: '-40%',
    restaurantName: 'Chef Burgers London',
    city: 'London',
    image: '/deals/chef-burgers.jpg', // placeholder path
  },
  {
    id: 2,
    category: 'pizza',
    discount: '-20%',
    restaurantName: 'Grand Ai Cafe London',
    city: 'London',
    image: '/deals/grand-ai-cafe.jpg',
  },
  // ... more deals for each category
]
```

**Data assumptions:**
- 3-4 deals per category
- Each category has at least 2 deals
- Images will be added later to `/public/deals/`

---

**File: `src/components/home/CategoryTabs.jsx`**

**Responsibilities:**
- Display 4 category buttons
- Highlight active category
- Trigger filter change

**Categories:**
1. Vegan
2. Sushi
3. Pizza & Fast food (default active)
4. Others

**Props:**
- `selectedCategory` - current active category
- `onCategoryChange` - callback to update parent state

**Styling:**
- Horizontal button group
- Active state: orange background, white text
- Inactive: white background, dark text, border

**Implementation:**
- Can use shadcn Tabs or custom buttons
- Recommendation: custom buttons for more control

---

**File: `src/components/home/DealCard.jsx`**

**Responsibilities:**
- Display single deal card
- Show discount badge
- Show restaurant info
- Visual feedback on hover

**Props:**
```javascript
{
  discount: string,
  restaurantName: string,
  city: string,
  image: string,
}
```

**Component Structure:**
```
<DealCard>
  ├── Background Image
  ├── Discount Badge (top-right)
  └── Info Overlay (bottom)
      ├── "Restaurant" label
      └── Restaurant name + city
```

**Styling:**
- Card: rounded corners, overflow hidden
- Aspect ratio: 4:3 or 16:9
- Hover: scale transform, shadow increase
- Discount badge: dark bg, white text, positioned absolute

**Interactivity:**
- Hover state: subtle scale + shadow
- Click: no action (visual feedback only)
- Cursor: pointer on hover

---

### 6. Home Page

**File: `src/pages/Home.jsx`**

**Responsibilities:**
- Compose homepage sections

**Structure:**
```
<Home>
  <ExclusiveDeals />
  {/* Future sections can be added here */}
</Home>
```

**Note:** Header is rendered in App.jsx layout, not inside Home

---

### 7. Not Found Page

**File: `src/pages/NotFound.jsx`**

**Responsibilities:**
- Display 404 message
- Link back to home

**Content:**
- Simple centered message: "404 - Page Not Found"
- Button/Link: "Go back to Home"
- Minimal styling

---

## D. STATE MANAGEMENT PATTERNS

### Redux State (Global)

**Location:** `store/slices/authSlice.js`

**What goes here:**
- User authentication data (after login/signup)
- Authentication status (isAuthenticated boolean)
- Loading states for auth operations

**Why Redux:**
- Auth state is needed across multiple components (Header, protected routes in future)
- Persists across route changes
- Centralized auth logic

---

### Local Component State

**What stays local:**

1. **Header:**
   - `isAuthDialogOpen` (UI-only, doesn't need to be global)

2. **ExclusiveDeals:**
   - `selectedCategory` (filter state, only relevant to this section)

3. **Forms:**
   - Form field values (managed by react-hook-form)
   - Field errors (managed by react-hook-form)
   - Form submission loading state

**Why local:**
- UI state that doesn't need to be shared
- Temporary state that resets when component unmounts
- Reduces Redux complexity

---

## E. FORM VALIDATION BEST PRACTICES

### 1. Validation Strategy

- **Client-side only** (for now, no API)
- **On blur** + **on submit**
- Real-time error display

### 2. Zod Schema Organization

- Separate schema per form
- Reusable field validators (e.g., email validator)
- Clear, user-friendly error messages

### 3. react-hook-form Setup

```javascript
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
} = useForm({
  resolver: zodResolver(loginSchema),
  mode: 'onBlur', // validate on blur
})
```

### 4. Error Display Pattern

```jsx
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    {...register('email')}
    className={errors.email ? 'border-red-500' : ''}
  />
  {errors.email && (
    <p className="text-sm text-red-500 mt-1">
      {errors.email.message}
    </p>
  )}
</div>
```

### 5. Submit Handler Pattern

```javascript
const onSubmit = async (data) => {
  try {
    // Mock API call (setTimeout to simulate async)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Dispatch Redux action
    dispatch(loginSuccess({
      id: 1,
      email: data.email,
      name: "Mock User",
      token: "mock-token-" + Date.now()
    }))

    // Reset form
    reset()

    // Close dialog (via prop callback)
    onClose()

  } catch (error) {
    // Handle error (future: show toast)
    console.error(error)
  }
}
```

---

## F. RESPONSIVE DESIGN STRATEGY

### Breakpoints (Tailwind defaults)

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md to lg)
- **Desktop:** > 1024px (lg+)

---

### Header Responsive Behavior

**Desktop (> 1024px):**
- Full horizontal layout
- All nav items visible
- Logo, Nav, Auth button in single row

**Tablet (640px - 1024px):**
- Same as desktop (can fit)

**Mobile (< 640px):**
- Logo + Auth button only
- Navigation hidden (future: hamburger menu - NOT in this phase)
- Simplified layout

**Implementation approach:**
- Use Tailwind responsive utilities: `hidden md:flex`, `flex-col md:flex-row`, etc.

---

### Deals Section Responsive Behavior

**Desktop (> 1024px):**
- 3 cards per row
- `grid-cols-1 lg:grid-cols-3`

**Tablet (640px - 1024px):**
- 2 cards per row
- `md:grid-cols-2`

**Mobile (< 640px):**
- 1 card per row (stacked)
- Full width cards

**Category Tabs:**
- Horizontal scroll on mobile if needed
- `overflow-x-auto` with `flex-nowrap`

---

## G. IMPLEMENTATION SEQUENCE

### Phase 1: Foundation (Tasks 1-5)
1. Install all dependencies
2. Configure TailwindCSS
3. Setup shadcn/ui
4. Create folder structure
5. Setup Redux store + auth slice

**Output:** Fully configured project ready for component development

---

### Phase 2: Routing (Task 6)
1. Setup React Router in `main.jsx` and `App.jsx`
2. Create `Home.jsx` page (empty for now)
3. Create `NotFound.jsx` page
4. Test routing works

**Output:** Working route navigation

---

### Phase 3: Header (Task 7)
1. Create `Header.jsx` component
2. Implement logo area (text placeholder)
3. Implement navigation menu
4. Implement auth button
5. Wire up dialog open/close state
6. Style with TailwindCSS
7. Test responsive behavior

**Output:** Functional header with navigation

---

### Phase 4: Auth Dialog (Task 8)
1. Create `AuthDialog.jsx` with shadcn Dialog + Tabs
2. Create LoginForm with fields
3. Implement Zod schema for login
4. Wire up react-hook-form
5. Create SignupForm with fields
6. Implement Zod schema for signup (including password match)
7. Wire up Redux dispatch on submit
8. Test form validation
9. Test Redux state updates

**Output:** Fully functional login/signup with validation

---

### Phase 5: Deals Section (Task 9)
1. Create mock data in `dealsData.js`
2. Create `CategoryTabs.jsx` component
3. Create `DealCard.jsx` component
4. Create `ExclusiveDeals.jsx` parent component
5. Implement category filtering logic
6. Style all components
7. Test responsive grid
8. Add hover effects

**Output:** Working deals section with filtering

---

### Phase 6: Integration (Task 10)
1. Add `ExclusiveDeals` to `Home.jsx`
2. Add `Header` to `App.jsx` layout
3. Test full page integration
4. Verify Redux DevTools shows state changes
5. Test all user flows:
   - Navigate home
   - Open auth dialog
   - Submit login form
   - Submit signup form
   - Filter deals by category
   - Navigate to 404

**Output:** Fully integrated homepage

---

### Phase 7: Responsive Polish (Task 11)
1. Test on mobile viewport (375px, 414px)
2. Test on tablet viewport (768px, 1024px)
3. Test on desktop (1440px, 1920px)
4. Fix any layout issues
5. Ensure all interactive elements are touch-friendly (min 44x44px)

**Output:** Production-ready responsive design

---

## H. ASSUMPTIONS & DECISIONS

### Assumptions Made

1. **Authentication:** Mock only, no real backend integration
2. **Persistence:** No localStorage for auth token (future enhancement)
3. **Images:** Placeholder paths, actual images added later by user
4. **Forms:** Email/password only, no social login
5. **Navigation:** Only Home is a real route, others are placeholders
6. **Deals:** Static mock data, no API calls
7. **Cart:** Not implemented (noticed in design but not in scope)
8. **Location:** Not implemented (noticed in design but not in scope)
9. **Top banner:** Not implemented (confirmed out of scope)

---

### Key Technical Decisions

1. **Redux Toolkit over plain Redux:** Modern, less boilerplate, better DX
2. **Zod over Yup:** Better TypeScript support (even though we're using JS), modern API
3. **shadcn/ui over MUI/Chakra:** Tailwind-native, copy-paste components, full control
4. **react-hook-form over Formik:** Better performance, smaller bundle, modern hooks API
5. **BrowserRouter over HashRouter:** Cleaner URLs, better for production
6. **CSS Grid for deals:** More control than Flexbox for card layouts
7. **Local state for UI, Redux for data:** Clear separation of concerns

---

### Standards to Follow

1. **File naming:** PascalCase for components, camelCase for utilities
2. **Component style:** Functional components only, hooks-based
3. **Props:** Destructure in function signature
4. **Exports:** Named exports for utilities, default for components
5. **Imports:** Group by: React, third-party, local (components, utils, data)
6. **Comments:** Only where necessary, prefer self-documenting code
7. **Tailwind:** Use utility classes, avoid custom CSS unless necessary
8. **Error handling:** User-friendly messages, console.error for debugging

---

## I. SUCCESS CRITERIA

### Definition of Done

1. ✅ All dependencies installed and configured
2. ✅ Project runs without errors (`npm run dev`)
3. ✅ Home route (`/`) displays homepage
4. ✅ 404 route (`*`) displays Not Found page
5. ✅ Header displays logo, navigation, auth button
6. ✅ Auth dialog opens/closes correctly
7. ✅ Login form validates and submits
8. ✅ Signup form validates (including password matching)
9. ✅ Redux state updates on login/signup
10. ✅ Deals section displays mock data
11. ✅ Category tabs filter deals correctly
12. ✅ Deal cards show discount, restaurant name, placeholder image
13. ✅ Responsive on mobile, tablet, desktop
14. ✅ No console errors or warnings
15. ✅ Code follows standards outlined above

---

## J. NEXT STEPS AFTER IMPLEMENTATION

### Future Enhancements (Not in Current Scope)

1. API integration for auth + deals
2. localStorage persistence for auth token
3. Protected routes (redirect if not authenticated)
4. Cart functionality
5. Location selector
6. Top promotional banner
7. Hero section (visible in design)
8. Mobile hamburger menu
9. Loading skeletons
10. Toast notifications for success/error feedback
11. Logout functionality in header (when user is logged in)
12. User profile display when authenticated

---

## Implementation Checklist

- [ ] Phase 1: Foundation
- [ ] Phase 2: Routing
- [ ] Phase 3: Header
- [ ] Phase 4: Auth Dialog
- [ ] Phase 5: Deals Section
- [ ] Phase 6: Integration
- [ ] Phase 7: Responsive Polish

---

**Status:** Ready for Implementation
**Next Action:** Install dependencies (Phase 1)
