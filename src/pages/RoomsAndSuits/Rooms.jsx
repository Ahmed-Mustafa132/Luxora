import Visible from "../../components/Visible/Visible";
import bg from "./assets/bg-rooms.png";
import room1 from "./assets/room-1.jpg";
import room2 from "./assets/room-2.jpg";
import room3 from "./assets/room-3.jpg";
import room4 from "./assets/room-4.jpg";
import room5 from "./assets/room-5.jpg";
import { FaRegUserCircle, FaBed, FaWifi } from "react-icons/fa";
import { PiBathtub } from "react-icons/pi";

export default function Rooms() {
  return (
    <main className="mt-16">
      <Visible direction="down" delay={200}>
        <section
          className="mx-auto p-10 bg-no-repeat bg-cover bg-fixed bg-center text-white h-[450px] flex flex-col items-center justify-end gap-7"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <h1 className="text-6xl">Rooms</h1>
          <div className="text-3xl"> Home {">"} Rooms</div>
        </section>
      </Visible>
      <section className="mx-auto my-10 w-[80%]  ">
        <div className="grid grid-cols-8 gap-4">
          <Visible direction="right" delay={300} className="col-span-4">
            <div className=" h-[350px] group overflow-hidden">
              <img
                src={room1}
                alt="room1"
                className="w-full h-full relative object-cover brightness-50 transition-transform duration-500 group-hover:scale-110"
              />
              <div className=" text-white  p-2 -translate-y-20 group-hover:-translate-y-32 ">
                <div className="text-right text-white mb-4">
                  <h2 className="text-3xl">Junior Suite</h2>
                  <p className=" uppercase">150 / Night</p>
                </div>
                <div className="w-full flex justify-between items-center border-t border-white ">
                  <button className="uppercase border border-white p-2 hover:bg-white hover:text-black">
                    BOOK NOW
                  </button>
                  <ul className="flex justify-center items-center gap-4 text-xl">
                    <li>
                      <FaRegUserCircle />
                    </li>
                    <li>
                      <FaBed />
                    </li>
                    <li>
                      <FaWifi />
                    </li>
                    <li>
                      <PiBathtub />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Visible>
          <Visible direction="left" delay={300} className="col-span-4">
            <div className=" h-[350px] group overflow-hidden">
              <img
                src={room2}
                alt="room2"
                className="w-full h-full relative object-cover brightness-50 transition-transform duration-500 group-hover:scale-110"
              />
              <div className=" text-white  p-2 -translate-y-20 group-hover:-translate-y-32 ">
                <div className="text-right text-white mb-4">
                  <h2 className="text-3xl">Family Room</h2>
                  <p className=" uppercase">200 / Night</p>
                </div>
                <div className="w-full flex justify-between items-center border-t border-white ">
                  <button className="uppercase border border-white p-2 hover:bg-white hover:text-black">
                    BOOK NOW
                  </button>
                  <ul className="flex justify-center items-center gap-4 text-xl">
                    <li>
                      <FaRegUserCircle />
                    </li>
                    <li>
                      <FaBed />
                    </li>
                    <li>
                      <FaWifi />
                    </li>
                    <li>
                      <PiBathtub />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Visible>
          <Visible direction="right" delay={300} className="col-span-2">
            <div className=" h-[350px] group overflow-hidden">
              <img
                src={room3}
                alt="room3"
                className="w-full h-full relative object-cover brightness-50 transition-transform duration-500 group-hover:scale-110"
              />
              <div className=" text-white  p-2 -translate-y-20 group-hover:-translate-y-32 ">
                <div className="text-right text-white mb-4">
                  <h2 className="text-3xl">Double Room</h2>
                  <p className=" uppercase">250 / Night</p>
                </div>
                <div className="w-full flex justify-between items-center border-t border-white ">
                  <button className="uppercase border border-white p-2 hover:bg-white hover:text-black">
                    BOOK NOW
                  </button>
                  <ul className="flex justify-center items-center gap-4 text-xl">
                    <li>
                      <FaRegUserCircle />
                    </li>
                    <li>
                      <FaBed />
                    </li>
                    <li>
                      <FaWifi />
                    </li>
                    <li>
                      <PiBathtub />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Visible>
          <Visible direction="up" delay={300} className="col-span-4">
            <div className=" h-[350px] group overflow-hidden">
              <img
                src={room4}
                alt="room4"
                className="w-full h-full relative object-cover brightness-50 transition-transform duration-500 group-hover:scale-110"
              />
              <div className=" text-white  p-2 -translate-y-20 group-hover:-translate-y-32 ">
                <div className="text-right text-white mb-4">
                  <h2 className="text-3xl">Double Room</h2>
                  <p className=" uppercase">250 / Night</p>
                </div>
                <div className="w-full flex justify-between items-center border-t border-white ">
                  <button className="uppercase border border-white p-2 hover:bg-white hover:text-black">
                    BOOK NOW
                  </button>
                  <ul className="flex justify-center items-center gap-4 text-xl">
                    <li>
                      <FaRegUserCircle />
                    </li>
                    <li>
                      <FaBed />
                    </li>
                    <li>
                      <FaWifi />
                    </li>
                    <li>
                      <PiBathtub />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Visible>
          <Visible direction="left" delay={300} className="col-span-2">
            <div className=" h-[350px] group overflow-hidden">
              <img
                src={room5}
                alt="room1"
                className="w-full h-full relative object-cover brightness-50 transition-transform duration-500 group-hover:scale-110"
              />
              <div className=" text-white  p-2 -translate-y-20 group-hover:-translate-y-32 ">
                <div className="text-right text-white mb-4">
                  <h2 className="text-3xl">Deluxe Room</h2>
                  <p className=" uppercase">300 / Night</p>
                </div>
                <div className="w-full flex justify-between items-center border-t border-white ">
                  <button className="uppercase border border-white p-2 hover:bg-white hover:text-black">
                    BOOK NOW
                  </button>
                  <ul className="flex justify-center items-center gap-4 text-xl">
                    <li>
                      <FaRegUserCircle />
                    </li>
                    <li>
                      <FaBed />
                    </li>
                    <li>
                      <FaWifi />
                    </li>
                    <li>
                      <PiBathtub />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Visible>
        </div>
      </section>
    </main>
  );
}
