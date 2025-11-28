import Visible from "../Visible/Visible";
import before from "./assets/before.png";
import service1 from "./assets/service1.jpg";
import service2 from "./assets/service2.jpg";
import service3 from "./assets/service3.jpg";
import { FaRegUserCircle, FaBed, FaWifi } from "react-icons/fa";
import { PiBathtub } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  return (
    <Visible
      direction="up"
      duration={700}
      delay={1}
      className="bg-offWhite dark:bg-DarkCoffee w-full py-16 px-4"
    >
      {/* Section Header */}
      <div className="flex justify-center items-center gap-4 flex-wrap mb-8">
        <img src={before} alt="img" className="w-6 sm:w-8" />
        <div className="text-coffee text-sm sm:text-base tracking-[0.3em] uppercase">
          What We Offer
        </div>
        <img src={before} alt="img" className="w-6 sm:w-8" />
      </div>

      <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-semibold max-w-2xl mx-auto pb-12">
        Book your stay and relax in luxury
      </h2>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center items-stretch gap-8">
        {[
          { title: "Junior Suite", img: service1, price: "$150/ Night" },
          { title: "Family Suite", img: service2, price: "$250/ Night" },
          { title: "Business Suite", img: service3, price: "$550/ Night" },
        ].map((room, index) => (
          <Visible
            key={room.title}
            direction="up"
            delay={index * 200}
            className="w-full sm:w-[90%] md:w-[45%] lg:w-[30%] bg-white dark:bg-darkChocolate cursor-pointer shadow hover:shadow-lg transition-all"
            onClick={() => navigate("/rooms")}
          >
            <div className="overflow-hidden h-64 sm:h-80">
              <img
                src={room.img}
                alt={room.title}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              {/* Title & Price */}
              <div className="border-b-2 pb-4 mb-5">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {room.title}
                </h3>
                <p className="text-coffee text-lg">{room.price}</p>
              </div>

              {/* Room Features */}
              <div className="flex justify-between items-start text-sm sm:text-base">
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-2">
                    <FaRegUserCircle className="text-coffee text-xl" />
                    <p>1-2 Persons</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaBed className="text-coffee text-xl" />
                    <p>King Size Bed</p>
                  </li>
                </ul>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-2">
                    <PiBathtub className="text-coffee text-xl" />
                    <p>Bathtub</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaWifi className="text-coffee text-xl" />
                    <p>Free Wifi</p>
                  </li>
                </ul>
              </div>
            </div>
          </Visible>
        ))}
      </div>
    </Visible>
  );
}
