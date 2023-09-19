// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Vehicle from "./vehicle";

const Home = () => {
  return (
    <div>
      <Link href={<Vehicle />}>
        <h1>Welcome to Star War Vehicle</h1>
      </Link>
    </div>
  );
};

export default Home;
