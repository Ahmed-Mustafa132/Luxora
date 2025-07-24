import Visible from "../../components/Visible/Visible";
import bg from "./assets/bg-roomsAndSuits.jpg";
import feature1 from "./assets/feature1.jpg";
import feature2 from "./assets/feature2.jpg";
import feature3 from "./assets/feature3.jpg";
import before from "./assets/before.png";
export default function RoomsAndSuits() {
  return (
    <main>
      <Visible direction="down" delay={200}>
        <section
          className="mx-auto p-10  bg-fixed  text-white h-[600px] flex flex-col items-center justify-end gap-7"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <h1 className="text-6xl">Rooms</h1>
          <div className="text-3xl"> Home {">"} Rooms</div>
        </section>
      </Visible>
      <section className="mx-auto w-[70%] my-3">
        <div className="grid grid-cols-2 gap-0  bg-offWhite">
          <Visible delay={200} direction="right" className=" col-span-1">
            <img src={feature1} alt="feature1" />
          </Visible>
          <Visible
            delay={200}
            direction="left"
            className="flex justify-center items-center flex-col gap-10"
          >
            <div className="flex justify-center items-center gap-3">
              <img src={before} alt="img" />
              <span
                className="uppercase text-coffee"
                style={{ letterSpacing: 10 }}
              >
                DISCOVER
              </span>
              <img src={before} alt="img" />
            </div>

            <h2 className="uppercase text-center  text-5xl p-5 border-b border-black ">
              The Restaurant
            </h2>
            <p className="text-center text-2xl mx-10">
              With the largest fleet of luxury catamarans, sailing and motor
              yachts in Santorini we guarantee the ultimate sailing experience!
            </p>
            <button className="uppercase text-2xl text-white bg-coffee p-4 hover:bg-black">
              Read more
            </button>
          </Visible>
          <Visible
            delay={200}
            direction="left"
            className="flex justify-center items-center flex-col gap-10"
          >
            <div className="flex justify-center items-center gap-3">
              <img src={before} alt="img" />
              <span
                className="uppercase text-coffee"
                style={{ letterSpacing: 10 }}
              >
                EXPERIENCE
              </span>
              <img src={before} alt="img" />
            </div>

            <h2 className="uppercase text-center  text-5xl p-5 border-b border-black ">
              Spa Center
            </h2>
            <p className="text-center text-2xl mx-10">
              With the largest fleet of luxury catamarans, sailing and motor
              yachts in Santorini we guarantee the ultimate sailing experience!
            </p>
            <button className="uppercase text-xl text-white bg-coffee p-4 hover:bg-black   ">
              Read more
            </button>
          </Visible>
          <Visible delay={200} direction="right" className=" col-span-1">
            <img src={feature2} alt="feature" />
          </Visible>
          <Visible delay={200} direction="right" className=" col-span-1">
            <img src={feature3} alt="feature" />
          </Visible>
          <Visible
            delay={200}
            direction="left"
            className="flex justify-center items-center flex-col gap-10"
          >
            <div className="flex justify-center items-center gap-3">
              <img src={before} alt="img" />
              <span
                className="uppercase text-coffee"
                style={{ letterSpacing: 10 }}
              >
                MODERN
              </span>
              <img src={before} alt="img" />
            </div>

            <h2 className="uppercase text-center  text-5xl p-5 border-b border-black ">
              Fitness Center
            </h2>
            <p className="text-center text-2xl mx-10">
              With the largest fleet of luxury catamarans, sailing and motor
              yachts in Santorini we guarantee the ultimate sailing experience!
            </p>
            <button className="uppercase text-2xl text-white bg-coffee p-4 hover:bg-black">
              Read more
            </button>
          </Visible>
        </div>
      </section>
    </main>
  );
}
