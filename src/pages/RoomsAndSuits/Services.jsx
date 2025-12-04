// src/pages/RoomsAndSuits/RoomsAndSuits.jsx

import React from "react";
import Visible from "../../components/Visible/Visible";
import bg from "./assets/bg-roomsAndSuits.jpg";
import feature1 from "./assets/feature1.jpg";
import feature2 from "./assets/feature2.jpg";
import feature3 from "./assets/feature3.jpg";
import before from "./assets/before.png";

export default function Services() {
  return (
    <main>
      {/* Hero Section */}
      <Visible direction="down" delay={200}>
        <section
          className="mx-auto p-10 bg-fixed text-white h-[600px] flex flex-col items-center justify-end gap-7"
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
        >
          <h1 className="text-4xl sm:text-6xl">Rooms</h1>
          <div className="text-xl sm:text-3xl">Home {">"} Rooms</div>
        </section>
      </Visible>

      {/* Features Section */}
      <section className="mx-auto w-[95%] md:w-[80%] xl:w-[70%] my-3">
        <div className="flex flex-col gap-10">
          {/* Block 1 */}
          <div className="flex flex-col lg:flex-row bg-offWhite">
            <Visible delay={200} direction="right" className="lg:w-1/2">
              <img src={feature1} alt="feature1" className="w-full h-auto" />
            </Visible>
            <Visible
              delay={200}
              direction="left"
              className="lg:w-1/2 flex justify-center items-center flex-col gap-10 p-5"
            >
              <div className="flex justify-center items-center gap-3">
                <img src={before} alt="img" />
                <span className="uppercase text-coffee tracking-[.2em]">
                  DISCOVER
                </span>
                <img src={before} alt="img" />
              </div>
              <h2 className="uppercase text-center text-3xl sm:text-5xl p-5 border-b border-black">
                The Restaurant
              </h2>
              <p className="text-center text-lg sm:text-2xl mx-4">
                With the largest fleet of luxury catamarans, sailing and motor
                yachts in Santorini we guarantee the ultimate sailing
                experience!
              </p>
              <button className="uppercase text-lg sm:text-2xl text-white bg-coffee px-6 py-3 hover:bg-black">
                Read more
              </button>
            </Visible>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col-reverse lg:flex-row bg-offWhite">
            <Visible
              delay={200}
              direction="left"
              className="lg:w-1/2 flex justify-center items-center flex-col gap-10 p-5"
            >
              <div className="flex justify-center items-center gap-3">
                <img src={before} alt="img" />
                <span className="uppercase text-coffee tracking-[.2em]">
                  EXPERIENCE
                </span>
                <img src={before} alt="img" />
              </div>
              <h2 className="uppercase text-center text-3xl sm:text-5xl p-5 border-b border-black">
                Spa Center
              </h2>
              <p className="text-center text-lg sm:text-2xl mx-4">
                With the largest fleet of luxury catamarans, sailing and motor
                yachts in Santorini we guarantee the ultimate sailing
                experience!
              </p>
              <button className="uppercase text-lg sm:text-xl text-white bg-coffee px-6 py-3 hover:bg-black">
                Read more
              </button>
            </Visible>
            <Visible delay={200} direction="right" className="lg:w-1/2">
              <img src={feature2} alt="feature2" className="w-full h-auto" />
            </Visible>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col lg:flex-row bg-offWhite">
            <Visible delay={200} direction="right" className="lg:w-1/2">
              <img src={feature3} alt="feature3" className="w-full h-auto" />
            </Visible>
            <Visible
              delay={200}
              direction="left"
              className="lg:w-1/2 flex justify-center items-center flex-col gap-10 p-5"
            >
              <div className="flex justify-center items-center gap-3">
                <img src={before} alt="img" />
                <span className="uppercase text-coffee tracking-[.2em]">
                  MODERN
                </span>
                <img src={before} alt="img" />
              </div>
              <h2 className="uppercase text-center text-3xl sm:text-5xl p-5 border-b border-black">
                Fitness Center
              </h2>
              <p className="text-center text-lg sm:text-2xl mx-4">
                With the largest fleet of luxury catamarans, sailing and motor
                yachts in Santorini we guarantee the ultimate sailing
                experience!
              </p>
              <button className="uppercase text-lg sm:text-2xl text-white bg-coffee px-6 py-3 hover:bg-black">
                Read more
              </button>
            </Visible>
          </div>
        </div>
      </section>
    </main>
  );
}
