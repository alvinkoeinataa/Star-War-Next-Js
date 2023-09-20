import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

const Vehicle = () => {
  const [dataVehicle, setDataVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Menambahkan state searchTerm
  const router = useRouter();

  const fetchData = (page) => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://swapi.dev/api/vehicles/?page=${page}`,
    })
      .then((response) => {
        setDataVehicle(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="container mx-auto px-24 py-6">
        <h1 className="flex justify-center mb-6 text-3xl">STAR WAR VEHICLES</h1>
        <div className="flex items-center justify-between mb-4">
          <input type="text" placeholder="Search Vehicle" className="border rounded p-2 ml-5 mr-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              {dataVehicle
                .filter((vehicle) => vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-black rounded-lg shadow-lg p-4 mx-4 cursor-pointer transition hover:shadow-xl"
                    onClick={() => {
                      const data = item.url.split("/");
                      const vehicleId = data[5];
                      router.push(`/vehicle/${vehicleId}`);
                    }}
                  >
                    <p className="text-2xl font-semibold text-white">{item.name}</p>
                  </div>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-12">
                Previous
              </button>
              <button onClick={handleNextPage} disabled={currentPage === 4} className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-8 rounded">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicle;
