import Visible from "../Visible/Visible";
import before from "./assets/before.png";
import about1 from "./assets/about1.jpg";
import about2 from "./assets/about2.jpg";
import Home from "./assets/icon-home1.png";
import { FaSwimmingPool, FaCheckCircle } from "react-icons/fa";
import { PiLampPendantBold } from "react-icons/pi";
export default function about() {
  return (
    <div
      className="flex justify-between items-center bg-no-repeat bg-right-bottom pt-12 px-20 dark:bg-darkChocolate"
      style={{ backgroundImage: `url(${Home})` }}
    >
      <Visible
        direction="right"
        delay={100}
        className="flex justify-between items-start flex-col gap-9 max-w-xl"
      >
        <div className="flex justify-center items-center gap-8">
          <img src={before} alt="img" />
          <div className="text-coffee " style={{ letterSpacing: "10px" }}>
            LUXURY HOTELER
          </div>
          <img src={before} alt="img" />
        </div>
        <h2 className="text-4xl">
          We Provide Outdoor Activities To All Visitors
        </h2>
        <div className="text-coffee text-2xl">
          San Francisco has hills with views, the coast, excellent food & has
          been voted the happiest, healthiest and fittest city in the States
          many times.
        </div>
        <div className="flex justify-between items-center  ">
          <div className="flex justify-center items-center gap-7 text-3xl">
            <FaSwimmingPool className="text-coffee text-5xl " />
            <div className="w-36 h-max">The Best Swimming</div>
          </div>
          <div className="flex justify-center items-center gap-7 text-3xl">
            <PiLampPendantBold className="text-coffee text-5xl" />
            <div className="w-36 h-max">The Best Lighting</div>
          </div>
        </div>
        <ul className="flex justify-start items-start flex-col gap-2">
          <li className="flex justify-center items-center gap-2">
            <FaCheckCircle className="text-coffee" />
            <p>
              It is a long fact that a reader will be distracted by the readable
            </p>
          </li>
          <li className="flex justify-center items-center gap-2">
            <FaCheckCircle className="text-coffee" />
            <p>Lorem Ipsum is simply dummy of the printing and industry</p>
          </li>
          <li className="flex justify-center items-center gap-2">
            <FaCheckCircle className="text-coffee" />
            <p>There are many variations of Lorem Ipsum majority</p>
          </li>
        </ul>
        <button className="p-6 bg-coffee text-white hover:bg-black">DISCOVER MORE</button>
      </Visible>
      <Visible
        direction="left"
        delay={100}
        className="before:container  before:w-full  before:h-80  before:block before:absolute before:border before:border-so before:border-coffee  before:-translate-x-14  before:translate-y-28 "
      >
        <img
          src={about1}
          alt="about"
          className=" relative"
          style={{ border: "15px solid #eeeeee" }}
        />
        <img
          src={about2}
          alt="about"
          className=" -translate-x-36 -translate-y-36  "
          style={{ border: "15px solid #eeeeee" }}
        />
      </Visible>
    </div>
  );
}
