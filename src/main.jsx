import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import DashboardContext from './context/Dashboard.jsx'
import QueryProvider from './providers/QueryProvider.jsx'
import ProfileProvider from './context/Profile.jsx'
import SocialAccountProvider from './context/SocialAccount.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <DashboardContext>
        <NextUIProvider>
          <QueryProvider>
            <SocialAccountProvider>
              <ProfileProvider>
                <App />
              </ProfileProvider>
            </SocialAccountProvider>
          </QueryProvider>
        </NextUIProvider>
      </DashboardContext>
    </React.StrictMode>
  </BrowserRouter>
)
