# LYFeX Talent Marketplace

A modern talent marketplace platform that connects Hirers (companies) with Hirees (professionals) using React, TypeScript, and Firebase.

## Features

### 🔐 Authentication
- **Google Authentication** - Sign in with Google account
- **LinkedIn Authentication** - Sign in with LinkedIn account
- **Email/Password Authentication** - Traditional login system
- **Firebase Integration** - Secure authentication and data storage

### 👥 User Types
- **Hirers** - Companies looking to hire talent
- **Hirees** - Professionals looking for job opportunities

### 🏢 Hirer Features
- Complete company profile registration
- Browse and search candidates
- Filter by skills, experience, and location
- View detailed candidate profiles
- Contact candidates directly
- Dashboard with analytics

### 👤 Hiree Features
- Comprehensive professional profile creation
- Skill and experience management
- Education and past experience tracking
- Job preferences and salary expectations
- Profile image upload
- Receive job offers
- Dashboard with job offer management

### 🎨 UI/UX
- Modern, responsive design
- Tailwind CSS styling
- Lucide React icons
- Smooth animations and transitions
- Mobile-friendly interface

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Storage**: Firebase Storage
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project-bolt-sb1-wrlgazga/project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Configuration

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication with Google and LinkedIn providers
4. Create a Realtime Database
5. Enable Storage

#### Update Firebase Config
1. Go to Project Settings > General
2. Scroll down to "Your apps" section
3. Add a web app if not already added
4. Copy the Firebase config object

#### Update Configuration File
Edit `src/config/firebase.ts` and replace the placeholder config with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 4. Configure Authentication Providers

#### Google Authentication
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable Google provider
3. Add your authorized domains

#### LinkedIn Authentication
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable LinkedIn provider
3. Configure LinkedIn OAuth settings

### 5. Database Rules
Set up Firebase Realtime Database rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "hirers": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "hirees": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### 6. Storage Rules
Set up Firebase Storage rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile-images/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 7. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── candidates/     # Candidate-related components
│   ├── common/         # Shared components (Header, Footer)
│   ├── home/          # Home page components
│   └── layout/        # Layout components
├── config/
│   └── firebase.ts    # Firebase configuration
├── context/
│   └── AuthContext.tsx # Authentication context
├── data/
│   └── mockData.ts    # Mock data for development
├── pages/
│   ├── HomePage.tsx
│   ├── Login.tsx
│   ├── Registration.tsx
│   ├── HirerRegistration.tsx
│   ├── HireeRegistration.tsx
│   ├── HirerDashboard.tsx
│   ├── HireeDashboard.tsx
│   ├── WaitingForOffers.tsx
│   └── CandidateProfile.tsx
├── types/
│   └── index.ts       # TypeScript type definitions
└── App.tsx           # Main application component
```

## Usage

### For Hirers (Companies)
1. Click "Register" on the homepage
2. Select "Register as Hirer"
3. Fill in company information
4. Complete registration
5. Access Hirer Dashboard to browse candidates

### For Hirees (Professionals)
1. Click "Register" on the homepage
2. Select "Register as Hiree"
3. Fill in professional profile
4. Upload profile image
5. Complete registration
6. Wait for job offers or access Hiree Dashboard

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables
Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@lyfex.com or create an issue in the repository. 