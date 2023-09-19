import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container flex flex-row">
        <Link href="/">
          <h1 className="text-white text-xl font-bold">Home</h1>
        </Link>
        <Link href="/vehicle">
          <h1 className="text-white text-xl ml-4">Vehicles</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
