# React User Management System

A modern React application with Firebase Authentication and Firestore database integration, featuring responsive design and automatic deployment via GitHub Actions.

## Features

- 🔐 Firebase Authentication (Email/Password)
- 💾 Firestore Database for user data storage
- 🛡️ Protected Routes
- 📱 Responsive Design with Tailwind CSS
- 🛒 Product Management System
- 👤 User Profile Management
- 🚀 Automatic Deployment via GitHub Actions

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/jyothis0000/Firebase-React-Product-Site-.git
cd Firebase-React-Product-Site-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Update `src/firebase/config.js` with your project credentials

### 4. Start Development Server
```bash
npm run dev
```

## Deployment

### Manual Deployment
```bash
# Build and deploy to Firebase
npm run deploy

# Deploy only hosting
npm run deploy:hosting
```

### Automatic Deployment (GitHub Actions)

This project is configured with GitHub Actions for automatic deployment to Firebase Hosting.

#### Setup GitHub Actions:
1. **Push your code to GitHub** (already done)
2. **GitHub Actions will automatically run** on every push to `main` branch
3. **Automatic deployment** to Firebase Hosting

#### Workflow Details:
- **Trigger**: Push to `main` branch
- **Build**: Automatic npm install and build
- **Deploy**: Automatic Firebase deployment
- **Status**: Check Actions tab in your GitHub repository

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (AuthContext)
├── firebase/           # Firebase configuration and services
├── pages/              # Page components
├── routes/             # Routing configuration
├── .github/workflows/  # GitHub Actions workflows
└── App.jsx            # Main application component
```

## Firebase Services Used

- **Authentication**: Email/password sign up and sign in
- **Firestore**: User data storage (profile information)
- **Hosting**: Web application hosting
- **Security Rules**: Basic security for user data

## Security Rules (Firestore)

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Features

- **User Registration**: Create new accounts with email/password
- **User Login**: Secure authentication with Firebase
- **Protected Routes**: Products page requires authentication
- **User Profile**: Display user information in navigation
- **Logout**: Secure sign out functionality
- **Responsive Design**: Works on all device sizes
- **Category Filtering**: Filter products by category
- **Sticky Navigation**: Always accessible header

## Technologies Used

- React 19
- Firebase 10
- React Router DOM
- Tailwind CSS
- Vite
- GitHub Actions

## Deployment URLs

- **Live App**: https://react-user-managment-site.web.app
- **GitHub Repo**: https://github.com/jyothis0000/Firebase-React-Product-Site-

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check your Firebase configuration in `src/firebase/config.js`
   - Ensure API key is correct

2. **"Firebase: Error (auth/user-not-found)"**
   - User doesn't exist, create an account first
   - Check if email is correct

3. **"Firebase: Error (auth/wrong-password)"**
   - Incorrect password entered
   - Use the password you set during registration

4. **Deployment Issues**
   - Check GitHub Actions tab for build errors
   - Ensure Firebase project ID is correct
   - Verify Firebase CLI is properly configured

### Development Tips

- Use browser developer tools to check for console errors
- Verify Firebase project settings and enabled services
- Check Firestore security rules if data access fails
- Monitor GitHub Actions for deployment status

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

## Support

For support and questions:
- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Open an issue in this repository
