"use client";

import { Vortex } from "@/components/ui/vortex";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <Vortex
        backgroundColor="black"
        className="flex flex-col items-center justify-center px-4 py-12 w-full h-full"
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg mb-4">
          AI & The Bible
        </h1>
        <p className="text-white text-lg md:text-2xl max-w-xl text-center mb-8">
          An interactive web app teaching kids AI prompt engineering through biblical stories.<br />
          Gamified, safe, and fun!
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/auth/register"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 transition duration-200 rounded-lg text-white text-lg font-semibold border border-white/20"
          >
            Login
          </Link>
        </div>
      </Vortex>
    </div>
  );
}
