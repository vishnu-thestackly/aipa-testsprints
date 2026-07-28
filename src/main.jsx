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
    <GoogleOAuthProvider clientId="95599438061-mrd1t6c3havsfjrej19kmuqmbd5vhto5.apps.googleusercontent.com">
      <OnboardingProvider>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
      </OnboardingProvider>

    </GoogleOAuthProvider>
</React.StrictMode>
)
