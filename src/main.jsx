import { StrictMode} from 'react'
import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { OnboardingProvider } from "./context/OnboardingContext";
import { SubscriptionProvider } from './context/SubscriptionContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <OnboardingProvider>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
      </OnboardingProvider>

    </GoogleOAuthProvider>
</React.StrictMode>
)
