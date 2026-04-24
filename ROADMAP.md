# TasteTwin — Complete Execution Plan

> This is the single source of truth for building TasteTwin from its current UI-only state to a fully working, deployed application. Every chunk is self-contained and can be executed in one session. **Nothing is left out.**

---

## Current State Audit

### What EXISTS right now
| Layer | Status | Details |
|-------|--------|---------|
| **13 Screens** | ✅ UI Only | All hardcoded with placeholder data & remote Google image URLs |
| **Navigation** | ✅ Working | AuthStack (Splash→Onboarding→Preferences→Login) + MainStack (Tabs + Modals) |
| **Auth** | ✅ Real Auth | Supabase auth integrated in RootNavigator |
| **Supabase JS** | ✅ Implemented | `src/lib/supabase.ts` and `src/types/database.ts` created |
| **AsyncStorage** | ✅ Working | Used for Supabase session persistence |
| **Data Layer** | ✅ Implemented | React Query hooks setup for Profiles, Meals, Favorites |
| **Camera/Photos** | ✅ Working | `expo-image-picker` integrated, real camera/gallery selection |
| **AI Engine** | ❌ None | PredictionResultScreen shows hardcoded "Truffle Mushroom Risotto" |
| **Image Storage** | ✅ Working | Image upload utility implemented using Supabase Storage |
| **Notifications** | ❌ None | |
| **Deployment** | ❌ None | `app.json` still has default white splash, no bundle IDs |

### Files That Need Modification Per Phase
```
src/
├── lib/                    ← CREATE (Phase 3)
│   ├── supabase.ts         ← Supabase client
│   └── storage.ts          ← Image upload utility
├── hooks/                  ← CREATE (Phase 3-4)
│   ├── useAuth.ts          ← Real auth hook
│   ├── useProfile.ts       ← Profile data
│   ├── useMeals.ts         ← Meal history
│   ├── useFavorites.ts     ← Saved meals
│   └── useAnalyze.ts       ← AI analysis
├── types/                  ← CREATE (Phase 3)
│   └── database.ts         ← TypeScript types for all tables
├── navigation/
│   └── RootNavigator.tsx   ← MODIFY (Phase 3: real auth)
├── screens/
│   ├── LoginScreen.tsx     ← MODIFY (Phase 3: real sign in/up)
│   ├── HomeScreen.tsx      ← MODIFY (Phase 4: dynamic data)
│   ├── UploadScreen.tsx    ← MODIFY (Phase 4: real camera)
│   ├── ScanningProcessingScreen.tsx ← MODIFY (Phase 4: real AI call)
│   ├── PredictionResultScreen.tsx   ← MODIFY (Phase 4: dynamic result)
│   ├── HistoryScreen.tsx   ← MODIFY (Phase 4: Supabase query)
│   ├── FavoritesScreen.tsx ← MODIFY (Phase 4: Supabase query)
│   ├── ProfileScreen.tsx   ← MODIFY (Phase 4: real profile)
│   ├── PreferencesScreen.tsx ← MODIFY (Phase 4: save to DB)
│   ├── TwinScreen.tsx      ← MODIFY (Phase 5: matching algo)
│   └── RecommendationsScreen.tsx ← MODIFY (Phase 5: AI recs)
```

---

## PHASE 3 — Supabase Foundation

### Chunk 3A: Supabase Client & Types
**Goal:** Create the Supabase connection and TypeScript type system.

**Steps:**
1. Create `.env` file at project root:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```
2. Create `src/lib/supabase.ts`:
   - Initialize Supabase client with `createClient()`
   - Use `AsyncStorage` as the storage adapter for session persistence
   - Import `react-native-url-polyfill/auto` at the top
3. Create `src/types/database.ts`:
   - Define TypeScript interfaces for every table:
     - `Profile` (id, username, full_name, avatar_url, created_at)
     - `TasteProfile` (id, user_id, dietary_regimen, allergies[], flavor_affinities{}, favorite_cuisines[])
     - `MealLog` (id, user_id, image_url, name, restaurant, location, calories, protein, carbs, fat, fiber, sodium, sugar, flavor_tags[], ingredients[], ai_insight, pairing_suggestion, match_score, created_at)
     - `Favorite` (id, user_id, meal_log_id, created_at)

**Acceptance:** `supabase.from('profiles').select('*')` compiles without TS errors.

---

### Chunk 3B: Database Schema (SQL)
**Goal:** Create all tables in Supabase with proper relations and RLS.

**SQL to execute in Supabase Dashboard → SQL Editor:**

```sql
-- Profiles (auto-created on sign-up via trigger)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Taste Profiles
CREATE TABLE public.taste_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  dietary_regimen TEXT DEFAULT 'None',
  allergies TEXT[] DEFAULT '{}',
  flavor_affinities JSONB DEFAULT '{"spicy":0,"umami":0,"sweet":0,"sour":0,"bitter":0}',
  favorite_cuisines TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meal Logs
CREATE TABLE public.meal_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT,
  name TEXT NOT NULL,
  restaurant TEXT,
  location TEXT,
  calories INT,
  protein INT,
  carbs INT,
  fat INT,
  fiber INT,
  sodium INT,
  sugar INT,
  flavor_tags TEXT[] DEFAULT '{}',
  ingredients TEXT[] DEFAULT '{}',
  ai_insight TEXT,
  pairing_suggestion TEXT,
  match_score INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites (join table)
CREATE TABLE public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  meal_log_id UUID REFERENCES public.meal_logs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, meal_log_id)
);

-- Auto-create profile on sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  INSERT INTO public.taste_profiles (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taste_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Policies: users can only access their own data
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own taste profile" ON public.taste_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own taste profile" ON public.taste_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own meals" ON public.meal_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);
-- Allow viewing other users' meal_logs for TasteTwin social features
CREATE POLICY "Users can view all meals" ON public.meal_logs FOR SELECT USING (true);
```

**Acceptance:** Tables visible in Supabase Table Editor with RLS enabled.

---

### Chunk 3C: Real Authentication
**Goal:** Replace the mock `useState` auth with real Supabase auth.

**Steps:**
1. Refactor `src/navigation/RootNavigator.tsx`:
   - Import `supabase` from `src/lib/supabase`
   - Use `supabase.auth.getSession()` on mount to check for existing session
   - Listen to `supabase.auth.onAuthStateChange()` to toggle `isAuthenticated`
   - Pass `session` and `user` through `AuthContext`
2. Refactor `src/screens/LoginScreen.tsx`:
   - Add `useState` for email, password, loading, error
   - Wire "Sign in to Account" button to `supabase.auth.signInWithPassword({ email, password })`
   - Wire "Create your profile" to `supabase.auth.signUp({ email, password, options: { data: { full_name } } })`
   - Add a toggle between Sign In / Sign Up mode within the same screen
   - Show loading spinner on the button during auth
   - Show error message (red text below form) on failure
3. Refactor `src/screens/ProfileScreen.tsx`:
   - Wire logout button to `supabase.auth.signOut()`

**Acceptance:** User can sign up, be redirected to MainStack, close app, reopen, and still be logged in.

---

### Chunk 3D: State Management Setup
**Goal:** Install React Query and create reusable data-fetching hooks.

**Steps:**
1. Install: `npm install @tanstack/react-query`
2. Wrap `<App />` in `<QueryClientProvider>` in `App.tsx`
3. Create `src/hooks/useProfile.ts`:
   - `useProfile()` → fetches `profiles` + `taste_profiles` for current user
   - `useUpdateProfile()` → mutation to update profile
4. Create `src/hooks/useMeals.ts`:
   - `useMeals()` → fetches `meal_logs` for current user, ordered by `created_at DESC`
   - `useCreateMeal()` → mutation to insert a new meal log
5. Create `src/hooks/useFavorites.ts`:
   - `useFavorites()` → fetches `favorites` joined with `meal_logs` for current user
   - `useToggleFavorite()` → mutation to add/remove a favorite

**Acceptance:** `useProfile()` returns real data from Supabase when called in ProfileScreen.

---

## PHASE 4 — Core Features (Making It Real)

### Chunk 4A: Dynamic Profile & Preferences
**Goal:** ProfileScreen and PreferencesScreen show/save real data.

**Steps:**
1. Refactor `ProfileScreen.tsx`:
   - Use `useProfile()` hook to populate name, avatar, stats
   - Calculate stats: `meal_logs.count()` for "Analyzed", `favorites.count()` for "Recipes"
   - Display real flavor tags from `taste_profiles.flavor_affinities`
2. Refactor `PreferencesScreen.tsx`:
   - Load current `taste_profiles` on mount
   - Make diet cards, allergy chips, and flavor/cuisine chips all interactive with `useState`
   - On "Save Palate Profile" press → call `useUpdateTasteProfile()` mutation
   - Show success toast / navigate back

**Acceptance:** User selects "Vegan" + "Peanuts" allergy, saves, reopens Preferences — selections persist.

---

### Chunk 4B: Camera & Image Upload
**Goal:** UploadScreen uses real camera/gallery and uploads to Supabase Storage.

**Steps:**
1. Install: `npx expo install expo-image-picker`
2. Add plugin to `app.json`:
   ```json
   ["expo-image-picker", {
     "photosPermission": "TasteTwin needs access to your photos to analyze meals.",
     "cameraPermission": "TasteTwin needs camera access to scan your meals."
   }]
   ```
3. Create `src/lib/storage.ts`:
   - Function `uploadMealImage(userId, imageUri)`:
     - Read the file as a blob/arraybuffer
     - Upload to Supabase Storage bucket `meal-images` at path `{userId}/{timestamp}.jpg`
     - Return the public URL
4. Refactor `UploadScreen.tsx`:
   - "Camera" button → `ImagePicker.launchCameraAsync({ quality: 0.8, allowsEditing: true })`
   - "Gallery" button → `ImagePicker.launchImageLibraryAsync()`
   - On image selected → navigate to `ScanningProcessing` with the image URI as a route param
5. Update `MainStack.tsx` param types:
   - `ScanningProcessing: { imageUri: string }`
   - `PredictionResult: { mealData: MealLog }`

**Acceptance:** User takes a photo, sees it in the ScanningProcessing screen overlay.

---

### Chunk 4C: AI Meal Analysis (The Sommelier Engine)
**Goal:** ScanningProcessingScreen sends the image to an AI API and gets real nutrition data back.

**Architecture Decision:** API keys must NEVER be in the mobile app. Two options:
- **Option A (Recommended):** Supabase Edge Function
- **Option B:** Standalone Express/Next.js API

**Steps (Option A — Supabase Edge Function):**
1. Create edge function `supabase/functions/analyze-meal/index.ts`:
   ```typescript
   // Receives: { imageUrl: string }
   // Calls: Google Gemini 1.5 Flash Vision API
   // Prompt: "Analyze this food image. Return JSON: { name, calories, protein, carbs, fat, fiber, sodium, sugar, ingredients[], flavor_tags[], ai_insight, pairing_suggestion, match_score }"
   // Returns: parsed JSON
   ```
2. Deploy: `supabase functions deploy analyze-meal`
3. Refactor `ScanningProcessingScreen.tsx`:
   - Receive `imageUri` from route params
   - Display the actual captured image (not the placeholder steak)
   - On mount: upload image via `uploadMealImage()` → call edge function with public URL
   - On success: navigate to `PredictionResult` with the AI response data
   - On error: show error state with retry button
4. Refactor `PredictionResultScreen.tsx`:
   - Receive `mealData` from route params
   - Display all fields dynamically (name, calories, protein, carbs, fat, ingredients, insight, pairing)
   - "Save Meal" button → `useCreateMeal()` mutation → insert into `meal_logs`
   - "View Similar Meals" → navigate to Recommendations with flavor_tags as filter

**Acceptance:** User photographs a real plate of food → sees AI-generated name, calories, ingredients, and insight.

---

### Chunk 4D: History & Favorites (Live Data)
**Goal:** HistoryScreen and FavoritesScreen show real saved meals.

**Steps:**
1. Refactor `HistoryScreen.tsx`:
   - Use `useMeals()` hook
   - Map real data to the existing card UI
   - Implement filter chips (All, Breakfast, Lunch, Dinner) using `created_at` time ranges
   - Add pull-to-refresh with `RefreshControl`
   - Show empty state when no meals logged yet
2. Refactor `FavoritesScreen.tsx`:
   - Use `useFavorites()` hook
   - Map real data to the bento grid cards
   - Add "unfavorite" swipe-to-delete or long-press
3. Wire "Save Meal" button in `PredictionResultScreen.tsx`:
   - On press → insert into `meal_logs` AND `favorites`
   - Navigate back or show success toast

**Acceptance:** User scans 3 meals → sees all 3 in History → saves 1 → sees it in Favorites.

---

### Chunk 4E: Home Screen (Dynamic Feed)
**Goal:** HomeScreen shows personalized, real data.

**Steps:**
1. Refactor `HomeScreen.tsx`:
   - Greeting: Use `useProfile()` → "Good evening, {user.full_name}"
   - "Recent Journey" section: Use `useMeals()` with `limit(2)` → map to the existing card UI
   - "Curated" carousel: Use a Supabase query for highest-rated meals (by `match_score`) OR keep as AI-generated recommendations
   - Search bar: Implement client-side search filtering on `meal_logs` by name
   - Taste Twin preview card: Use `useTwinMatch()` hook (see Phase 5)

**Acceptance:** Home screen greets user by name and shows their last 2 meals.

---

## PHASE 5 — Advanced Features

### Chunk 5A: Taste Twin Matching Algorithm
**Goal:** TwinScreen shows real or AI-generated taste matches.

**Steps:**
1. Create `src/hooks/useTwinMatch.ts`:
   - Fetch current user's `taste_profiles`
   - Fetch all other users' `taste_profiles` (or use a pool of AI personas)
   - Calculate match score using **cosine similarity** on `flavor_affinities` vectors:
     ```
     similarity = dot(A,B) / (|A| * |B|)
     ```
   - Sort by score descending, return top 5
2. Refactor `TwinScreen.tsx`:
   - Hero section: Show #1 match with their avatar, name, and match %
   - Bento grid: Show matches #2-#5
   - Shared flavor tags: Intersection of both users' top flavor_tags

**Acceptance:** TwinScreen shows dynamically calculated match percentages.

---

### Chunk 5B: AI-Powered Recommendations
**Goal:** RecommendationsScreen shows personalized meal suggestions.

**Steps:**
1. Create a second Supabase Edge Function `recommend-meals`:
   - Input: User's `taste_profiles` (dietary_regimen, flavor_affinities, allergies)
   - AI Prompt: "Based on this user's taste profile: {profile}, recommend 5 meals. Return JSON array with: name, description, calories, protein, carbs, fat, match_percentage, image_description."
   - Returns: Array of recommendations
2. Refactor `RecommendationsScreen.tsx`:
   - Call the edge function on mount
   - Map AI response to the existing Featured + Secondary card layout
   - Use generated image descriptions with a placeholder food image system

**Acceptance:** RecommendationsScreen shows 5 personalized meals based on user preferences.

---

### Chunk 5C: Push Notifications (Optional)
**Goal:** Notify users about meal reminders and new Twin matches.

**Steps:**
1. Install: `npx expo install expo-notifications expo-device`
2. Request notification permissions on first app launch
3. Store push token in `profiles.push_token`
4. Set up Supabase Database Webhooks to trigger notifications when:
   - A new TasteTwin match exceeds 90%
   - Weekly meal summary

---

## PHASE 6 — Polish & Performance

### Chunk 6A: Image Performance
**Steps:**
1. Install: `npx expo install expo-image`
2. Replace ALL `<Image>` from `react-native` with `<Image>` from `expo-image` across all 13 screens
3. Add `placeholder` prop with blurhash strings for smooth loading
4. Replace hardcoded Google CDN URLs with Supabase Storage URLs where applicable

---

### Chunk 6B: Error Handling & Loading States
**Steps:**
1. Install: `npm install react-native-toast-message`
2. Add `<Toast />` component to `App.tsx`
3. Add error toasts to all mutations (sign-in failure, upload failure, AI timeout)
4. Create a reusable `<SkeletonCard />` component for loading states
5. Add `<SkeletonCard />` to HomeScreen, HistoryScreen, FavoritesScreen while data loads
6. Add empty state illustrations when lists are empty ("No meals yet — scan your first dish!")

---

### Chunk 6C: Smooth Animations
**Steps:**
1. Install: `npx expo install react-native-reanimated`
2. Add Reanimated babel plugin to `babel.config.js`
3. Upgrade `ScanningProcessingScreen.tsx` scanning line from basic `Animated` to Reanimated `useSharedValue` + `withRepeat(withTiming())`
4. Add `entering={FadeInDown}` / `exiting={FadeOutUp}` to list items in HistoryScreen
5. Add `<Pressable>` scale micro-animations on all card touches

---

## PHASE 7 — Deployment & Launch

### Chunk 7A: App Configuration
**Steps:**
1. Generate app icon (1024x1024) — dark background, the TasteTwin fork/knife icon in amber
2. Generate splash screen — same branding, `#131313` background
3. Update `app.json`:
   ```json
   {
     "expo": {
       "name": "TasteTwin",
       "slug": "tastetwin",
       "version": "1.0.0",
       "orientation": "portrait",
       "icon": "./assets/icon.png",
       "userInterfaceStyle": "dark",
       "splash": {
         "image": "./assets/splash.png",
         "resizeMode": "contain",
         "backgroundColor": "#131313"
       },
       "ios": {
         "bundleIdentifier": "com.tastetwin.app",
         "supportsTablet": false,
         "infoPlist": {
           "NSCameraUsageDescription": "TasteTwin uses the camera to scan and analyze your meals.",
           "NSPhotoLibraryUsageDescription": "TasteTwin needs photo access to analyze food images."
         }
       },
       "android": {
         "package": "com.tastetwin.app",
         "adaptiveIcon": {
           "foregroundImage": "./assets/adaptive-icon.png",
           "backgroundColor": "#131313"
         },
         "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE"]
       }
     }
   }
   ```

---

### Chunk 7B: Build & Submit
**Steps:**
1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Set environment variables in EAS:
   ```
   eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://..."
   eas secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJ..."
   ```
5. Build Android: `eas build --platform android --profile production`
6. Build iOS: `eas build --platform ios --profile production`
7. Submit Android: `eas submit --platform android`
8. Submit iOS: `eas submit --platform ios`

---

## Execution Order (Recommended)

| Order | Chunk | Est. Effort | Dependencies |
|-------|-------|-------------|--------------|
| 1 | 3A: Supabase Client & Types | Small | ✅ Done |
| 2 | 3B: Database Schema | Small | ✅ Done |
| 3 | 3C: Real Authentication | Medium | ✅ Done |
| 4 | 3D: State Management | Medium | ✅ Done |
| 5 | 4A: Dynamic Profile & Prefs | Medium | ✅ Done |
| 6 | 4B: Camera & Upload | Medium | ✅ Done |
| 7 | 4C: AI Meal Analysis | Large | ✅ Done |
| 8 | 4D: History & Favorites | Medium | ✅ Done |
| 9 | 4E: Home Screen Dynamic | Medium | 3D, 4D |
| 10 | 5A: Twin Matching | Medium | 3D |
| 11 | 5B: AI Recommendations | Medium | 4C |
| 12 | 6A: Image Performance | Small | None |
| 13 | 6B: Error Handling | Small | 3D |
| 14 | 6C: Animations | Small | None |
| 15 | 7A: App Configuration | Small | None |
| 16 | 7B: Build & Submit | Medium | All above |

---

> **To execute:** Tell me "Do Chunk 3A" (or any chunk ID) and I will implement it completely.
