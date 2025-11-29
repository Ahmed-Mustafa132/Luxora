import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/Auth.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Rooms from "./pages/RoomsAndSuits/Rooms.jsx";
import RoomsAndSuits from "./pages/RoomsAndSuits/RoomsAndSuits.jsx";
import RoomsDetails from "./pages/RoomsAndSuits/roomsDetails.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import User from "./pages/User.jsx";
// Dashboard
import RoomsDashboard from "./pages/Dashboard/Rooms.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/roomsAndSuits", element: <RoomsAndSuits /> },
      { path: "/roomsDetails", element: <RoomsDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/user/me", element: <User /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/rooms", element: <RoomsDashboard /> },
      // يمكنك إضافة صفحات أخرى هنا
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
