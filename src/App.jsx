import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound  /> },


      // يمكنك إضافة صفحات أخرى هنا
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
