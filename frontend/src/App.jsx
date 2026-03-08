import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/normal/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { useEffect } from "react";
import axios from "axios";
import { useDmStore } from "./store/useDmStore";
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
const App = () => {
   const setCurrentUser = useDmStore((state) => state.setCurrentUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL;

        const res = await axios.get(`${url}/user/me`, {
          withCredentials: true,
        });

        setCurrentUser(res.data.data);
      } catch (error) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, []);
  return <RouterProvider router={router} />
}

export default App
