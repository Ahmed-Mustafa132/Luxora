import Visible from "../../components/Visible/Visible";
import bg from "./assets/bg-rooms.png";
import room1 from "./assets/room-1.jpg";
import room2 from "./assets/room-2.jpg";
import room3 from "./assets/room-3.jpg";
import room4 from "./assets/room-4.jpg";
import room5 from "./assets/room-5.jpg";
import { FaRegUserCircle, FaBed, FaWifi } from "react-icons/fa";
import { PiBathtub } from "react-icons/pi";

const rooms = [
  { img: room1, name: "Junior Suite", price: 150 },
  { img: room2, name: "Family Room", price: 200 },
  { img: room3, name: "Double Room", price: 250 },
  { img: room4, name: "Double Room", price: 250 },
  { img: room5, name: "Deluxe Room", price: 300 },
];

export default function Rooms() {
  return (
    <main className="mt-16">
      {/* Hero Section */}
      <Visible direction="down" delay={200}>
        <section
          className="p-10 bg-no-repeat bg-cover bg-fixed bg-center text-white h-[450px] flex flex-col items-center justify-end gap-5"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">Rooms</h1>
          <div className="text-xl md:text-3xl">Home {">"} Rooms</div>
        </section>
      </Visible>

      {/* Rooms Grid */}
      <section className="mx-auto my-10 w-[90%] max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => (
            <Visible
              key={room.name + index}
              direction={index % 2 === 0 ? "right" : "left"}
              delay={300}
            >
              <div className="group relative overflow-hidden rounded shadow-lg">
                {/* Room Image */}
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={room.img}
                    alt={room.name}
                    className="w-full h-full object-cover brightness-50 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="mb-2">
                    <h2 className="text-2xl font-semibold">{room.name}</h2>
                    <p className="uppercase text-sm">${room.price} / Night</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-white pt-2">
                    <button className="uppercase border border-white px-3 py-1 text-sm hover:bg-white hover:text-black transition">
                      Book Now
                    </button>
                    <ul className="flex gap-3 text-lg">
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
          ))}
        </div>
      </section>
    </main>
  );
}
