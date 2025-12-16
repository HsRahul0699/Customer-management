## Features

- **Fetch customers from a remote GraphQL API**
- **Persist data locally using Realm**
- **Offline-capable**: Cached data is shown when network is unavailable
- **Pagination support** using persisted nextToken
- **Filter customers by role** (All, Admin, Manager)
- **Add, update, and delete customers** locally
- **Clean and maintainable architecture** using hooks and services
- **Search functionality** to find customers by name or email locally
- **Pull-to-refresh** to sync data with the server

## Tech Stack

- **React Native** - Mobile framework
- **TypeScript** - Type safety
- **Apollo Client** - GraphQL client
- **Realm** - Local database

## Setup & Run Instructions

This project can be run using either Yarn or npm.

### Install dependencies

**Using yarn**

```bash
yarn install
```

### iOS Setup

```bash
cd ios
pod install
cd ..
```

**Run the app:**

```bash
yarn ios
# or
npx react-native run-ios
```

### Android Setup

Make sure an emulator or device is running.

```bash
yarn android
# or
npx react-native run-android
```

## Tests

Some basic tests are included for:

- Database operations (CRUD)
- Customer filtering logic
- Form validation
- Customer grouping and search
- Custom hooks

**Run tests using:**

```bash
yarn test
```

**Run tests on a specific file example**

```bash
yarn test useAddCustomerHook.test.ts
```

All tests are organized in the `__tests__/` directory:

- `__tests__/database/` - Database service tests
- `__tests__/hooks/` - Custom hook tests
- `__tests__/utils/` - Utility function tests

## Project Structure

```
zeller/
├── __tests__/              # All test files
│   ├── database/
│   ├── hooks/
│   └── utils/
├── src/
│   └── app/
│       ├── components/      # Reusable components
│       ├── database/        # Realm database service
│       ├── graphql/         # Apollo Client setup & queries
│       ├── navigation/      # Navigation configuration
│       ├── screens/         # Screen components
│       ├── styles/          # Style definitions
│       └── utils/           # Utilities, hooks, types
├── ios/                     # iOS native code
├── android/                 # Android native code
└── App.tsx                  # App entry point
```

## Configuration

### GraphQL Configuration

The app connects to AWS AppSync for GraphQL queries. Configuration is stored in:

- `src/app/config/awsconfig.ts` - AWS AppSync endpoint and API key

## Clean Project Guidelines

- `node_modules` is not committed
- `android/local.properties` is not committed as it contains machine-specific paths
- On a fresh clone, Android Studio will automatically generate `local.properties`
- If you see `SDK location not found`, ensure the Android SDK is installed and the `ANDROID_HOME` environment variable is set
- Only required dependencies and files are included
- The project runs without errors on a clean install using:

```bash
yarn install
```

### Pod Install Issues

If `pod install` fails:

```bash
cd ios
pod deintegrate
pod install
cd ..
```

---
