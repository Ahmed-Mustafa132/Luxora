import { useEffect, useRef, useState } from "react";
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
import { Link } from "react-router-dom";

const images = [roomImg, roomImg2, roomImg3, roomImg4, roomImg5];

export default function RoomsDetails() {
  const [heroImg, setHeroImg] = useState(images[0]);
  const [thumbs, setThumbs] = useState(images);
  const [currentIdx, setCurrentIdx] = useState(0);
  const printableRef = useRef();

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setHeroImg(images[currentIndex]);
      setCurrentIdx(currentIndex);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  function selectImage(idx) {
    setHeroImg(images[idx]);
    setCurrentIdx(idx);
  }


  return (
    <main className="flex justify-center items-start my-16 gap-12 px-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        <section className="flex-1">
          <div ref={printableRef} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
            <div className="relative h-80 sm:h-96 bg-gray-200">
              <img src={heroImg} alt="hero" className="w-full h-full object-cover" />
              <div className="absolute left-4 bottom-4 flex gap-2">
                {thumbs.map((t, idx) => (
                  <button key={idx} onClick={() => selectImage(idx)} className={`w-12 h-12 rounded overflow-hidden border-2 ${currentIdx === idx ? "border-coffee" : "border-transparent"}`}>
                    <img src={t} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-3xl font-bold text-coffee">Deluxe Sea View Room</h1>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Spacious room with sea view, modern furnishings, private bathroom and free Wi‑Fi. Ideal for couples and business travelers.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <div className="text-sm text-gray-500">Room size</div>
                  <div className="text-xl font-semibold">35 m²</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="text-sm text-gray-500">Bed</div>
                  <div className="text-xl font-semibold">1 King</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="text-sm text-gray-500">Max occupancy</div>
                  <div className="text-xl font-semibold">2 Guests</div>
                </div>
              </div>

              <h2 className="mt-6 text-xl font-semibold">Facilities</h2>
              <ul className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <TbAirConditioning className="text-coffee text-2xl" />
                  Air Conditioning
                </li>
                <li className="flex items-center gap-3">
                  <FaSwimmingPool className="text-coffee text-2xl" />
                  Pool access
                </li>
                <li className="flex items-center gap-3">
                  <FaParking className="text-coffee text-2xl" />
                  Free parking
                </li>
                <li className="flex items-center gap-3">
                  <CgGym className="text-coffee text-2xl" />
                  Gym
                </li>
                <li className="flex items-center gap-3">
                  <MdOutlineSecurity className="text-coffee text-2xl" />
                  24/7 Security
                </li>
                <li className="flex items-center gap-3">
                  <FaPersonRunning className="text-coffee text-2xl" />
                  Nearby jogging track
                </li>
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-700">
                  <div><strong>Price</strong></div>
                  <div className="text-2xl font-bold">$175 <span className="text-sm text-gray-500">/ night</span></div>
                </div>

                <div className="flex gap-3">
                  <Link to="/book" className="px-4 py-2 bg-coffee text-white rounded">Book now</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded shadow p-6">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-gray-600 mt-3">
              The Deluxe Sea View Room features panoramic windows, a comfortable seating area, complimentary minibar and an en-suite bathroom with rain shower.
              Free high-speed internet, daily housekeeping and room service are available.
            </p>
          </div>
        </section>

        <aside className="w-full lg:w-96 flex-shrink-0 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <h4 className="font-semibold">Check availability</h4>
            <form className="mt-3 grid grid-cols-1 gap-3">
              <label className="text-sm">Check-in</label>
              <input type="date" className="w-full p-2 border rounded" />
              <label className="text-sm">Check-out</label>
              <input type="date" className="w-full p-2 border rounded" />
              <label className="text-sm">Guests</label>
              <select className="w-full p-2 border rounded">
                <option value="1">1 — Single</option>
                <option value="2">2 — Double</option>
                <option value="3">3 — Suite</option>
              </select>
              <div className="flex gap-2 mt-3">
                <Link to="/book" className="px-3 py-2 bg-coffee text-white rounded">Check & Book</Link>
                <Link to="/contact" className="px-3 py-2 border rounded">Contact</Link>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <h4 className="font-semibold">Compare room</h4>
            <div className="mt-3 space-y-2">
              {thumbs.slice(0,3).map((t, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                  <img src={t} alt="" className="w-16 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">Deluxe Room</div>
                    <div className="text-sm text-gray-500">$175 / night</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}