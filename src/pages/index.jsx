import React from "react";
import Link from "next/link";
// import Navbar from "./components/navbar";
// import Vehicle from "./vehicle";

const Home = () => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-center bg-black">
          <div className="p-6 text-center">
            <Link href="/vehicle">
              <h1 className="text-white text-3xl md:text-2xl lg:text-3xl font-bold cursor-pointer hover:underline hover:text-blue-500">Welcome to Star War Vehicle</h1>
            </Link>
          </div>
        </div>

        <img className="h-auto max-w-full" src="/warr.png" alt="image description" />
        <img className="h-auto max-w-full" src="/atbt.webp" alt="image description" />
        <img className="h-auto max-w-full" src="/starr.jpg" alt="image description" />
        <img className="h-auto max-w-full" src="/luke.webp" alt="image description" />
      </div>
    </div>
  );
};

export default Home;
