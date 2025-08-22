# React Redux RTK Query - TypeScript Industry Standard Setup

## Project Structure

```
src/
├── app/                          # Redux store configuration
│   ├── store.ts
│   ├── rootReducer.ts
│   ├── middleware.ts
│   └── hooks.ts                  # Typed hooks
├── features/                     # Feature-based organization
│   ├── auth/
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── slice/
│   │   │   └── authSlice.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   ├── products/
│   │   ├── api/
│   │   │   └── productsApi.ts
│   │   ├── components/
│   │   │   ├── ProductList.tsx
│   │   │   └── ProductCard.tsx
│   │   ├── hooks/
│   │   │   └── useProducts.ts
│   │   ├── slice/
│   │   │   └── productsSlice.ts
│   │   ├── types/
│   │   │   └── products.types.ts
│   │   └── index.ts
│   └── users/
│       ├── api/
│       │   └── usersApi.ts
│       ├── components/
│       │   └── UserProfile.tsx
│       ├── hooks/
│       │   └── useUsers.ts
│       ├── slice/
│       │   └── usersSlice.ts
│       ├── types/
│       │   └── users.types.ts
│       └── index.ts
├── shared/                       # Shared utilities and components
│   ├── api/
│   │   ├── baseApi.ts
│   │   ├── apiHelpers.ts
│   │   └── endpoints.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loader.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   └── forms/
│   │       ├── FormField.tsx
│   │       └── FormWrapper.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── usePagination.ts
│   ├── types/
│   │   ├── api.types.ts
│   │   ├── common.types.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validation.ts
│   │   └── formatters.ts
│   └── constants/
│       ├── apiEndpoints.ts
│       └── appConfig.ts
├── types/                        # Global type definitions
│   ├── global.d.ts
│   └── env.d.ts
└── main.tsx
```

## Core Configuration Files

### 1. Store Configuration (`app/store.ts`)

```typescript
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@/shared/api/baseApi";
import { rootReducer } from "./rootReducer";
import { customMiddleware } from "./middleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(baseApi.middleware)
      .concat(customMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Typed Redux Hooks (`app/hooks.ts`)

```typescript
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 3. Root Reducer (`app/rootReducer.ts`)

```typescript
import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "@/shared/api/baseApi";
import { authSlice } from "@/features/auth/slice/authSlice";
import { productsSlice } from "@/features/products/slice/productsSlice";
import { usersSlice } from "@/features/users/slice/usersSlice";

export const rootReducer = combineReducers({
  // RTK Query API slice
  [baseApi.reducerPath]: baseApi.reducer,

  // Feature slices
  auth: authSlice.reducer,
  products: productsSlice.reducer,
  users: usersSlice.reducer,
});
```

### 4. Base API Configuration (`shared/api/baseApi.ts`)

```typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "@/app/store";
import { logout } from "@/features/auth/slice/authSlice";
import { API_BASE_URL } from "@/shared/constants/apiEndpoints";

// Base query with auth and error handling
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("content-type", "application/json");
    return headers;
  },
});

// Base query with re-authentication
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 unauthorized responses
  if (result.error && result.error.status === 401) {
    // Try to get a new token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult.data) {
      // Retry the original query with new token
      const retryResult = await baseQuery(args, api, extraOptions);
      return retryResult;
    } else {
      // Refresh failed, logout user
      api.dispatch(logout());
    }
  }

  return result;
};

// Create the main API slice
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Product", "Order"],
  endpoints: () => ({}),
});
```

## Type Definitions

### 5. Common Types (`shared/types/common.types.ts`)

```typescript
// API Response wrapper
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Base Entity
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Error types
export interface ApiError {
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Form validation
export interface ValidationError {
  field: string;
  message: string;
}
```

### 6. Auth Types (`features/auth/types/auth.types.ts`)

```typescript
import { BaseEntity } from "@/shared/types/common.types";

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified: boolean;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
```

## Feature Implementation Examples

### 7. Auth Slice (`features/auth/slice/authSlice.ts`)

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../types/auth.types";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.error = null;

      // Persist to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, setLoading, setError, clearError } =
  authSlice.actions;
```

### 8. Auth API (`features/auth/api/authApi.ts`)

```typescript
import { baseApi } from "@/shared/api/baseApi";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  User,
} from "../types/auth.types";
import { ApiResponse } from "@/shared/types/common.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    signup: builder.mutation<ApiResponse<User>, SignupRequest>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),

    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    refreshToken: builder.mutation<
      ApiResponse<{ token: string }>,
      { refreshToken: string }
    >({
      query: ({ refreshToken }) => ({
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
```

### 9. Custom Auth Hook (`features/auth/hooks/useAuth.ts`)

```typescript
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLoginMutation, useLogoutMutation } from "../api/authApi";
import {
  setCredentials,
  logout as logoutAction,
  setError,
  clearError,
} from "../slice/authSlice";
import { LoginRequest } from "../types/auth.types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        dispatch(clearError());
        const result = await loginMutation(credentials).unwrap();

        if (result.success) {
          dispatch(setCredentials(result.data));
          return result.data;
        }
      } catch (error: any) {
        dispatch(setError(error.data?.message || "Login failed"));
        throw error;
      }
    },
    [dispatch, loginMutation]
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      // Logout even if API call fails
      console.error("Logout API error:", error);
    } finally {
      dispatch(logoutAction());
    }
  }, [dispatch, logoutMutation]);

  return {
    ...authState,
    login,
    logout,
    isLoginLoading,
    isLogoutLoading,
  };
};
```

## Environment Setup

### 10. Environment Variables (`.env`)

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=My App
VITE_APP_VERSION=1.0.0

# Features flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_LOGGING=true

# Third-party services
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=
```

### 11. TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Package Dependencies

### 12. Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.3",
    "@reduxjs/toolkit": "^1.9.7",
    "react-router-dom": "^6.16.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
```

## Best Practices Summary

1. **Feature-based Architecture**: Each feature is self-contained with its own API, components, hooks, and types
2. **Strict TypeScript**: All files use TypeScript with strict configuration
3. **RTK Query**: Centralized API management with caching, invalidation, and error handling
4. **Typed Redux**: Custom hooks ensure type safety throughout the application
5. **Error Handling**: Consistent error handling patterns across API calls
6. **Code Organization**: Clear separation of concerns with dedicated folders for types, hooks, and utilities
7. **Reusable Components**: Shared components and utilities for consistency
8. **Environment Configuration**: Proper environment variable management
9. **Path Mapping**: Clean import paths using TypeScript path mapping

This setup provides a solid foundation for building scalable React applications with Redux Toolkit and RTK Query while maintaining type safety and code quality standards.
