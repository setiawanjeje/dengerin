import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="py-2 px-4 h-screen flex flex-col justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(244,134,110,1) 0%, rgba(246,172,27,1) 100%)",
      }}
    >
      <div className="mb-4">
        <label
          className="block w-full text-center text-white mb-2"
          htmlFor="room"
        >
          Room Name
        </label>
        <input className="block w-full border-2 px-4 py-2" id="room" />
      </div>
      <div className="mb-4">
        <label
          className="block w-full text-center text-white mb-2"
          htmlFor="username"
        >
          Your Name
        </label>
        <input className="block w-full border-2 px-4 py-2" id="username" />
      </div>
      <div className="flex justify-center mt-5">
        <Link href="/room/2">
          <button className="border-2 py-2 px-4 rounded font-bold text-white">
            Join Room
          </button>
        </Link>
      </div>
    </div>
  );
}
