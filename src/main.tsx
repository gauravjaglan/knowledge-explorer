import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './routes/App';
import Dashboard from './routes/dashboard';
import EditorPage from './routes/editorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/ke" element={<App />}>
      <Route path="/ke/dashboard" element={<Dashboard />}>
        <Route path=":id" element={<EditorPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
