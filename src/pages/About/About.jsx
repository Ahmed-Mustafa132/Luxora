import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { api, roomsApi } from "../../api/api";
import about from "./assets/about.jpg";
import about1 from "./assets/about1.jpg";
import about2 from "./assets/about2.jpg";
import logo from "./assets/logo.png";

export default function About() {
  const hotel = {
    name: "Luxora Hotel",
    tagline: "A luxurious stay in the heart of the city",
    address: "Corniche St., Alexandria, Egypt",
    email: "info@luxora.example",
    phone: "+20 100 000 0000",
    description:
      "Luxora Hotel offers a premium stay combining comfort, elegant design and outstanding service. We provide a variety of rooms and full facilities: restaurant, spa, swimming pool and conference centers.",
    stats: {
      rooms: 120,
      bookings: 3421,
      staff: 48,
    },
    amenities: [
      "Free Wi-Fi",
      "Swimming pool",
      "Restaurant & bar",
      "Spa & sauna",
      "Parking",
      "24/7 front desk",
    ],
    gallery: [about, about1, about2],
  };

  const [stats, setStats] = useState({ rooms: null, bookings: null, staff: hotel.stats?.staff || 48 });
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadStats() {
      setLoading(true);
      try {
        const roomsRes = await roomsApi.getRooms({ page: 1, limit: 1 });
        const totalRooms = roomsRes?.data?.totalRooms ?? hotel.stats.rooms;

        let bookingsCount = hotel.stats.bookings;
        try {
          const b = await api.get("/booking");
          bookingsCount = b?.data?.total ?? (Array.isArray(b?.data) ? b.data.length : bookingsCount);
        } catch (e) {
        }

        if (mounted) setStats({ rooms: totalRooms, bookings: bookingsCount, staff: stats.staff });
      } catch (e) {
        console.error("loadStats error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadStats();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % hotel.gallery.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  function goTo(idx) {
    setCurrent(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % hotel.gallery.length), 4000);
  }

  const faqs = [
    { q: "Do you offer airport shuttle?", a: "Yes — on request. Contact reception to arrange transfer." },
    { q: "Is breakfast included?", a: "Some rates include breakfast. Check room details when booking." },
    { q: "What is the check-in/out time?", a: "Check-in from 14:00, check-out until 12:00." },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{hotel.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{hotel.tagline}</p>
            <p className="mt-3 text-gray-600 dark:text-gray-300">{hotel.description}</p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 text-center">
                <div className="text-xs text-gray-500">Rooms</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">{loading ? "…" : stats.rooms}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 text-center">
                <div className="text-xs text-gray-500">Bookings</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">{loading ? "…" : stats.bookings}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 text-center">
                <div className="text-xs text-gray-500">Staff</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.staff}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/rooms" className="px-4 py-2 bg-coffee text-white rounded">View Rooms</Link>
              <a href={`mailto:${hotel.email}`} className="px-4 py-2 border rounded">Contact Us</a>
            </div>
          </div>

          {/* Carousel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="relative h-56 md:h-full">
              {hotel.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`gallery-${i}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                />
              ))}
              <div className="absolute left-3 bottom-3 flex gap-2">
                {hotel.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-3 h-3 rounded-full ${i === current ? "bg-coffee" : "bg-white/60"}`}
                    aria-label={`go-to-${i}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Amenities & Gallery */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Facilities & Services</h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {hotel.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 p-2 border rounded">
                  <span className="inline-block w-2 h-2 bg-coffee rounded-full" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{a}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 font-semibold text-gray-800 dark:text-white">Gallery</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {hotel.gallery.map((src, i) => (
                <img key={i} src={src} alt={`g-${i}`} className="w-full h-24 object-cover rounded" loading="lazy" />
              ))}
            </div>
          </div>

          <aside className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 dark:text-white">Contact & Info</h3>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <div><strong>Address:</strong> {hotel.address}</div>
              <div><strong>Email:</strong> <a href={`mailto:${hotel.email}`} className="text-coffee">{hotel.email}</a></div>
              <div><strong>Phone:</strong> <a href={`tel:${hotel.phone}`} className="text-coffee">{hotel.phone}</a></div>
            </div>

            <div className="mt-4">
              <Link to="/contact" className="block px-3 py-2 bg-coffee text-white rounded text-center">Get in touch</Link>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-800 dark:text-white">Opening Hours</h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Reception 24/7 · Restaurant 07:00 - 23:00</div>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Frequently Asked Questions</h3>
          <div className="mt-3 space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="border rounded overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-4 py-3 flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800 dark:text-white">{f.q}</span>
                  <span className="text-gray-500">{openFaq === i ? "−" : "+"}</span>
                </button>
                <div className={`px-4 py-3 text-sm text-gray-600 dark:text-gray-300 ${openFaq === i ? "block" : "hidden"}`}>
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map embed (optional) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Location</h3>
          <div className="mt-3">
            <iframe
              title="hotel-location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(hotel.address)}&output=embed`}
              className="w-full h-64 rounded"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}