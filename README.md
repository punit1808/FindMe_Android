# Find ME 📍

Find ME is a real-time group location-sharing mobile application built with Expo and React Native. Users can create groups, invite members, share live locations, and view member locations on an interactive map.

## Features

* Real-time location sharing
* Group creation and management
* Add and remove group members
* Live map displaying all group members
* Background location tracking
* WebSocket-based live location updates
* Copy member coordinates
* Focus map on a selected member's location
* Android APK builds using Expo EAS

---

## Tech Stack

### Frontend

* React Native
* Expo
* Expo Router
* React Native Maps
* Expo Location
* Expo Task Manager
* Expo Secure Store
* WebSockets

### Backend

* Spring Boot
* WebSocket/STOMP
* REST APIs

---

## Prerequisites

Before running the application, ensure you have:

* Node.js (18+ recommended)
* npm or yarn
* Expo CLI
* EAS CLI
* Android device or emulator
* Backend server running

Verify installations:

```bash
node -v
npm -v
npx expo --version
eas --version
```

---

## Clone Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

## Install Dependencies

```bash
npm install
```

or

```bash
yarn
```

---

## Environment Configuration

Create a `.env` file in the project root.

Example:

```env
EXPO_PUBLIC_API_URL=http://YOUR_BACKEND_URL
EXPO_PUBLIC_WS_URL=ws://YOUR_BACKEND_URL/ws
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

Replace the values with your own configuration.

---

## Running the Application

Start Expo:

```bash
npx expo start
```

For Android:

```bash
npx expo run:android
```

Or scan the QR code using Expo Go.

---

## Background Location Permissions

The application requires:

* Foreground Location Permission
* Background Location Permission

When launching the application for the first time, grant all requested permissions.

Without location permissions, real-time tracking will not function.

---

## Project Structure

```text
app/
 ├── group/
 ├── auth/
 └── tabs/

components/
 ├── LiveMap.tsx
 ├── MemberList.tsx
 ├── GroupCard.tsx
 └── AddMemberModal.tsx

hooks/
 ├── useGroup.ts
 ├── useGroups.ts
 └── useSocket.ts

utils/
 ├── api.ts
 ├── startBackgroundLocation.ts
 └── locationPermissions.ts
```

---

## Building APK Using Expo

Preview APK build:

```bash
eas build --platform android --profile preview
```

The generated APK can be downloaded from the Expo build dashboard.

Production build:

```bash
eas build --platform android --profile production
```

---

## Useful Commands

Start development server:

```bash
npx expo start
```

Check project health:

```bash
npx expo doctor
```

View Expo configuration:

```bash
npx expo config --type public
```

Check logged-in Expo account:

```bash
eas whoami
```

---

## Troubleshooting

### Location not updating

* Verify location permissions are granted
* Ensure GPS is enabled
* Confirm backend server is running
* Verify WebSocket endpoint is reachable

### Map not loading

* Verify Google Maps API key is configured
* Check internet connectivity
* Ensure react-native-maps is installed correctly

### Unable to connect to backend

* Verify API URL configuration
* Ensure backend service is running
* Check firewall/network restrictions

---

## License

This project is intended for educational and demonstration purposes.
