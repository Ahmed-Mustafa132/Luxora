import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/Auth.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/contact/contact.jsx";
import Rooms from "./pages/RoomsAndSuits/Rooms.jsx";
import RoomsAndSuits from "./pages/RoomsAndSuits/RoomsAndSuits.jsx";
import RoomsDetails from "./pages/RoomsAndSuits/roomsDetails.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import User from "./pages/User.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import RoomsDashboard from "./pages/Dashboard/Rooms.jsx";
import UserDashboard from "./pages/Dashboard/Users.jsx";
import UserDetails from "./pages/Dashboard/user.jsx";

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
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/roomsAndSuits", element: <RoomsAndSuits /> },
      { path: "/roomsDetails", element: <RoomsDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/user/me", element: <User /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/rooms", element: <RoomsDashboard /> },
      { path: "/dashboard/users", element: <UserDashboard /> },
      { path: "/dashboard/users/:id", element: <UserDetails /> },
      { path: "*", element: <NotFound /> },
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
