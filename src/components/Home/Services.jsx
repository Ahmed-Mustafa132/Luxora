import FadeInWhenVisible from "../FadeInWhenVisible/FadeInWhenVisible";
import before from "./assets/before.png";
import service1 from "./assets/service1.jpg";
import service2 from "./assets/service2.jpg";
import service3 from "./assets/service3.jpg";
import { FaRegUserCircle, FaBed, FaWifi } from "react-icons/fa";
import { PiBathtub } from "react-icons/pi";

export default function Services() {
  return (
    <FadeInWhenVisible
      direction="up"
      duration={700}
      delay={1}
      className="bg-offWhite dark:bg-DarkCoffee w-full py-24"
    >
      <div className="flex justify-center items-center gap-8 ">
        <img src={before} alt="img" />
        <div className="text-coffee " style={{ letterSpacing: "10px" }}>
          Whet We Offer
        </div>
        <img src={before} alt="img" />
      </div>
      <h2 className="text-center text-5xl w-2/6 m-auto py-12">
        Book your stay and relax in luxury
      </h2>
      <div className="flex justify-center items-center gap-12">
        <FadeInWhenVisible
          direction="up"
          delay={100}
          className="w-96 bg-white cursor-pointer dark:bg-darkChocolate"
        >
          <div className=" overflow-hidden h-80 ">
            <img src={service1} alt="service1" className="hover:scale-125" />
          </div>
          <div className="p-5">
            <div className="border-b-2 pb-4 mb-5">
              <h3 className="text-3xl">Junior Suite</h3>
              <p className="text-coffee text-xl">$150/ Night</p>
            </div>
            <div className="flex justify-between items-center">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center  gap-2">
                  <FaRegUserCircle className="text-coffee text-2xl" />
                  <p>1-2 Persons</p>
                </li>
                <li className="flex items-center  gap-2">
                  <FaBed className="text-coffee text-2xl" />
                  <p>King Size Bed</p>
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center  gap-2">
                  <PiBathtub className="text-coffee text-2xl" />
                  <p>Bathtub</p>
                </li>
                <li className="flex items-center  gap-2">
                  <FaWifi className="text-coffee text-2xl" />
                  <p>Free Wifi</p>
                </li>
              </ul>
            </div>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible
          direction="up"
          delay={300}
          className="w-96 bg-white cursor-pointer dark:bg-darkChocolate"
        >
          <div className=" overflow-hidden h-80 ">
            <img src={service2} alt="service1" className="hover:scale-125" />
          </div>
          <div className="p-5">
            <div className="border-b-2 pb-4 mb-5">
              <h3 className="text-3xl">Family Suite</h3>
              <p className="text-coffee text-xl">$250/ Night</p>
            </div>
            <div className="flex justify-between items-center">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center  gap-2">
                  <FaRegUserCircle className="text-coffee text-2xl" />
                  <p>1-2 Persons</p>
                </li>
                <li className="flex items-center  gap-2">
                  <FaBed className="text-coffee text-2xl" />
                  <p>King Size Bed</p>
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center  gap-2">
                  <PiBathtub className="text-coffee text-2xl" />
                  <p>Bathtub</p>
                </li>
                <li className="flex items-center  gap-2">
                  <FaWifi className="text-coffee text-2xl" />
                  <p>Free Wifi</p>
                </li>
              </ul>
            </div>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible
          direction="up"
          delay={600}
          className="w-96 bg-white cursor-pointer dark:bg-darkChocolate"
        >
          <div className=" overflow-hidden h-80 ">
            <img src={service3} alt="service1" className="hover:scale-125" />
          </div>
          <div className="p-5">
            <div className="border-b-2 pb-4 mb-5">
              <h3 className="text-3xl">Business Suite</h3>
              <p className="text-coffee text-xl">$550/ Night</p>
            </div>
            <div className="flex justify-between items-center">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center  gap-2">
                  <FaRegUserCircle className="text-coffee text-2xl" />
                  <p>1-2 Persons</p>
                </li>
                <li className="flex items-center  gap-2">
                  <FaBed className="text-coffee text-2xl" />
                  <p>King Size Bed</p>
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center  gap-2">
                  <PiBathtub className="text-coffee text-2xl" />
                  <p>Bathtub</p>
                </li>
                <li className="flex items-center  gap-2">
                  <FaWifi className="text-coffee text-2xl" />
                  <p>Free Wifi</p>
                </li>
              </ul>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </FadeInWhenVisible>
  );
}
