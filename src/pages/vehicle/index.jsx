import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Vehicle = () => {
  const [dataVehicle, setDataVehicle] = useState([]);
  const [dataCount, setDataCount] = useState({ count: 0 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dataFound, setDataFound] = useState(true);
  const router = useRouter();

  const fetchData = (page) => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/vehicles/?page=${page}`)
      .then((response) => {
        setDataVehicle(response.data.results);
        setDataCount(response.data);
        setLoading(false);
      })
      .catch((error) => {
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
    if (currentPage < dataCount.count) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleJump = () => {
    const data = item.url.split("/");
    const vehicleId = data[5];
    router.push(`/vehicle/${vehicleId}`);
  };

  const handleSearch = () => {
    if (searchTerm) {
      setLoading(true);
      axios
        .get(`https://swapi.dev/api/vehicles/?search=${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data.results);
          setDataFound(response.data.results.length > 0);
          setLoading(false);
        })
        .catch((error) => {
          alert("Error, reload the page!");
          setLoading(false);
        });
    } else {
      setSearchResults([]);
      setDataFound(true);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-24 py-6">
        <h1 className="flex justify-center mb-6 text-3xl">STAR WAR VEHICLES</h1>
        <h1 className="flex justify-center mb-6 text-xl">There are total {dataCount.count} vehicles in STAR WAR WORLD</h1>
        <div className="flex items-center justify-between mb-4">
          <input type="text" placeholder="Search Vehicle" className="border rounded p-2 ml-5 mr-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="bg-blue-600 p-3 rounded text-white" onClick={handleSearch}>
            Search
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : (
          <div>
            {dataFound || searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                {searchResults.length > 0
                  ? searchResults.map((item, index) => (
                      <div
                        key={index}
                        className="bg-black rounded-lg shadow-lg p-4 mx-4 cursor-pointer transition hover:shadow-xl"
                        onClick={() => {
                          handleJump();
                        }}
                      >
                        <p className="text-2xl font-semibold text-white">{item.name}</p>
                      </div>
                    ))
                  : dataVehicle.map((item, index) => (
                      <div
                        key={index}
                        className="bg-black rounded-lg shadow-lg p-4 mx-4 cursor-pointer transition hover:shadow-xl"
                        onClick={() => {
                          handleJump();
                        }}
                      >
                        <p className="text-2xl font-semibold text-white">{item.name}</p>
                      </div>
                    ))}
              </div>
            ) : (
              <p className="text-center text-red-600 text-lg">Data not found</p>
            )}
            {searchResults.length === 0 && (
              <div className="mt-4 flex items-center justify-center">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-6">
                  Previous
                </button>
                <div className="mr-6">Page {currentPage}</div>
                <button onClick={handleNextPage} disabled={currentPage === dataCount.count} className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-8 rounded">
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicle;
