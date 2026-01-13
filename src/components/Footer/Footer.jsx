import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";
import Visible from "../Visible/Visible";
import logo from "./assets/logo.png";
export default function Footer() {
  return (
    <Visible direction="up" duration={700} delay={1} className="bg-black">
      <footer className=" text-gray-300 px-6 md:px-16 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo + Text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Logo" />
            </div>
            <p className="text-sm mb-6">
              Feel free to reach out if you want collaborate with us, or simply
              chat.
            </p>
            <div className="flex bg-[#1e1a16] p-2">
              <label htmlFor="email-subscription" className="sr-only">
                Email Address
              </label>
              <input
                id="email-subscription"
                type="email"
                placeholder="Email Address"
                className="bg-transparent outline-none text-sm px-2 w-full placeholder-gray-400"
              />
              <button
                className="text-coffee"
                id="send"
                name="send"
                aria-label="Subscribe to newsletter"
              >
                <FaTelegramPlane className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Store Directory
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Top Hotels
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Quick Links
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Important Links
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Insights
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Knowledge Center
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Home
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                About Us
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Services
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Career
              </li>
              <li className=" relative hover:text-coffee dark:hover:text-coffee transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-coffee after:transition-all after:duration-300">
                Contact
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-2">
                New York
              </h3>
              <p className="text-sm">
                2464 Royal Ln. Mesa,
                <br />
                New Jersey 45463
                <br />
                (000) 222-0000
                <br />
                info@yourwebsite.com
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">London</h3>
              <p className="text-sm">
                1901 Thorn ridge Cir.
                <br />
                Shiloh, Hawaii 81063
                <br />
                (000) 000-0000
                <br />
                info@yourwebsite.com
              </p>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-10 flex items-center gap-4 text-white text-lg">
          <span className="font-bold text-white text-xl">Follow Us</span>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Follow us on Facebook">
              <FaFacebookF className="text-white text-xl hover:text-coffee" />
            </a>
            <a href="#" aria-label="Follow us on Instagram">
              <FaInstagram className="text-white text-xl hover:text-coffee" />
            </a>
            <a href="#" aria-label="Follow us on LinkedIn">
              <FaLinkedinIn className="text-white text-xl hover:text-coffee" />
            </a>
            <a href="#" aria-label="Follow us on Telegram">
              <FaTelegramPlane className="text-white text-xl hover:text-coffee" />
            </a>
          </div>
        </div>
      </footer>
    </Visible>
  );
}
