import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./assets/logo-2.png"; // Assuming you have a logo image

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navlist = [
    { name: "Home", href: "/" },
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
    { name: "Services", href: "services" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        // Use a debounce function to optimize performance
        let timeout;
        clearTimeout(timeout); // Clear any existing timeout

        timeout = setTimeout(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const threshold = 100; // Adjust this value as needed
          setIsVisible(scrollTop > threshold);
        }, 100); // Adjust delay as needed
      } else {
        setIsVisible(true); // Always show on other routes
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Set initial visibility based on location
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // Add location to the dependency array to trigger the effect when location changes
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`z-50 fixed top-0 left-0 w-full shadow-md transition-all duration-300 ${isVisible
          ? "bg-white dark:bg-gray-800"
          : "-translate-y-full bg-transparent"
        }`}
    >
      <div className="z-50 flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <nav className=" sm:flex items-center space-x-4 hidden">
          <ul className="flex items-center space-x-4">
            {navlist.map((item) => (
              <li
                key={item.name}
                className="relative text-gray-800 dark:text-white hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300"
              >
                <span
                  className="block py-2 px-3 rounded  cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                  }}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-blue-500 transition focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden block p-2 rounded-md focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`h-screen fixed w-full`}
          style={{
            top: isMobileMenuOpen ? "0" : "-100%",
            transition: "top 0.3s ease-in-out",
            zIndex: isMobileMenuOpen ? 50 : 6,
          }}
          onClick={(e) => {
            toggleMobileMenu(); // Prevent click from closing the menu
          }}
        >
          <ul
            className={`z-10 sm:hidden fixed  top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? " top-19" : "-translate-y-full"
              }`}
          >
            {navlist.map((item) => (
              <li
                key={item.name}
                className="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <span
                  className="block text-gray-800 hover:text-yellow-300 dark:text-white dark:hover:text-yellow-300 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    toggleMobileMenu();
                  }}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
