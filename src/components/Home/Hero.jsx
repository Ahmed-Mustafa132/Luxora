import FadeInWhenVisible from "../FadeInWhenVisible/FadeInWhenVisible";
import { FaStar } from "react-icons/fa";
import banner1 from "./assets/banner1.jpg";
import banner2 from "./assets/banner2.png";
import shapeLine1 from "./assets/shape-line1.png";

export default function Hero() {
  return (
    <>
      <FadeInWhenVisible direction="right" duration={700} delay={1}>
        {/* Parent container */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background image + dark overlay */}
          <div
            className="
            absolute inset-0
            bg-cover bg-center
            filter
            brightness-100 dark:brightness-50
            bg-fixed
            "
            style={{ backgroundImage: `url(${banner1})` }}
          />

          {/* Content on top */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible
              direction="left"
              duration={700}
              delay={300}
              className="relative z-10"
            >
              <div className="flex items-center gap-2 mb-4 md:mb-7 justify-center">
                {/* Hide on mobile, show on md+ and adjust size */}
                <img
                  src={banner2}
                  alt="Banner 2"
                  className="
                  hidden md:block
                  absolute
                  w-24 h-24 md:w-40  md:h-40
                  object-cover
                  transform
                  translate-x-1/2 md:translate-x-[0]
                  -translate-y-1/2
                "
                />

                {/* Stars shrink on mobile */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <FadeInWhenVisible direction="up" delay={i * 200}>

                  <FaStar
                    key={i}
                    className="text-yellow-400 text-2xl sm:text-4xl md:text-6xl"
                    />
                    </FadeInWhenVisible>
                ))}
              </div>

              <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-white text-center mb-4 sm:mb-6 md:mb-7">
                Book your dream hotel
              </h1>
              <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-white text-center">
                with hotelier
              </h1>
            </FadeInWhenVisible>
          </div>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible
        direction="up"
        duration={700}
        delay={300}
        className="w-3/4  mx-auto  h-28 bg-white dark:bg-chocolate -m-16 shadow flex justify-stretch items-center z-40 relative"
      >
        <div className="w-1/4 text-center">
          <div>check in</div>
          <input
            type="date"
            placeholder={new Date().toISOString().split("T")[0]}
            className="dark:bg-coffee text-coffee"
          />
        </div>
        <img src={shapeLine1} alt="" />

        <div className="w-1/4 text-center">
          <div>Check-Out</div>
          <input
            type="date"
            placeholder={new Date().toISOString().split("T")[0]}
            className="dark:bg-coffee text-coffee"
          />
        </div>
        <img src={shapeLine1} alt="" />
        <div className="w-1/4 text-center">
          <div>Quests</div>
          <select className="text-coffee">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="bg-black text-white h-full w-1/4 text-2xl text-center flex justify-center  items-center hover:bg-coffee">
          CHECK <br /> AVAILABILITY
        </div>
      </FadeInWhenVisible>
    </>
  );
}
