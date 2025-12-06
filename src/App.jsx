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
import Services from "./pages/RoomsAndSuits/Services.jsx";
import RoomsDetails from "./pages/RoomsAndSuits/roomsDetails.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import User from "./pages/User.jsx";
import Book from "./pages/Book.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import RoomsDashboard from "./pages/Dashboard/room/Rooms.jsx";
import RoomDetails from "./pages/Dashboard/room/RoomDetails.jsx";
import UserDashboard from "./pages/Dashboard/user/Users.jsx";
import UserDetails from "./pages/Dashboard/user/user.jsx";
import BookDashboard from "./pages/Dashboard/book/Bookings.jsx";
import Bookinfo from "./pages/Dashboard/book/BookInfo.jsx";
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
      { path: "/Services", element: <Services /> },
      { path: "/roomsDetails", element: <RoomsDetails /> },
      { path: "/book", element: <Book /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/user/me", element: <User /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/rooms", element: <RoomsDashboard /> },
      { path: "/dashboard/rooms/:id", element: <RoomDetails /> },
      { path: "/dashboard/users", element: <UserDashboard /> },
      { path: "/dashboard/users/:id", element: <UserDetails /> },
      { path: "/dashboard/bookings", element: <BookDashboard /> },
      { path: "/dashboard/bookings/:id", element: <Bookinfo /> },
      { path: "*", element: <NotFound /> },
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
