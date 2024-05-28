import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './ErrorPage.tsx'
import App from './App.tsx'
import Videos from './Videos.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "videos/titi",
        element: <Videos />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </React.StrictMode>,
)
