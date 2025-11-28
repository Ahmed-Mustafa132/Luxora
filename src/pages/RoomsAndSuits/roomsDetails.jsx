import { useEffect, useState } from "react";
import roomImg from "./assets/room-1.jpg";
import roomImg2 from "./assets/room-2.jpg";
import roomImg3 from "./assets/room-3.jpg";
import roomImg4 from "./assets/room-4.jpg";
import roomImg5 from "./assets/room-5.jpg";
import { FaDoorOpen, FaParking } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaSwimmingPool } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";
import { FaPersonRunning } from "react-icons/fa6";
const images = [roomImg, roomImg2, roomImg3, roomImg4, roomImg5];

export default function RoomsDetails() {
  const [heroImg, setHeroImg] = useState(images[0]);

  const timer = () => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setHeroImg(images[currentIndex]);
    }, 30000);
    return () => clearInterval(interval);
  };
  useEffect(() => {
    const interval = timer();
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex justify-center items-start my-16 gap-24">
      <section className="w-[800px] flex flex-col justify-start items-start gap-5">
        <div className="flex justify-center items-start flex-col gap-5">
          <div className="bg-gray-300 rounded-lg w-[600px] h-[400px] overflow-hidden relative">
            <img
              src={heroImg}
              alt="heroImg"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex justify-start items-center gap-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                  heroImg === img ? "border-coffee" : "border-transparent"
                }`}
                onClick={() => setHeroImg(img)}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-5xl text-coffee">Description of Room</h2>
          <p className="text-gray-600 mt-3 w-full text-justify text-lg">
            Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia
            nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellus
            nulla, sollicitudin at euismod nec, feugiat at nisi. Quisque vitae
            odio nec lacus interdum tempus. Phasellus a rhoncus erat. Vivamus
            vel eros vitae est aliquet pellentesque vitae et nunc. Sed vitae leo
            vitae nisl pellentesque semper.
          </p>
          <div className="border-2 border-coffee bg-lightGray flex justify-center items-center gap-5 p-5 rounded-lg mt-5">
            <div>
              <p>Room Size</p>
              <p className="text-2xl">600Sq</p>
            </div>
            <div>
              <p>Rooms Bed</p>
              <p className="text-2xl">2 Single Bed</p>
            </div>
            <div>
              <p>Occupancy</p>
              <p className="text-2xl">Three Persons</p>
            </div>
            <div>
              <p>View</p>
              <p className="text-2xl">Sea View</p>
            </div>
          </div>
          <p className="text-gray-600 mt-3 w-full text-justify text-lg">
            Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia
            nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellus
            nulla, sollicitudin at euismod nec, feugiat at nisi. Quisque vitae
            odio nec lacus interdum tempus. Phasellus a rhoncus erat. Vivamus
            vel eros vitae est aliquet pellentesque vitae et nunc. Sed vitae leo
            vitae nisl pellentesque semper.
          </p>
        </div>
        <div>
          <h2 className="text-coffee text-5xl">Room Facilities</h2>
          <div className="">
            <div className="flex justify-start items-center gap-3 mt-5">
              <TbAirConditioning className="text-coffee text-5xl p-1 rounded-full border-2 border-coffee " />
              <p className="text-2xl">Air Conditioner</p>
            </div>
          </div>
        </div>
      </section>
      <sidebar>
        <section className="bg-lightGray p-5 rounded-lg flex flex-col justify-start items-start gap-5">
          <div className="flex justify-center items-start flex-col gap-5">
            <h3 className="text-2xl"> check in </h3>
            <input type="date" className=" border-none rounded-sm p-2" />
          </div>
          <div className="flex justify-center items-start flex-col gap-5">
            <h3 className="text-2xl"> check out </h3>
            <input type="date" className=" border-none rounded-sm p-2" />
          </div>
          <div className="text-start flex flex-col justify-start items-start gap-2 w-full">
            <h3>Guests</h3>
            <select className=" px-2 py-1 rounded w-full">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <button className="bg-coffee text-white px-4 py-2 rounded hover:bg-chocolate transition-colors">
            Check Availability
          </button>
        </section>
        <section className="bg-lightGray p-4 rounded-lg flex flex-col justify-start items-start gap-5 mt-5">
          <h3 className="text-2xl font-semibold">Compare Room</h3>
          <div className="flex justify-start items-center gap-3 hover:bg-white p-2 rounded-lg w-full">
            <img
              src={roomImg}
              alt="img"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-start items-start gap-1">
              <div className="flex items-center gap-2">
                <FaDoorOpen className="text-coffee" /> <p>Economy Room</p>
              </div>
              <p>$175/Night</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3 hover:bg-white p-2 rounded-lg w-full">
            <img
              src={roomImg}
              alt="img"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-start items-start gap-1">
              <div className="flex items-center gap-2">
                <FaDoorOpen className="text-coffee" /> <p>Deluxe Room</p>
              </div>
              <p>$250/Night</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3 hover:bg-white p-2 rounded-lg w-full">
            <img
              src={roomImg}
              alt="img"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-start items-start gap-1">
              <div className="flex items-center gap-2">
                <FaDoorOpen className="text-coffee" /> <p>super Deluxe Room</p>
              </div>
              <p>$350/Night</p>
            </div>
          </div>
        </section>
      </sidebar>
    </main>
  );
}
