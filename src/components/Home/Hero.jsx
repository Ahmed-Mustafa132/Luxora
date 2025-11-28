import Visible from "../Visible/Visible";
import { FaStar } from "react-icons/fa";
import banner1 from "./assets/banner1.jpg";
import banner2 from "./assets/banner2.png";
import shapeLine1 from "./assets/shape-line1.png";
import { api } from "../../api/api";

export default function Hero() {
  const form = {
    checkIn: "",
    checkOut: "",
    guests: "",
  };
  const check = () => {
    return "";
  };
  return (
    <>
      {/* Main Hero Section */}
      <Visible direction="right" duration={700} delay={1}>
        <div className="relative w-full h-screen max-h-[1000px] overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center brightness-100 dark:brightness-50 bg-fixed"
            style={{ backgroundImage: `url(${banner1})` }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center">
            <Visible
              direction="left"
              duration={700}
              delay={300}
              className="relative z-10"
            >
              {/* Stars & Banner */}
              <div className="flex items-center gap-2 mb-6 justify-center relative">
                {/* Floating Banner Image */}
                <img
                  src={banner2}
                  alt="Banner 2"
                  className="hidden md:block absolute w-24 h-24 md:w-40 md:h-40 object-cover -translate-y-1/2 left-0 -translate-x-1/2"
                />

                {/* Stars */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <Visible key={i} direction="up" delay={i * 200}>
                    <FaStar className="text-yellow-400 text-2xl sm:text-4xl md:text-6xl" />
                  </Visible>
                ))}
              </div>

              {/* Headings */}
              <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-white mb-2">
                Book your dream hotel
              </h1>
              <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-white">
                with hotelier
              </h1>
            </Visible>
          </div>
        </div>
      </Visible>

      {/* Availability Form */}
      <Visible
        direction="up"
        duration={700}
        delay={300}
        className="w-[90%] md:w-4/5 mx-auto h-auto md:h-28 bg-white dark:bg-chocolate -mt-16 shadow-md flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-0 p-4 md:p-0 z-40 relative"
      >
        {/* Check In */}
        <div className="flex-1 text-center flex flex-col justify-center items-center gap-2">
          <div className="font-semibold">Check In</div>
          <input
            type="date"
            className="dark:bg-coffee text-fff  px-2 py-1 rounded"
            onChange={(e) => (form.checkIn = e.target.value)}
          />
        </div>

        {/* Line Divider */}
        <img
          src={shapeLine1}
          alt=""
          className="hidden md:block mx-2 h-16 self-center"
        />

        <div className="flex-1 text-center flex flex-col justify-center items-center gap-2">
          <div className="font-semibold">Check Out</div>
          <input
            type="date"
            className="dark:bg-coffee text-fff px-2 py-1 rounded"
            onChange={(e) => {
              form.checkOut = e.target.value;
            }}
          />
        </div>

        <img
          src={shapeLine1}
          alt=""
          className="hidden md:block mx-2 h-16 self-center"
        />

        <div className="flex-1 text-center flex flex-col justify-center items-center gap-2">
          <div className="font-semibold">Guests</div>
          <select
            className="text-coffee px-2 py-1 rounded"
            onChange={(e) => {
              form.guests = e.target.value;
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div
          className="bg-black text-white flex-1 md:max-w-[250px] text-center flex justify-center items-center text-xl font-semibold hover:bg-coffee transition-all cursor-pointer py-4 md:py-0"
          onClick={() => {
            check();
          }}
        >
          CHECK <br className="block md:hidden" /> AVAILABILITY
        </div>
      </Visible>
    </>
  );
}
