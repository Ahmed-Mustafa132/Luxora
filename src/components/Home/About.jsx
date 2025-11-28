import Visible from "../Visible/Visible";
import before from "./assets/before.png";
import about1 from "./assets/about1.jpg";
import about2 from "./assets/about2.jpg";
import Home from "./assets/icon-home1.png";
import { FaSwimmingPool, FaCheckCircle } from "react-icons/fa";
import { PiLampPendantBold } from "react-icons/pi";

export default function About() {
  return (
    <div
      className="flex flex-col lg:flex-row justify-between items-center bg-no-repeat bg-right-bottom pt-12 px-6 md:px-12 lg:px-20 gap-12 dark:bg-darkChocolate"
      style={{ backgroundImage: `url(${Home})` }}
    >
      {/* Left Section */}
      <Visible
        direction="right"
        delay={100}
        className="flex flex-col gap-6 max-w-full lg:max-w-xl"
      >
        {/* Title */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <img src={before} alt="img" className="w-8 md:w-10" />
          <div className="text-coffee text-sm md:text-base tracking-[0.3em]">
            LUXURY HOTELER
          </div>
          <img src={before} alt="img" className="w-8 md:w-10" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          We Provide Outdoor Activities To All Visitors
        </h2>

        {/* Description */}
        <div className="text-coffee text-base md:text-xl">
          San Francisco has hills with views, the coast, excellent food & has
          been voted the happiest, healthiest and fittest city in the States
          many times.
        </div>

        {/* Icons Section */}
        <div className="flex flex-col sm:flex-row justify-start gap-6">
          <div className="flex items-center gap-4 text-xl">
            <FaSwimmingPool className="text-coffee text-3xl" />
            <div>The Best Swimming</div>
          </div>
          <div className="flex items-center gap-4 text-xl">
            <PiLampPendantBold className="text-coffee text-3xl" />
            <div>The Best Lighting</div>
          </div>
        </div>

        {/* Features List */}
        <ul className="flex flex-col gap-2 text-sm md:text-base">
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-coffee" />
            <p>
              It is a long fact that a reader will be distracted by the readable
            </p>
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-coffee" />
            <p>Lorem Ipsum is simply dummy of the printing and industry</p>
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-coffee" />
            <p>There are many variations of Lorem Ipsum majority</p>
          </li>
        </ul>

        {/* Button */}
        <button className="w-max px-6 py-3 bg-coffee text-white hover:bg-black transition-all duration-200">
          DISCOVER MORE
        </button>
      </Visible>

      {/* Right Section */}
      <Visible
        direction="left"
        delay={100}
        className="relative flex flex-col items-center"
      >
        <div className="relative">
          <img
            src={about1}
            alt="about"
            className="w-full max-w-[300px] border-[15px] border-[#eeeeee] relative z-10"
          />
          <img
            src={about2}
            alt="about"
            className="absolute top-[-50px] left-[-100px] w-full max-w-[200px] border-[15px] border-[#eeeeee] hidden sm:block"
          />
        </div>
      </Visible>
    </div>
  );
}
