import React from "react";
import Link from "next/link";
import Navbar from "./components/navbar";
import Vehicle from "./vehicle";

const Home = () => {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <img className="h-auto max-w-full" src="/warr.png" alt="image description" />

        <div className=" flex items-center justify-center" style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0" }}>
          <div className="bg-white p-6">
            <Link href="/vehicle">
              <h1 className="text-4xl font-bold cursor-pointer hover:underline hover:text-blue-500">Welcome to Star War Vehicle</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
