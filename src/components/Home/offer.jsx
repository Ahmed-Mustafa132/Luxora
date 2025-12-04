import Visible from "../Visible/Visible";
import before from "./assets/before.png";
import service1 from "./assets/service1.jpg";
import service2 from "./assets/service2.jpg";
import service3 from "./assets/service3.jpg";
import { Link } from "react-router-dom";

export default function Offer() {
  const offers = [
    { title: "Family Discount", img: service1 },
    { title: "Couples Offer", img: service2 },
    { title: "Buy One Get One Free", img: service3 },
  ];

  return (
    <Visible
      direction="left"
      delay={1}
      className="pt-32 bg-white dark:bg-darkChocolate w-full px-4"
    >
      {/* Title */}
      <div className="flex justify-center items-center gap-4 flex-wrap mb-4">
        <img src={before} alt="img" className="w-6 sm:w-8" />
        <div className="text-coffee tracking-[0.3em] uppercase text-sm sm:text-base">
          What We Offer
        </div>
        <img src={before} alt="img" className="w-6 sm:w-8" />
      </div>

      <h2 className="text-2xl sm:text-4xl text-center font-semibold mb-12">
        Get Our Special Offer.
      </h2>

      {/* Cards */}
      <div className="flex flex-wrap justify-center items-start gap-8">
        {offers.map((offer, i) => (
          <Visible direction="up" delay={i * 200} key={offer.title}>
            <div className="relative group w-full sm:w-[300px] h-[400px] overflow-hidden rounded shadow-md cursor-pointer">
              {/* Background Image */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${offer.img})` }}
              />

              {/* Label */}
              <Link to={"/roomsDetails"} className="absolute bottom-6 left-6 bg-white dark:bg-darkChocolate px-4 py-2 text-coffee dark:text-white font-semibold transition-all group-hover:bg-coffee group-hover:text-white">
                {offer.title}
              </Link>
            </div>
          </Visible>
        ))}
      </div>
    </Visible>
  );
}
